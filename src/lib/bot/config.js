const fs = require('fs');

const CONFIG_FILE = './config.json';

// Fungsi untuk memuat konfigurasi
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { groupManagement: { autoKick: false } };
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

// Fungsi untuk menyimpan konfigurasi
function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

module.exports = { loadConfig, saveConfig };
