// src/lib/bot/connection.js (Log logic)
const logs = [];
const addLog = (msg) => {
    logs.push({ time: new Date().toLocaleTimeString(), msg });
    if (logs.length > 50) logs.shift();
};

// ... di dalam event handler:
// addLog(`Pesan dari ${remoteJid}: ${text}`);

module.exports = { startBot, getLogs: () => logs };
