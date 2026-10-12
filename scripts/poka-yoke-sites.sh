#!/bin/bash
# Portfolio site-1..4 only. Never touch /var/www/szcenario or site-5 keys.
set -uo pipefail
echo "==== START $(date -Is) user=$(id) pwd=$(pwd) ===="
echo "sudo-n=$(sudo -n true && echo yes || echo no)"

GUARD=/home/deploy/bin/site-guard.sh
AUTH=/home/deploy/.ssh/authorized_keys
BACKUP="/home/deploy/.ssh/authorized_keys.bak.poka.$(date +%Y%m%d%H%M%S)"

write_file() {
  local dest="$1"
  local mode="$2"
  local owner="$3"
  if [ -w "$(dirname "$dest")" ] && { [ ! -e "$dest" ] || [ -w "$dest" ]; }; then
    cat > "$dest"
    chmod "$mode" "$dest" || true
  else
    sudo -n tee "$dest" >/dev/null
    sudo -n chmod "$mode" "$dest" || true
    sudo -n chown "$owner" "$dest" || true
  fi
}

echo "==== write site-guard ===="
sudo -n mkdir -p /home/deploy/bin 2>/dev/null || mkdir -p /home/deploy/bin
write_file "$GUARD" 755 deploy:deploy << 'GUARD'
#!/bin/bash
set -euo pipefail
SITE="${1:-}"
case "$SITE" in
  site-1) PORT=3000; REPO=site-1_newdev ;;
  site-2) PORT=3001; REPO=site-2_newdev ;;
  site-3) PORT=3002; REPO=site-3_newdev ;;
  site-4) PORT=3003; REPO=site-4_newdev ;;
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
ls -la "$GUARD" || sudo -n ls -la "$GUARD"

echo "==== authorized_keys ===="
sudo -n mkdir -p /home/deploy/.ssh
sudo -n chmod 700 /home/deploy/.ssh || true
sudo -n chown deploy:deploy /home/deploy/.ssh || true
sudo -n touch "$AUTH"
sudo -n chmod 600 "$AUTH" || true
sudo -n chown deploy:deploy "$AUTH" || true
if [ -f "$AUTH" ] || sudo -n test -f "$AUTH"; then
  sudo -n cp -a "$AUTH" "$BACKUP" && echo "backup $BACKUP" || echo "WARN: no backup"
fi

install_one() {
  local site="$1"
  local pub="$2"
  local line="command=\"/home/deploy/bin/site-guard.sh ${site}\",no-agent-forwarding,no-port-forwarding,no-pty,no-X11-forwarding ${pub}"
  sudo -n grep -F " ${site}-vps-deploy" "$AUTH" >/dev/null 2>&1 && sudo -n sed -i "/ ${site}-vps-deploy/d" "$AUTH"
  printf '%s\n' "$line" | sudo -n tee -a "$AUTH" >/dev/null && echo "installed $site" || echo "FAIL install $site"
}

install_one site-1 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA0nW/Ey5hOcpb0WEcsUJ33rUs0opuSEFSSu3sqVOmPK site-1-vps-deploy"
install_one site-2 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPAtw0zTjIzBHMupTI0ZMDmpb26rGluBVIqvXYFX7m7b site-2-vps-deploy"
install_one site-3 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMBBrXI1gvIyrWnNV6aZYmCL+b6pgs2xoMf7XXks8E7c site-3-vps-deploy"
install_one site-4 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHhCUUTL4qTTjrwy5awzq5/9sgDGhEP1Z4ZCUV2Yx9tM site-4-vps-deploy"

echo "==== authorized_keys comments ===="
sudo -n awk '{print $NF}' "$AUTH" || awk '{print $NF}' "$AUTH" || true
if sudo -n grep -E 'site-5|scenario' "$AUTH" >/dev/null 2>&1; then
  echo "site-5 key: KEEP"
else
  echo "WARN: site-5 key not found in authorized_keys"
fi

echo "==== perms site-1..4 (skip szcenario) ===="
for s in 1 2 3 4; do
  d="/var/www/site-$s"
  if [ ! -d "$d" ]; then
    echo "MISSING $d"
    continue
  fi
  echo "-- $d $(stat -c '%U:%G %a' "$d")"
  sudo -n setfacl -R -m u:deploy:rwx -m u:vmvrgohu:rwx -m d:u:deploy:rwx -m d:u:vmvrgohu:rwx "$d" 2>/dev/null || true
  chmod -R ug+rwX "$d" 2>/dev/null || sudo -n chmod -R ug+rwX "$d" || true
  if [ -d "$d/node_modules/.bin" ]; then
    find "$d/node_modules/.bin" -type f -exec chmod a+x {} + 2>/dev/null || sudo -n find "$d/node_modules/.bin" -type f -exec chmod a+x {} + || true
  fi
  git config --global --add safe.directory "$d" || true
  sudo -n -u deploy git config --global --add safe.directory "$d" || true
done

echo "==== processes / pm2 ===="
ps -eo user,pid,cmd | grep -E '[n]ode|[p]m2|[n]ext' || true
echo "-- pm2 as $(whoami) --"
pm2 status || true
echo "-- pm2 as deploy --"
sudo -n -u deploy bash -lc 'pm2 status' || true

echo "==== nginx map ===="
ls -la /etc/nginx/sites-enabled || true
sudo -n grep -RIn --include='*.conf' -E 'server_name|proxy_pass|3000|3001|3002|3003' /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null | head -n 80 || true

restart_one() {
  local s="$1"
  local d="/var/www/site-$s"
  echo "===== restart site-$s from $d ====="
  if ! sudo -n -u deploy bash -lc "cd '$d' && pm2 delete site-$s || true; pm2 start npm --name site-$s --cwd '$d' -- start"; then
    echo "deploy pm2 failed — try $(whoami)"
    (cd "$d" && pm2 delete "site-$s" || true
     pm2 start npm --name "site-$s" --cwd "$d" -- start) || true
  fi
}

for s in 1 2 3 4; do
  restart_one "$s"
done
sudo -n -u deploy bash -lc 'pm2 save' || pm2 save || true

sleep 3
echo "==== pm2 after ===="
sudo -n -u deploy bash -lc 'pm2 status' || pm2 status || true
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
