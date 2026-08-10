import os
import shutil

posts = os.path.join(os.path.dirname(__file__), "..", "private_data", "posts")
renames = {
    "mamtie3fk.md": "miert-akarsz-majd-te-is-egy-360-fokos-kamerat.md",
    "hmfiafe.md": "hogyan-merd-fel-ingatlanod-allapotat-felujitas-elott.md",
}
for a, b in renames.items():
    src = os.path.join(posts, a)
    dst = os.path.join(posts, b)
    if os.path.exists(src):
        shutil.move(src, dst)
        print("renamed", a, "->", b)

for f in sorted(os.listdir(posts)):
    if f.endswith(".md") and not f.startswith("_"):
        print(f)
