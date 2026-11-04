#!/usr/bin/env bash
# Ensure vrgo.hu / www / bim.vrgo.hu proxy to site-1 on :3000.
set -euo pipefail

AVAILABLE=/etc/nginx/sites-available
ENABLED=/etc/nginx/sites-enabled
CONF_NAME=vrgo-site-1
CONF_PATH="$AVAILABLE/$CONF_NAME"

PROXY_BLOCK=$(cat <<'PROXY'
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
PROXY
)

write_conf() {
  cat >"$1" <<EOF
# Managed by scripts/ensure-site1-vrgo-vhosts.sh — site-1 → 127.0.0.1:3000

server {
    listen 80;
    listen [::]:80;
    server_name vrgo.hu www.vrgo.hu bim.vrgo.hu;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
        default_type "text/plain";
        try_files \$uri =404;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name vrgo.hu www.vrgo.hu bim.vrgo.hu;

    ssl_certificate     /etc/letsencrypt/live/vrgo.hu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vrgo.hu/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 25M;

$PROXY_BLOCK
}
EOF
}

echo "===== BEFORE: sites-available ====="
ls -la "$AVAILABLE" || true
echo "===== BEFORE: sites-enabled ====="
ls -la "$ENABLED" || true
echo "===== BEFORE: server_name / proxy_pass ====="
grep -RIn --include='*.conf' -E 'server_name|proxy_pass' "$ENABLED" "$AVAILABLE" 2>/dev/null | head -n 80 || true

TMP=$(mktemp)
write_conf "$TMP"

if [[ ! -w "$AVAILABLE" ]]; then
  sudo -n cp "$TMP" "$CONF_PATH"
  sudo -n chmod 644 "$CONF_PATH"
else
  cp "$TMP" "$CONF_PATH"
  chmod 644 "$CONF_PATH"
fi
rm -f "$TMP"
echo "wrote $CONF_PATH"

if [[ -L "$ENABLED/$CONF_NAME" ]] || [[ -e "$ENABLED/$CONF_NAME" ]]; then
  echo "enabled link already present: $ENABLED/$CONF_NAME"
else
  if [[ -w "$ENABLED" ]]; then
    ln -sfn "$CONF_PATH" "$ENABLED/$CONF_NAME"
  else
    sudo -n ln -sfn "$CONF_PATH" "$ENABLED/$CONF_NAME"
  fi
  echo "linked $ENABLED/$CONF_NAME -> $CONF_PATH"
fi

for f in "$ENABLED"/*; do
  [[ -e "$f" || -L "$f" ]] || continue
  base=$(basename "$f")
  [[ "$base" == "$CONF_NAME" ]] && continue
  if grep -Eq 'server_name.*(vrgo\.hu|bim\.vrgo\.hu)' "$f" 2>/dev/null; then
    echo "Disabling conflicting enabled vhost: $f"
    if [[ -w "$ENABLED" ]]; then
      rm -f "$f"
    else
      sudo -n rm -f "$f"
    fi
    if [[ -f "$AVAILABLE/$base" ]]; then
      echo "left available original: $AVAILABLE/$base"
    fi
  fi
done

sudo -n nginx -t
sudo -n systemctl reload nginx

echo "===== AFTER: enabled ====="
ls -la "$ENABLED" || true
echo "===== AFTER: conf ====="
sed -n '1,120p' "$CONF_PATH"
echo "===== local curls ====="
for h in vrgo.hu www.vrgo.hu bim.vrgo.hu; do
  code=$(curl -sk -o /dev/null -w '%{http_code}' -m 8 --resolve "${h}:443:127.0.0.1" "https://${h}/" || echo fail)
  echo "$h -> $code"
done
ss -lptn | grep -E ':3000\b' || echo "WARNING: nothing listening on :3000"
