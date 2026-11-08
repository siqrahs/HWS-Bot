# HWS-Bot (WhatsApp Automation)

Bot WhatsApp berbasis Next.js dengan dukungan QR Code dan Pairing Code, dirancang untuk dijadikan aplikasi Android (APK) via React Native / Kotlin + Node.js Mobile.

## ✨ Fitur Utama
- **Koneksi Fleksibel**: QR Code & Pairing Code (via Dashboard)
- **Auto-Responder**: Balasan otomatis (contoh: "halo")
- **Command System**: `!menu`, `!group`, `!settings` (extensible)
- **Konfigurasi Persisten**: Block List, Silent Mode, Group Management (tersimpan di `config.json`)
- **Dashboard Real-time**: Next.js 14 (App Router) + WebView Android
- **Background Service**: Bot jalan di Foreground Service Kotlin (tetap hidup di background)

## 🏗️ Arsitektur Proyek
```
/
├── src/                    # Backend Bot (Baileys) & Dashboard (Next.js)
│   ├── app/                # Next.js Pages & API Routes
│   │   ├── api/            # API: /bot (start, pair), /config (get, save)
│   │   ├── settings/       # Halaman Pengaturan (Client Component)
│   │   ├── layout.js       # Root Layout
│   │   └── page.js         # Dashboard Utama (Onboarding + Status)
│   └── lib/bot/            # Core Engine (ESM .mjs)
│       ├── connection.mjs  # Koneksi WhatsApp + Event Handler
│       ├── commands.mjs    # Router Command
│       └── config.mjs      # Persistent Config (JSON)
├── android-kotlin/         # Wrapper Android (Kotlin + WebView)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/hws/bot/
│   │   │   │   ├── MainActivity.kt     # WebView + Start Service
│   │   │   │   └── BotService.kt       # Foreground Service + Node.js Mobile
│   │   │   ├── res/layout/activity_main.xml
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   └── settings.gradle
├── server.js               # Entry Point Standalone (Node.js)
├── package.json
├── next.config.js          # Output: 'standalone'
├── jsconfig.json           # Path Alias (@/lib/*)
└── .github/workflows/      # CI/CD Build APK Otomatis
```

## 🚀 Cara Kerja (Workflow)
1. **User Buka APK** → `MainActivity` load WebView ke `http://localhost:3000` & start `BotService`.
2. **BotService** → Jalankan `node server.js` (via Node.js Mobile) → Koneksi ke WhatsApp via Baileys.
3. **Dashboard (WebView)** → User scan QR / input nomor Pairing → Bot Terhubung.
4. **Bot Berjalan** → Menerima pesan → Proses Command/Config → Kirim balasan.

## 🛠️ Development Local

### 1. Jalankan Dashboard Only
```bash
git clone https://github.com/siqrahs/HWS-Bot
cd HWS-Bot
npm install
npm run dev
# Buka http://localhost:3000
```

### 2. Build APK Manual (Butuh Android Studio)
```bash
# 1. Build Next.js ke standalone
npm run build

# 2. Copy hasil build ke assets Android
# cp -r .next/standalone/* android-kotlin/app/src/main/assets/

# 3. Buka folder android-kotlin/ di Android Studio
# 4. Build > Build Bundle(s) / APK(s) > Build APK(s)
```

## ☁️ Otomatis Build APK (GitHub Actions)
**Tidak perlu Android Studio lokal!**
1. Push ke branch `main` (atau buat tag release).
2. GitHub Actions otomatis:
   - Install Node.js deps & Build Next.js
   - Setup Java 17 & Android SDK
   - Build APK Debug (`gradle assembleDebug`)
3. Download `app-debug.apk` di tab **Actions > Artifacts**.

## ⚙️ Konfigurasi Penting
- **`next.config.js`**: `output: 'standalone'` (wajib untuk embed ke Android assets).
- **`jsconfig.json`**: Path alias `@/lib/*` agar import rapi.
- **`src/lib/bot/*.mjs`**: Pakai ekstensi `.mjs` karena **Baileys adalah Pure ESM**.
- **`android-kotlin/app/build.gradle`**: Dependency `com.janeasystems:nodejs-mobile-android` untuk menjalankan Node.js di Android.

## ⚠️ Disclaimer & Keamanan
> **PERINGATAN**: Penggunaan bot otomatis WhatsApp melanggar ToS WhatsApp. Risiko **nomor diblokir permanen** tinggi. Gunakan bijak, jangan spam, dan tanggung jawab penuh ada pada pengguna.
> File sesi (`auth_info/`) **sudah di-gitignore** agar tidak bocor ke GitHub.
