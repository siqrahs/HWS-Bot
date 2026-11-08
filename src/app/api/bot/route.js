import { startBot } from '@/lib/bot/connection.mjs';

let botInstance = null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, phoneNumber } = req.body;
    
    if (action === 'start') {
      botInstance = await startBot();
      res.status(200).json({ status: 'Bot initializing...' });
    } else if (action === 'pair') {
      // Logic untuk meminta pairing code
      if (botInstance && phoneNumber) {
        const code = await botInstance.requestPairingCode(phoneNumber);
        res.status(200).json({ pairingCode: code });
      } else {
        res.status(400).json({ error: 'Bot not initialized or phone number missing' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
