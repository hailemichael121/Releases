#!/usr/bin/env python3
import os
import sys
import json
import hashlib
import shutil
import argparse
from datetime import datetime

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
APPS_JSON_PATH = os.path.join(REPO_ROOT, "data", "apps.json")
README_PATH = os.path.join(REPO_ROOT, "README.md")

def calculate_sha256(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(65536), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def get_file_size_mb(file_path):
    size_bytes = os.path.getsize(file_path)
    size_mb = size_bytes / (1024 * 1024)
    return f"{size_mb:.1f} MB"

def main():
    parser = argparse.ArgumentParser(description="Add or update a mobile app release in the Releases repository.")
    parser.add_argument("--app", required=True, help="App ID (e.g. jan-note, mezgebe-zema, mezgebe-sbhat, jan-alarm, mekanat)")
    parser.add_argument("--version", required=True, help="Release version tag (e.g. v1.1.0)")
    parser.add_argument("--apk", required=True, help="Path to input .apk file")
    parser.add_argument("--changelog", nargs="+", help="Changelog list items", default=["General performance improvements and bug fixes"])
    
    args = parser.parse_args()
    
    if not os.path.isfile(args.apk):
        print(f"Error: APK file not found at {args.apk}")
        sys.exit(1)
        
    if not os.path.isfile(APPS_JSON_PATH):
        print(f"Error: {APPS_JSON_PATH} not found.")
        sys.exit(1)
        
    with open(APPS_JSON_PATH, "r") as f:
        data = json.load(f)
        
    app_entry = next((a for a in data["apps"] if a["id"] == args.app), None)
    if not app_entry:
        print(f"Error: App ID '{args.app}' not found in data/apps.json. Available: {[a['id'] for a in data['apps']]}")
        sys.exit(1)
        
    # Copy APK to target destination
    target_dir = os.path.join(REPO_ROOT, "apps", args.app, args.version)
    os.makedirs(target_dir, exist_ok=True)
    
    dest_apk_name = f"{args.app}-{args.version}.apk"
    dest_apk_path = os.path.join(target_dir, dest_apk_name)
    shutil.copy2(args.apk, dest_apk_path)
    
    sha256 = calculate_sha256(dest_apk_path)
    file_size = get_file_size_mb(dest_apk_path)
    release_date = datetime.now().strftime("%Y-%m-%d")
    rel_apk_path = f"apps/{args.app}/{args.version}/{dest_apk_name}"
    
    new_release = {
        "version": args.version,
        "releaseDate": release_date,
        "title": f"Release {args.version}",
        "apkFileName": dest_apk_name,
        "apkPath": rel_apk_path,
        "fileSize": file_size,
        "minAndroid": "Android 6.0 (API 23)+",
        "architecture": "Universal",
        "sha256": sha256,
        "downloadCount": 100,
        "changelog": args.changelog
    }
    
    # Prepend new release
    app_entry["releases"] = [r for r in app_entry["releases"] if r["version"] != args.version]
    app_entry["releases"].insert(0, new_release)
    app_entry["latestVersion"] = args.version
    app_entry["latestReleaseDate"] = release_date
    data["repository"]["updatedAt"] = release_date
    
    with open(APPS_JSON_PATH, "w") as f:
        json.dump(data, f, indent=2)
        
    print(f"✅ Successfully registered release {args.version} for '{args.app}'!")
    print(f"   Destination: {rel_apk_path}")
    print(f"   Size: {file_size}")
    print(f"   SHA256: {sha256}")
    print("   apps.json updated successfully.")

if __name__ == "__main__":
    main()
