const { loadConfig, saveConfig } = require('../../lib/bot/config');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(loadConfig());
  } else if (req.method === 'POST') {
    saveConfig(req.body);
    res.status(200).json({ status: 'Saved' });
  }
}
