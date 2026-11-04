#!/usr/bin/env bash
# Fully remove eladoingatlan.vrgo.hu Nginx vhost + Certbot cert.
set -euo pipefail

ENABLED=/etc/nginx/sites-enabled/eladoingatlan.vrgo.hu
AVAILABLE=/etc/nginx/sites-available/eladoingatlan.vrgo.hu

echo "===== BEFORE ====="
ls -la "$ENABLED" "$AVAILABLE" 2>&1 || true
sudo -n certbot certificates 2>/dev/null | sed -n '1,120p' || true

if [[ -e "$ENABLED" || -L "$ENABLED" ]]; then
  sudo -n rm -f "$ENABLED"
  echo "removed $ENABLED"
else
  echo "no enabled link: $ENABLED"
fi

if [[ -e "$AVAILABLE" || -L "$AVAILABLE" ]]; then
  sudo -n rm -f "$AVAILABLE"
  echo "removed $AVAILABLE"
else
  echo "no available conf: $AVAILABLE"
fi

# Strip hostname from any remaining vrgo configs (unified site-1 conf, etc.)
for f in /etc/nginx/sites-available/* /etc/nginx/sites-enabled/*; do
  [[ -f "$f" || -L "$f" ]] || continue
  if grep -q 'eladoingatlan\.vrgo\.hu' "$f" 2>/dev/null; then
    echo "stripping eladoingatlan.vrgo.hu from $f"
    sudo -n sed -i.bak-rm-elado 's/[[:space:]]*eladoingatlan\.vrgo\.hu//g' "$f"
  fi
done

if sudo -n certbot certificates 2>/dev/null | grep -q 'eladoingatlan\.vrgo\.hu'; then
  # Non-interactive delete when cert name matches
  if sudo -n certbot delete --cert-name eladoingatlan.vrgo.hu --non-interactive; then
    echo "certbot deleted eladoingatlan.vrgo.hu"
  else
    echo "WARNING: certbot delete failed or cert name differs; listing certs:"
    sudo -n certbot certificates || true
  fi
else
  echo "No dedicated eladoingatlan.vrgo.hu cert in certbot list (may share vrgo.hu SAN)"
fi

sudo -n nginx -t
sudo -n systemctl reload nginx

echo "===== AFTER enabled ====="
ls /etc/nginx/sites-enabled/eladoingatlan.vrgo.hu 2>&1 || true
echo "===== AFTER available ====="
ls /etc/nginx/sites-available/eladoingatlan.vrgo.hu 2>&1 || true
echo "===== certbot ====="
sudo -n certbot certificates 2>/dev/null | grep -i elado || echo "(no eladoingatlan in certbot list)"
echo "===== remaining references ====="
grep -RIn --include='*' 'eladoingatlan' /etc/nginx/sites-enabled /etc/nginx/sites-available 2>/dev/null || echo "(none)"
