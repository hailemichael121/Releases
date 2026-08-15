window.APP_CATALOG = {
  "repository": {
    "title": "Mobile App Releases Hub",
    "owner": "Yihun Shekuri",
    "description": "Centralized release repository for mobile application Android builds (APKs), release notes, version histories, and direct download links.",
    "updatedAt": "2026-08-14"
  },
  "apps": [
    {
      "id": "mezgebe-sbhat",
      "name": "Mezgebe Sbhat",
      "tagline": "Ethiopian Orthodox Church Hymns & Prayers with Audio and PDF Integration",
      "category": "Spiritual & Education",
      "iconUrl": "assets/icons/mezgebe-sbhat.png",
      "brandColor": "#3b82f6",
      "badge": "Stable",
      "authors": [
        "Yihun Shekuri",
        "Yeabsira Yonas"
      ],
      "techStack": [
        "Flutter",
        "Dart",
        "PDF Viewer",
        "Audio Services"
      ],
      "summary": "Mezgebe Sbhat supports the learning and preservation of Ethiopian Orthodox Tewahedo Church hymns by combining audio recordings with written PDF texts.",
      "description": "Mezgebe Sbhat integrates PDF versions of hymns and prayers alongside audio playback, making it easier for deacons, students, choir members, and believers to follow, study, and memorize liturgical content offline without ads.",
      "latestVersion": "v1.0.0",
      "latestReleaseDate": "2026-08-06",
      "releases": [
        {
          "version": "v1.0.0",
          "releaseDate": "2026-08-06",
          "title": "Initial Official Release",
          "apkFileName": "mezgebe-sbhat-v1.0.0.apk",
          "apkPath": "apps/mezgebe-sbhat/v1.0.0/mezgebe-sbhat-v1.0.0.apk",
          "fileSize": "19.4 MB",
          "minAndroid": "Android 6.0 (API 23)+",
          "architecture": "Universal (arm64-v8a, armeabi-v7a, x86_64)",
          "sha256": "7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99",
          "changelog": [
            "Audio playback for Ethiopian Orthodox hymns",
            "Synchronized PDF text view for Ge'ez and Amharic hymns",
            "Offline playback for downloaded resources",
            "Organized categories: Mezgebe Sbhat, Liturgy, Hymnal collections",
            "Clean, ad-free user interface for quiet study and prayer"
          ]
        }
      ]
    },
    {
      "id": "mezgebe-zema",
      "name": "Mezgebe Zema",
      "tagline": "Ethiopian Orthodox Church Liturgical Audio Library & Offline Player",
      "category": "Spiritual & Education",
      "iconUrl": "assets/icons/mezgebe-zema.png",
      "brandColor": "#8b5cf6",
      "badge": "Stable",
      "authors": [
        "Yihun Shekuri",
        "Yeabsira Yonas"
      ],
      "techStack": [
        "React Native",
        "TypeScript",
        "Track Player",
        "SQLite"
      ],
      "summary": "Mezgebe Zema helps users discover, organize, and play spiritual audio by church calendar months, days, and collections.",
      "description": "Browse liturgical audio by Ethiopian month (Meskerem, Tikimt, etc.), day, or repertoire (Aquaquam, Dgua, Tsome Dgua, Wereb). Create custom playlists, heart favorites, download for offline listening, and control playback from lock screen and background widget.",
      "latestVersion": "v1.2.0",
      "latestReleaseDate": "2026-08-06",
      "releases": [
        {
          "version": "v1.2.0",
          "releaseDate": "2026-08-06",
          "title": "Major Feature & Player Upgrade",
          "apkFileName": "mezgebe-zema-v1.2.0.apk",
          "apkPath": "apps/mezgebe-zema/v1.2.0/mezgebe-zema-v1.2.0.apk",
          "fileSize": "19.4 MB",
          "minAndroid": "Android 6.0 (API 23)+",
          "architecture": "Universal (arm64-v8a, armeabi-v7a, x86_64)",
          "sha256": "7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99",
          "changelog": [
            "Enhanced background audio controls and lock screen notification player",
            "Full calendar integration by Ethiopian month and day",
            "Custom playlist creation and track re-ordering",
            "Fast offline download manager with storage cleanup tools",
            "Variable speed playback for learning complex liturgical chants"
          ]
        }
      ]
    },
    {
      "id": "jan-note",
      "name": "Jan Note",
      "tagline": "Offline-First Spiritual Notebook & Rich Text Editor for Gubae Study",
      "category": "Productivity & Study",
      "iconUrl": "assets/icons/jan-note.png",
      "brandColor": "#10b981",
      "badge": "Build",
      "authors": [
        "Yihun Shekuri"
      ],
      "techStack": [
        "Flutter",
        "Riverpod",
        "Hive",
        "Flutter Quill"
      ],
      "summary": "A privacy-focused offline notebook specifically designed for Orthodox Gubae study and personal note organization.",
      "description": "Jan Note offers rich text editing with automatic verse chip detection, tag management, reading mode viewer, background selector, autosave, and spiritual insight graph placeholder.",
      "latestVersion": "v1.0.0",
      "latestReleaseDate": "2026-08-06",
      "releases": [
        {
          "version": "v1.0.0",
          "releaseDate": "2026-08-06",
          "title": "Initial Build",
          "apkFileName": "jan-note-v1.0.0.apk",
          "apkPath": "apps/jan-note/v1.0.0/jan-note-v1.0.0.apk",
          "fileSize": "91.2 MB",
          "minAndroid": "Android 6.0 (API 23)+",
          "architecture": "Universal (arm64-v8a, armeabi-v7a, x86_64)",
          "sha256": "648fc3bf0c30e9d201a6432a661dc481067a45b5ec7531fd4aad98ca9eb70141",
          "changelog": [
            "Splash screen with calm fade transitions",
            "Interactive onboarding tutorial flow persisted in Hive DB",
            "Rich Quill text editor with autosave, tags, verse chips, and bookmarks",
            "Distraction-free reading mode viewer",
            "Custom background selector and font size customization"
          ]
        }
      ]
    },
    {
      "id": "jan-alarm",
      "name": "Jan Alarm",
      "tagline": "Smart Spiritual Alarm & Daily Prayer Schedule Reminder",
      "category": "Utilities",
      "iconUrl": "assets/icons/jan-alarm.png",
      "brandColor": "#f59e0b",
      "badge": "Build",
      "authors": [
        "Yihun Shekuri"
      ],
      "techStack": [
        "React Native",
        "TypeScript",
        "Push Notifications"
      ],
      "summary": "Customizable alarm app tuned for canonical prayer hours, service reminders, and morning study alarms.",
      "description": "Set recurring prayer alarms, gentle wake-up tones, liturgical calendar notifications, and custom snooze settings with high reliability.",
      "latestVersion": "v1.0.0",
      "latestReleaseDate": "2026-08-06",
      "releases": [
        {
          "version": "v1.0.0",
          "releaseDate": "2026-08-06",
          "title": "Initial Build",
          "apkFileName": "jan-alarm-v1.0.0.apk",
          "apkPath": "apps/jan-alarm/v1.0.0/jan-alarm-v1.0.0.apk",
          "fileSize": "19.4 MB",
          "minAndroid": "Android 6.0 (API 23)+",
          "architecture": "Universal",
          "sha256": "7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99",
          "changelog": [
            "Seven Canonical Prayer time presets",
            "High-priority background alarms bypassing Doze mode",
            "Custom audio tone selector",
            "Snooze and wake-up challenges"
          ]
        }
      ]
    },
    {
      "id": "mekanat",
      "name": "Mekanat",
      "tagline": "Ethiopian Orthodox Church Mapping & Liturgical Companion",
      "category": "Spiritual & Mapping",
      "iconUrl": "assets/icons/mekanat.png",
      "brandColor": "#d4a017",
      "badge": "Build",
      "authors": [
        "Yihun Shekuri"
      ],
      "techStack": [
        "Flutter",
        "Dart",
        "OpenStreetMap",
        "Firebase",
        "Firestore"
      ],
      "summary": "Mekanat maps Ethiopian Orthodox churches, holy sites, daily prayers, 81-book Bible, and liturgical feast calendars across Ethiopia.",
      "description": "Mekanat provides interactive map navigation for Ethiopian Orthodox Tewahedo Church locations, parish contacts, church history, daily canonical prayers, 81-book Orthodox Bible integration, and feast day calendar events.",
      "latestVersion": "v1.0.0",
      "latestReleaseDate": "2026-08-06",
      "releases": [
        {
          "version": "v1.0.0",
          "releaseDate": "2026-08-06",
          "title": "Initial Mapping Build",
          "apkFileName": "mekanat-v1.0.0.apk",
          "apkPath": "apps/mekanat/v1.0.0/mekanat-v1.0.0.apk",
          "fileSize": "19.4 MB",
          "minAndroid": "Android 6.0 (API 23)+",
          "architecture": "Universal",
          "sha256": "7880a75f80de462e72ce827375d6f21dc5ff2004d220a165181d450189755b99",
          "changelog": [
            "Interactive OpenStreetMap church geolocation marker map",
            "Ethiopian Orthodox Bible 81-book search and reader",
            "Daily canonical prayer hour schedule",
            "Feast day events and liturgical calendar"
          ]
        }
      ]
    },
    {
      "id": "appsnap",
      "name": "AppSnap",
      "tagline": "Mobile App Screenshot Studio & Portfolio Exporter",
      "category": "Developer Tools & Productivity",
      "iconUrl": "assets/icons/appsnap.png",
      "brandColor": "#10b981",
      "badge": "Stable",
      "authors": [
        "Yihun Shekuri"
      ],
      "techStack": [
        "Flutter",
        "Dart",
        "Canvas Engine",
        "Archive & ZIP",
        "Local Notifications"
      ],
      "summary": "Automated mobile screenshot studio, UI crawler, and portfolio asset generator with mockup framing.",
      "description": "AppSnap transforms mobile app screenshots into polished portfolio artifacts. Features local-first UI state crawling, 5 mockup frames (Titanium, Clay, Portfolio Card, Studio Dark, Raw), Clean 9:41 AM Demo Status Bar replacement, and one-tap offline ZIP packaging with manifest.json and responsive contact_sheet.html.",
      "latestVersion": "v2.1.0",
      "latestReleaseDate": "2026-08-15",
      "releases": [
        {
          "version": "v2.1.0",
          "releaseDate": "2026-08-15",
          "title": "Release v2.1.0",
          "apkFileName": "appsnap-v2.1.0.apk",
          "apkPath": "apps/appsnap/v2.1.0/appsnap-v2.1.0.apk",
          "fileSize": "20.5 MB",
          "minAndroid": "Android 8.0 (API 26)+",
          "architecture": "ARM64 & Universal",
          "sha256": "25968c450d6c3aa36cf0d8ad18f0e41cd6c0ad0c2d48e5bd16535bb8993c08a2",
          "changelog": [
            "Rich mobile mockup frame styles (iPhone Titanium, Pixel Pro, Clay, Studio Onyx, Portfolio Card, Midnight Cyber)",
            "Quick drop and reject controls on scan and review screens",
            "Halved splash logo size for balanced startup branding",
            "Native floating shutter with auto-ghost 75ms fade",
            "Direct save to device (Pictures & Downloads) and social sharing"
          ]
        },
        {
          "version": "v2.0.0",
          "releaseDate": "2026-08-14",
          "title": "Release v2.0.0",
          "apkFileName": "appsnap-v2.0.0.apk",
          "apkPath": "apps/appsnap/v2.0.0/appsnap-v2.0.0.apk",
          "fileSize": "20.4 MB",
          "minAndroid": "Android 8.0 (API 26)+",
          "architecture": "ARM64 & Universal",
          "sha256": "e87f4d837fdb4c37ec14cda9a9653fd1821acd9943e74dcbcdb5578a42ffb63b",
          "changelog": [
            "Native floating camera shutter with auto-ghost capture",
            "Ultra-lightweight minified binary (62%+ size reduction)",
            "Strictly clean, unadulterated frameless screenshots",
            "Multi-image personal gallery import as-is",
            "Direct save to device (Pictures & Downloads) and social sharing"
          ]
        }
      ]
    }
  ]
};
