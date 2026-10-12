#!/bin/bash
# Portfolio site-1..4 only. Never touch /var/www/szcenario.
# Runs as vmvrgohu (owns the trees). No sudo required.
set -uo pipefail
echo "==== START $(date -Is) user=$(id) ===="

GUARD="$HOME/bin/site-guard.sh"
AUTH="$HOME/.ssh/authorized_keys"
mkdir -p "$HOME/bin" "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

cat > "$GUARD" << 'GUARD'
#!/bin/bash
set -euo pipefail
SITE="${1:-}"
case "$SITE" in
  site-1) PORT=3000; REPO=site-1_newdev ;;
  site-2) PORT=3001; REPO=site-2_newdev ;;
  site-3) PORT=3002; REPO=site-3_newdev ;;
  site-4) PORT=3004; REPO=site-4_newdev ;;
  *) echo "denied site=$SITE" >&2; exit 1 ;;
esac
APP_DIR="/var/www/$SITE"
ORIG="${SSH_ORIGINAL_COMMAND:-}"
if [[ "$ORIG" == rsync\ * || "$ORIG" == scp\ * ]]; then
  if [[ "$ORIG" != *"$APP_DIR"* ]]; then
    echo "path-denied $SITE: $ORIG" >&2
    exit 1
  fi
  exec bash -c "$ORIG"
fi
test -d "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" || true
cd "$APP_DIR"
git remote set-url origin "https://github.com/huncash/${REPO}.git"
git fetch origin
git reset --hard origin/main
npm install
rm -rf .next
npm run build
pm2 delete "$SITE" || true
pm2 start npm --name "$SITE" --cwd "$APP_DIR" -- start
pm2 save
ss -lptn | grep -E ":${PORT}\\b" || true
GUARD
chmod 755 "$GUARD"
ls -la "$GUARD"

cp -a "$AUTH" "$AUTH.bak.poka.$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
touch "$AUTH"
chmod 600 "$AUTH"

install_one() {
  local site="$1"
  local pub="$2"
  local line="command=\"$HOME/bin/site-guard.sh ${site}\",no-agent-forwarding,no-port-forwarding,no-pty,no-X11-forwarding ${pub}"
  grep -F " ${site}-vps-deploy" "$AUTH" >/dev/null 2>&1 && sed -i "/ ${site}-vps-deploy/d" "$AUTH"
  printf '%s\n' "$line" >> "$AUTH"
  echo "installed $site"
}

install_one site-1 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA0nW/Ey5hOcpb0WEcsUJ33rUs0opuSEFSSu3sqVOmPK site-1-vps-deploy"
install_one site-2 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPAtw0zTjIzBHMupTI0ZMDmpb26rGluBVIqvXYFX7m7b site-2-vps-deploy"
install_one site-3 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMBBrXI1gvIyrWnNV6aZYmCL+b6pgs2xoMf7XXks8E7c site-3-vps-deploy"
install_one site-4 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHhCUUTL4qTTjrwy5awzq5/9sgDGhEP1Z4ZCUV2Yx9tM site-4-vps-deploy"

echo "==== authorized_keys comments (vmvrgohu) ===="
awk '{print $NF}' "$AUTH"
echo "key count=$(grep -c '^' "$AUTH" || true)"

echo "==== perms + bins site-1..4 ===="
for s in 1 2 3 4; do
  d="/var/www/site-$s"
  echo "-- $d $(stat -c '%U:%G %a' "$d")"
  git config --global --add safe.directory "$d" || true
  if [ -d "$d/node_modules/.bin" ]; then
    find "$d/node_modules/.bin" -type f -exec chmod a+x {} + 2>/dev/null || true
    ls -la "$d/node_modules/.bin/next" 2>/dev/null || echo "no next bin"
  else
    echo "no node_modules/.bin"
  fi
  ls -ld "$d/.next" 2>/dev/null || echo "no .next"
done

echo "==== nginx (read-only) ===="
grep -RIn --include='*' -E 'server_name|proxy_pass' /etc/nginx/sites-enabled 2>/dev/null | head -n 40 || true

restart_one() {
  local s="$1"
  local d="/var/www/site-$s"
  echo "===== restart site-$s from $d ====="
  cd "$d" || return 1
  find node_modules/.bin -type f -exec chmod a+x {} + 2>/dev/null || true
  pm2 delete "site-$s" || true
  pm2 start npm --name "site-$s" --cwd "$d" -- start
  sleep 4
  echo "-- logs site-$s --"
  pm2 logs "site-$s" --lines 25 --nostream || true
}

for s in 1 2 3 4; do
  restart_one "$s"
done
pm2 save || true
sleep 4

echo "==== pm2 after ===="
pm2 status || true
echo "==== listening ===="
ss -lptn | grep -E ':300[0-3]\b|:5100\b' || true
echo "==== local curl ===="
for p in 3000 3001 3002 3003; do
  echo -n "127.0.0.1:$p "
  curl -sI -m 8 "http://127.0.0.1:$p/" | head -n 1 || echo fail
done
echo "==== public curl ===="
for h in vrgo.hu projektorlampacsere.hu offlinebiztonsag.hu rendezvenyarnyekolas.hu; do
  echo -n "$h "
  curl -sI -m 12 -k "https://$h/" | head -n 1 || echo fail
done
echo "==== DONE $(date -Is) ===="
