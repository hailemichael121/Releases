# Mobile Application Releases Hub

[![Releases](https://img.shields.io/badge/Mobile_Apps-6_Active-blue?style=flat-square&logo=android)](./data/apps.json)
[![Platform](https://img.shields.io/badge/Platform-Android_APK-green?style=flat-square&logo=android)](./apps)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](./LICENSE)

Central release repository hosting official Android builds (`.apk`), version histories, detailed release notes, checksums, and direct single-click share links for all mobile applications developed by **Yihun Shekuri** and collaborators.

---

## Web Showcase & Direct Single-APK Sharing

In addition to browsing this repository directly, an interactive web showcase is available via `index.html` (ready for **GitHub Pages** deployment).

- **Live Web Portal**: Open [`index.html`](./index.html) in your browser.
- **Single APK Sharing**: Every application build has a unique deep link format. Sharing a single-APK link opens the exact release card with direct download buttons.
  - *Example Share Link Format*:  
    `https://yihunshekuri.github.io/Releases/#apk=appsnap-v2.1.0`  
    `https://yihunshekuri.github.io/Releases/#app=appsnap`  
    `https://yihunshekuri.github.io/Releases/#app=mekanat`

---

## Release Matrix & Direct Downloads

| App Name | Category | Version | Date | File Size | Direct Download | Share Link |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **AppSnap** | Developer Tools & Studio | `v2.1.0` | 2026-08-15 | 20.5 MB | [Download APK](./apps/appsnap/v2.1.0/appsnap-v2.1.0.apk) | [`#app=appsnap`](./index.html#app=appsnap) |
| **Mezgebe Sbhat** | Spiritual & Education | `v1.0.0` | 2026-08-06 | 19.4 MB | [Download APK](./apps/mezgebe-sbhat/v1.0.0/mezgebe-sbhat-v1.0.0.apk) | [`#app=mezgebe-sbhat`](./index.html#app=mezgebe-sbhat) |
| **Mezgebe Zema** | Spiritual & Education | `v1.2.0` | 2026-08-06 | 19.4 MB | [Download APK](./apps/mezgebe-zema/v1.2.0/mezgebe-zema-v1.2.0.apk) | [`#app=mezgebe-zema`](./index.html#app=mezgebe-zema) |
| **Jan Note** | Productivity & Study | `v1.0.0` | 2026-08-15 | 60.2 MB | [Download APK](./apps/jan-note/v1.0.0/jan-note-v1.0.0.apk) | [`#app=jan-note`](./index.html#app=jan-note) |
| **Jan Alarm** | Utilities | `v1.0.0` | 2026-08-06 | 19.4 MB | [Download APK](./apps/jan-alarm/v1.0.0/jan-alarm-v1.0.0.apk) | [`#app=jan-alarm`](./index.html#app=jan-alarm) |
| **Mekanat** | Spiritual & Mapping | `v1.0.0` | 2026-08-06 | 19.4 MB | [Download APK](./apps/mekanat/v1.0.0/mekanat-v1.0.0.apk) | [`#app=mekanat`](./index.html#app=mekanat) |

---

## Applications & Release Details

### 1. AppSnap (`appsnap`)
> Native Android Screenshot Studio & Automated Portfolio Package Generator

AppSnap transforms mobile app screenshots into polished portfolio artifacts. Features a live floating camera shutter button that hovers over running apps with an auto-ghost mechanism (75ms fade), 7 mobile frame styles (*Raw Original*, *iPhone Titanium with Dynamic Island*, *Google Pixel Pro*, *Clay Minimalist*, *Studio Onyx Dark*, *Portfolio Card*, *Midnight Cyber*), multi-image gallery import, interactive zoom preview, direct device save to `Pictures/` & `Download/`, and one-tap offline ZIP packaging with `manifest.json` and responsive `contact_sheet.html`.

- **Folder Path**: [`apps/appsnap/`](./apps/appsnap/)
- **Brand Color**: `#10b981` (Emerald Green)
- **Latest Version**: `v2.1.0` (2026-08-15)
- **Key Features**:
  - Native floating camera shutter overlay (`ScreenCaptureService.kt`) with auto-ghost capture.
  - Multi-image personal gallery import as-is with original uncompressed resolution.
  - Interactive full-resolution preview dialog with pinch-to-zoom, pan, rename, and card-level instant drop.
  - Direct 1-tap save for single images to `Pictures/AppSnap/` and ZIP packages to `Download/AppSnap/`.
  - Self-contained offline ZIP engine with HTML contact sheet and JSON manifest.
  - 62%+ lightweight minified binary (20.5 MB).
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `25968c450d6c3aa36cf0d8ad18f0e41cd6c0ad0c2d48e5bd16535bb8993c08a2`

---

### 2. Mezgebe Sbhat (`mezgebe-sbhat`)
> Ethiopian Orthodox Church Hymns & Prayers with Audio and PDF Integration

Mezgebe Sbhat supports the learning and preservation of Ethiopian Orthodox Tewahedo Church hymns by combining audio recordings with corresponding written PDF texts.

- **Folder Path**: [`apps/mezgebe-sbhat/`](./apps/mezgebe-sbhat/)
- **Brand Color**: `#3b82f6` (Azure Blue)
- **Latest Version**: `v1.0.0`
- **Key Features**:
  - Audio playback for Ethiopian Orthodox hymns.
  - PDF text integration for Ge'ez and Amharic prayers.
  - Offline access to downloaded resources without ads.
- **Developers**: Yihun Shekuri, Yeabsira Yonas
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 3. Mezgebe Zema (`mezgebe-zema`)
> Ethiopian Orthodox Church Liturgical Audio Library & Offline Player

Mezgebe Zema helps users discover, organize, and play spiritual audio by church calendar months, days, and collections (Aquaquam, Dgua, Tsome Dgua, Wereb).

- **Folder Path**: [`apps/mezgebe-zema/`](./apps/mezgebe-zema/)
- **Brand Color**: `#8b5cf6` (Liturgical Violet)
- **Latest Version**: `v1.2.0`
- **Key Features**:
  - Full player controls (mini & full player, lock screen notification, background play).
  - Search across liturgical library and build custom playlists.
  - Fast offline download manager and variable speed playback.
- **Developers**: Yihun Shekuri, Yeabsira Yonas
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 4. Jan Note (`jan-note`)
> Offline-First Spiritual Notebook & Rich Text Editor for Gubae Study

A privacy-focused offline notebook designed for Orthodox Gubae study, verse tagging, and rich note organization.

- **Folder Path**: [`apps/jan-note/`](./apps/jan-note/)
- **Brand Color**: `#10b981` (Emerald Green)
- **Latest Version**: `v1.0.0`
- **Key Features**:
  - Rich Quill editor with autosave, tags, verse chips, and bookmarks.
  - Distraction-free reading mode viewer.
  - First-run tutorial flow persisted in local Hive DB.
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `c1e2096c1fadb6edd020093fa52fdd71c0930066dd041bb6890ae8ef43ec5c36`

---

### 5. Jan Alarm (`jan-alarm`)
> Smart Spiritual Alarm & Daily Prayer Schedule Reminder

Customizable alarm application tuned for canonical prayer hours, service reminders, and morning study alarms.

- **Folder Path**: [`apps/jan-alarm/`](./apps/jan-alarm/)
- **Brand Color**: `#f59e0b` (Prayer Bell Gold)
- **Latest Version**: `v1.0.0`
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

### 6. Mekanat (`mekanat`)
> Ethiopian Orthodox Church Mapping & Liturgical Companion

Mekanat provides interactive map navigation for Ethiopian Orthodox Tewahedo Church locations, parish contacts, church history, daily canonical prayers, 81-book Orthodox Bible integration, and feast day calendar events.

- **Folder Path**: [`apps/mekanat/`](./apps/mekanat/)
- **Brand Color**: `#d4a017` (Church Gold)
- **Latest Version**: `v1.0.0`
- **Developer**: Yihun Shekuri
- **Checksum (SHA256)**: `7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99`

---

## Automated CLI Release Helper

You can automatically register a new build APK using the included CLI tool [`scripts/add_release.py`](./scripts/add_release.py):

```bash
python3 scripts/add_release.py \
  --app appsnap \
  --version v2.1.0 \
  --apk /path/to/app-release.apk \
  --icon /path/to/icon.png \
  --brand-color "#10b981" \
  --changelog "Added rich mobile frames and drop controls"
```

---

## Verification & Security

To verify the integrity of any downloaded APK file, run the following command in your terminal:

```bash
sha256sum <downloaded-apk-file>.apk
```

Compare the output hash against the SHA256 checksum listed in [`data/apps.json`](./data/apps.json) or in the release notes.

---

## Contributors

| Name | Role | Email |
| :--- | :--- | :--- |
| **Yihun Shekuri** | Lead Developer | yihunaashe@gmail.com |
| **Yeabsira Yonas** | Developer | yabulala432@gmail.com |

---

## License

This repository and its distribution packages are provided for public download, educational, and usage purposes. All rights reserved by respective creators.
