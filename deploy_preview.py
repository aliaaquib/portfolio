#!/usr/bin/env python3
"""Create a Vercel PREVIEW deployment of the local portfolio via API.

Usage: deploy_preview.py
Prints the preview URL when the deployment is READY.
Never touches git or production.
"""
import hashlib
import json
import os
import sys
import time
import urllib.request
import urllib.error

sys.path.insert(0, "/opt/hatch/skills/skill-creator/bin")
from dynamic_credentials import add_surrogate_to_request

HOST = "api.vercel.com"
CRED = "custom.vercel"
PROJECT_ID = "prj_J3Eus7ij3i5R8hUVdK9Y1dAN5eGH"  # aaquib
ROOT = os.path.expanduser("~/workspace/portfolio")
EXCLUDE_DIRS = {"node_modules", ".next", ".git"}


def api(method, path, body=None, raw=None, headers=None):
    url = f"https://{HOST}{path}"
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    req = urllib.request.Request(url, data=data, method=method)
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    add_surrogate_to_request(req, CRED, allowed_hosts=(HOST,))
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            text = resp.read().decode("utf-8", errors="replace")
            return json.loads(text) if text.strip() else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")[:800]
        raise SystemExit(f"HTTP {e.code} on {method} {path}: {detail}")


def collect_files():
    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT)
            files.append((rel, full))
    return sorted(files)


def upload_file(rel, full):
    with open(full, "rb") as f:
        content = f.read()
    sha = hashlib.sha1(content).hexdigest()
    # Vercel dedups by sha; upload raw bytes, response echoes the sha
    resp = api(
        "POST",
        "/v2/files",
        raw=content,
        headers={
            "Content-Type": "application/octet-stream",
            "x-vercel-digest": sha,
            "x-vercel-size": str(len(content)),
        },
    )
    # response is a list of {"sha": ...}
    if isinstance(resp, list) and resp:
        return resp[0].get("sha", sha)
    return sha


def main():
    files = collect_files()
    print(f"uploading {len(files)} files...", file=sys.stderr)
    file_entries = []
    for rel, full in files:
        sha = upload_file(rel, full)
        file_entries.append({"file": rel, "sha": sha})
    print("creating preview deployment...", file=sys.stderr)
    dep = api(
        "POST",
        "/v13/deployments",
        body={
            "name": "aaquib",
            "project": PROJECT_ID,
            "files": file_entries,
            "projectSettings": {"framework": "nextjs"},
            "meta": {"createdBy": "muse-preview"},
        },
    )
    dep_id = dep.get("id")
    url = dep.get("url")
    print(f"deployment {dep_id} -> https://{url}", file=sys.stderr)

    for _ in range(60):
        time.sleep(10)
        d = api("GET", f"/v13/deployments/{dep_id}")
        state = d.get("readyState")
        print(f"state: {state}", file=sys.stderr)
        if state == "READY":
            print(f"https://{d.get('url')}")
            return
        if state in ("ERROR", "CANCELED"):
            raise SystemExit(f"deployment failed: {state}")
    raise SystemExit("timed out waiting for READY")


if __name__ == "__main__":
    main()
