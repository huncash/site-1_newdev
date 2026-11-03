#!/usr/bin/env bash
# Dedicated Nginx server block for eladoingatlan.vrgo.hu → site-1 (:3000).
# Appending the name to vrgo.hu leaves the HTTPS default_server
# (offlinebiztonsag.hu) answering; bim.vrgo.hu needed the same treatment.
set -euo pipefail

echo "ensure-eladoingatlan-vhost marker=$(date -Is) user=$(id)"

if ! sudo -n true; then
  echo "sudo=no; cannot edit nginx"
  exit 1
fi

# Ops alias: hostname path → Next app tree
if [[ ! -e /var/www/eladoingatlan.vrgo.hu ]]; then
  sudo -n ln -sfn /var/www/site-1 /var/www/eladoingatlan.vrgo.hu
  echo "linked /var/www/eladoingatlan.vrgo.hu -> /var/www/site-1"
fi
ls -ld /var/www/eladoingatlan.vrgo.hu /var/www/site-1

sudo -n python3 - << 'PY'
import pathlib, re

enabled = pathlib.Path("/etc/nginx/sites-enabled")
available = pathlib.Path("/etc/nginx/sites-available")
vrgo = (enabled / "vrgo.hu").read_text()
cert = re.search(r"ssl_certificate\s+([^;]+);", vrgo)
key = re.search(r"ssl_certificate_key\s+([^;]+);", vrgo)
if not cert or not key:
    raise SystemExit("vrgo.hu has no ssl_certificate")

include = ""
for line in vrgo.splitlines():
    stripped = line.strip()
    if stripped.startswith("include ") and ("options-ssl" in stripped or "ssl-dhparams" in stripped):
        include += "    " + stripped + "\n"

block = f"""server {{
    listen 80;
    listen [::]:80;
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name eladoingatlan.vrgo.hu;
    # App root: /var/www/eladoingatlan.vrgo.hu -> /var/www/site-1 (Next on :3000)
    ssl_certificate {cert.group(1)};
    ssl_certificate_key {key.group(1)};
{include}
    location / {{
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }}
}}
"""

name = "eladoingatlan.vrgo.hu"
target = enabled / name
target.write_text(block)
print(f"wrote {target}")
if available.is_dir():
    (available / name).write_text(block)
    print(f"wrote {available / name}")

for path in list(enabled.iterdir()) + list(available.glob("*")):
    if not path.is_file() or path.name == name:
        continue
    text = path.read_text(errors="replace")
    if name not in text:
        continue
    if path.resolve() == target.resolve():
        continue
    updated = re.sub(r"[ \t]+eladoingatlan\.vrgo\.hu", "", text)
    if updated != text:
        path.write_text(updated)
        print(f"removed duplicate name from {path}")
PY

sudo -n nginx -t
sudo -n systemctl reload nginx

title="$(curl -sk -m 15 --resolve eladoingatlan.vrgo.hu:443:127.0.0.1 https://eladoingatlan.vrgo.hu/ | grep -o '<title>[^<]*</title>' || true)"
echo "title=${title}"
case "$title" in
  *Offline*|*offlinebiztonsag*) echo "still default vhost"; exit 1 ;;
esac
if [[ -z "$title" ]]; then
  echo "empty title after reload"
  exit 1
fi

sudo -n certbot --nginx --non-interactive --expand --keep-until-expiring \
  -d vrgo.hu -d www.vrgo.hu -d bim.vrgo.hu -d eladoingatlan.vrgo.hu \
  || echo "CERTBOT_FAILED"

sudo -n nginx -t
sudo -n systemctl reload nginx

echo "===== server blocks ====="
grep -nE 'server_name|proxy_pass|ssl_certificate ' \
  /etc/nginx/sites-enabled/eladoingatlan.vrgo.hu \
  /etc/nginx/sites-enabled/vrgo.hu 2>/dev/null || true

title2="$(curl -sk -m 15 --resolve eladoingatlan.vrgo.hu:443:127.0.0.1 https://eladoingatlan.vrgo.hu/ | grep -o '<title>[^<]*</title>' || true)"
echo "title_after_certbot=${title2}"
case "$title2" in
  *Offline*|*offlinebiztonsag*) echo "still default vhost after certbot"; exit 1 ;;
esac

echo "ensure-eladoingatlan-vhost done"
