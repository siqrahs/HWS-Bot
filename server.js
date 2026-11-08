// server.js
async function start() {
  const { startBot } = await import('./src/lib/bot/connection.mjs');
  console.log("Starting Standalone Bot Engine...");
  await startBot();
  console.log("Bot engine is live!");
}

start().catch(err => {
  console.error("Bot failed to start:", err);
});
