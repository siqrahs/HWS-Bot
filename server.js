// server.js
const { startBot } = require('./src/lib/bot/connection');

console.log("Starting Standalone Bot Engine...");

// Jalankan bot tanpa perlu browser/UI Next.js
startBot().then((sock) => {
    console.log("Bot engine is live!");
}).catch(err => {
    console.error("Bot failed to start:", err);
});
