# 📸 AppSnap (v2.0.0) — Release Documentation & Showcase

<div align="center">

![AppSnap Logo](../../assets/icons/appsnap.png)

**Native Android Screenshot Studio & Automated Portfolio Package Generator**

</div>

---

## 📱 Application Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center" width="16%">
        <img src="screenshots/01_dashboard.png" width="100%" alt="Apps Dashboard" /><br />
        <b>Apps Dashboard</b><br />
        <i>Real phone apps, search & quick snap</i>
      </td>
      <td align="center" width="16%">
        <img src="screenshots/02_active_capture.png" width="100%" alt="Live Capture" /><br />
        <b>Live Capture</b><br />
        <i>Floating shutter & gallery intake</i>
      </td>
      <td align="center" width="16%">
        <img src="screenshots/03_review_stager.png" width="100%" alt="Screen Stager" /><br />
        <b>Screen Stager</b><br />
        <i>Clean frameless preview & selection</i>
      </td>
      <td align="center" width="16%">
        <img src="screenshots/04_export_manifest.png" width="100%" alt="Export Manifest" /><br />
        <b>Export & Save</b><br />
        <i>Save to device & social sharing</i>
      </td>
      <td align="center" width="16%">
        <img src="screenshots/05_history.png" width="100%" alt="Export History" /><br />
        <b>Export History</b><br />
        <i>Artifact registry & ZIP access</i>
      </td>
      <td align="center" width="16%">
        <img src="screenshots/06_settings.png" width="100%" alt="Settings & Themes" /><br />
        <b>Settings</b><br />
        <i>Theme modes & storage info</i>
      </td>
    </tr>
  </table>
</div>

---

## 📦 Release Downloads & Information

- **App ID:** `appsnap`
- **Release Version:** `v2.0.0`
- **Platform:** Android 8.0+ (API 26+)

| Architecture | File | Size | SHA-256 Checksum |
| :--- | :--- | :--- | :--- |
| **ARM64 (Modern Phones)** | [`appsnap-v2.0.0-arm64-v8a.apk`](v2.0.0/appsnap-v2.0.0-arm64-v8a.apk) | **20.4 MB** | `e87f4d837fdb4c37ec14cda9a9653fd1821acd9943e74dcbcdb5578a42ffb63b` |
| **ARMv7 (Older 32-bit Phones)** | [`appsnap-v2.0.0-armeabi-v7a.apk`](v2.0.0/appsnap-v2.0.0-armeabi-v7a.apk) | **17.9 MB** | `9cac8faf6ba859727a382c54965703a72e9214bb00a338a4cb162f58b84e227a` |
| **Universal Release** | [`appsnap-v2.0.0.apk`](v2.0.0/appsnap-v2.0.0.apk) | **20.4 MB** | `e87f4d837fdb4c37ec14cda9a9653fd1821acd9943e74dcbcdb5578a42ffb63b` |

---

## 📋 Release Highlights

1. **Native Floating Shutter Over Any App:** Launches target apps with a floating camera button to capture actual live screens.
2. **Auto-Ghost Shutter:** Floating shutter hides itself for 75ms during captures so it never obscures the final screenshot.
3. **Pristine Clean Screenshots:** Zero fake frames, clock notches, or footers—only pure, high-resolution screenshots.
4. **Multi-Image Gallery Import (As-Is):** Add personal device screenshots with 100% original quality preserved.
5. **Interactive Pinch-to-Zoom Preview:** Click any image in the list to preview in full resolution, rename, or delete.
6. **Save to Device & Social Sharing:** 1-tap direct save for individual images to `Pictures/AppSnap/` and ZIP packages to `Download/AppSnap/`, plus native sharing.
7. **Ultra-Lightweight Minified Build:** Application size reduced by 62%+ via R8 shrinking and ABI-specific binary splits.
8. **Self-Contained ZIP Packaging:** Bundles `manifest.json`, responsive `contact_sheet.html`, and clean PNGs.
