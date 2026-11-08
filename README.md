# HWS-Bot (WhatsApp Automation)

Bot WhatsApp berbasis Next.js dengan dukungan QR Code dan Pairing Code, dirancang untuk dijadikan aplikasi Android (APK) via React Native + Node.js Mobile.

## Struktur Proyek
- `/src`: Backend Bot (Baileys) & Web Dashboard (Next.js).
- `/android-wrapper`: Proyek React Native (Wajib dibuat).
- `.github/workflows/android-build.yml`: Konfigurasi CI/CD otomatis untuk build APK.

## Panduan Setup Lengkap
1. **Setup Android Wrapper**:
   - Install React Native: `npx react-native init android-wrapper`
   - Integrasikan `nodejs-mobile-react-native` untuk menjalankan bot engine di background.
   - Pindahkan logic bot ke dalam folder `android-wrapper/nodejs-project`.

2. **Develop**:
   - `npm install`
   - `npm run dev`

3. **Deploy & Build**:
   - Push kode ke GitHub, `android-build.yml` akan otomatis memicu build APK.
   - Hasil APK dapat diunduh dari menu "Actions" di GitHub.
