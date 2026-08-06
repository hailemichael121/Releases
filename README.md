# Mobile Application Releases Hub

[![Releases](https://img.shields.io/badge/Mobile_Apps-5_Active-blue?style=for-the-badge&logo=android)](./data/apps.json)
[![Platform](https://img.shields.io/badge/Platform-Android_APK-green?style=for-the-badge&logo=android)](./apps)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](./LICENSE)

Welcome to the central **Releases Repository**. This repository hosts official production and beta Android builds (`.apk`), version histories, detailed release notes, checksums, and single-click share links for all mobile applications developed by **Yihun Shekuri** and collaborators.

---

## 🌐 Web Showcase & Direct Single-APK Sharing

In addition to browsing this repository directly, an interactive, web showcase is available via `index.html` (ready for **GitHub Pages** deployment).

- **Live Web Portal**: Open [`index.html`](./index.html) in your browser.
- **Single APK Sharing**: Every application build has a unique deep link format. You can share a direct single-APK link with anyone, and it will open the exact release card with direct download buttons.
  - *Example Share Link Format*:  
    `https://yihunshekuri.github.io/Releases/#apk=jan-note-v1.0.0`  
    `https://yihunshekuri.github.io/Releases/#app=mezgebe-zema`

---

## 📱 Release Matrix & Direct Downloads

| Icon | App Name | Category | Version | Date | File Size | Direct Download | Share APK Link |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 📖 | **Mezgebe Sbhat** | Spiritual & Education | `v1.0.0` | 2026-08-06 | 19.4 MB | [⬇️ Download APK](./apps/mezgebe-sbhat/v1.0.0/mezgebe-sbhat-v1.0.0.apk) | [`#app=mezgebe-sbhat`](./index.html#app=mezgebe-sbhat) |
| 🎵 | **Mezgebe Zema** | Spiritual & Education | `v1.2.0` | 2026-08-06 | 19.4 MB | [⬇️ Download APK](./apps/mezgebe-zema/v1.2.0/mezgebe-zema-v1.2.0.apk) | [`#app=mezgebe-zema`](./index.html#app=mezgebe-zema) |
| 📝 | **Jan Note** | Productivity & Study | `v1.0.0` | 2026-08-06 | 91.2 MB | [⬇️ Download APK](./apps/jan-note/v1.0.0/jan-note-v1.0.0.apk) | [`#app=jan-note`](./index.html#app=jan-note) |
| ⏰ | **Jan Alarm** | Utilities | `v1.0.0` | 2026-08-06 | 19.4 MB | [⬇️ Download APK](./apps/jan-alarm/v1.0.0/jan-alarm-v1.0.0.apk) | [`#app=jan-alarm`](./index.html#app=jan-alarm) |
| 🏬 | **Mekanat** | Marketplace & Business | `v1.0.0` | 2026-08-06 | 19.4 MB | [⬇️ Download APK](./apps/mekanat/v1.0.0/mekanat-v1.0.0.apk) | [`#app=mekanat`](./index.html#app=mekanat) |

---

## 📂 Applications & Release Details

### 1. Mezgebe Sbhat (`mezgebe-sbhat`)
> **Ethiopian Orthodox Church Hymns & Prayers with Audio and PDF Integration**

Mezgebe Sbhat supports the learning and preservation of Ethiopian Orthodox Tewahedo Church hymns by combining audio recordings with corresponding written PDF texts.

- **Folder Path**: [`apps/mezgebe-sbhat/`](./apps/mezgebe-sbhat/)
- **Latest Version**: `v1.0.0`
- **Key Features**:
  - Audio playback for Ethiopian Orthodox hymns.
  - PDF text integration for Ge'ez and Amharic prayers.
  - Offline access to downloaded resources without ads.
- **Developers**: Yihun Shekuri, Yeabsira Yonas
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 2. Mezgebe Zema (`mezgebe-zema`)
> **Ethiopian Orthodox Church Liturgical Audio Library & Offline Player**

Mezgebe Zema helps users discover, organize, and play spiritual audio by church calendar months, days, and collections (Aquaquam, Dgua, Tsome Dgua, Wereb).

- **Folder Path**: [`apps/mezgebe-zema/`](./apps/mezgebe-zema/)
- **Latest Version**: `v1.2.0`
- **Key Features**:
  - Full player controls (mini & full player, lock screen notification, background play).
  - Search across liturgical library and build custom playlists.
  - Fast offline download manager and variable speed playback.
- **Developers**: Yihun Shekuri, Yeabsira Yonas
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 3. Jan Note (`jan-note`)
> **Offline-First Spiritual Notebook & Rich Text Editor for Gubae Study**

A privacy-focused offline notebook designed for Orthodox Gubae study, verse tagging, and rich note organization.

- **Folder Path**: [`apps/jan-note/`](./apps/jan-note/)
- **Latest Version**: `v1.0.0`
- **Key Features**:
  - Rich Quill editor with autosave, tags, verse chips, and bookmarks.
  - Distraction-free reading mode viewer.
  - First-run tutorial flow persisted in local Hive DB.
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `648fc3bf0c30e9d201a6432a661dc481067a45b5ec7531fd4aad98ca9eb70141`

---

### 4. Jan Alarm (`jan-alarm`)
> **Smart Spiritual Alarm & Daily Prayer Schedule Reminder**

Customizable alarm application tuned for canonical prayer hours, service reminders, and morning study alarms.

- **Folder Path**: [`apps/jan-alarm/`](./apps/jan-alarm/)
- **Latest Version**: `v1.0.0`
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 5. Mekanat (`mekanat`)
> **Real Estate & Vehicle Marketplace Platform for Ethiopia**

Mobile application for listing, searching, and managing real estate properties and vehicles in Ethiopia.

- **Folder Path**: [`apps/mekanat/`](./apps/mekanat/)
- **Latest Version**: `v1.0.0`
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

## 🛠️ How to Add a New Release (Automated)

You can automatically register a new build APK using the included CLI tool [`scripts/add_release.py`](./scripts/add_release.py):

```bash
python3 scripts/add_release.py \
  --app jan-note \
  --version v1.1.0 \
  --apk /path/to/app-release.apk \
  --changelog "Added cloud backup and enhanced search"
```

This script automatically:
1. Creates the target directory `apps/<app_id>/<version>/`
2. Copies the APK binary to the release location.
3. Computes the SHA256 checksum and file size.
4. Updates [`data/apps.json`](./data/apps.json) and regenerates key sections of `README.md`.

---

## 🔒 Verification & Security

To verify the integrity of any downloaded APK file, run the following command in your terminal:

```bash
sha256sum <downloaded-apk-file>.apk
```

Compare the output hash against the SHA256 checksum listed in [`data/apps.json`](./data/apps.json) or in the release notes.

---

## 👥 Contributors

| Name | Role | Email |
| :--- | :--- | :--- |
| **Yihun Shekuri** | Lead Developer | yihunaashe@gmail.com |
| **Yeabsira Yonas** | Developer | yabulala432@gmail.com |

Special thanks to everyone contributing to mobile application development and digital resources.

---

## 📜 License

This repository and its distribution packages are provided for public download, educational, and usage purposes. All rights reserved by respective creators.
