const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { handleCommand } = require('./commands');

let sock = null;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
    });

    sock.ev.on('creds.update', saveCreds);

    // Tambahkan method pairing khusus
    sock.requestPairing = async (phoneNumber) => {
        if (!sock.authState.creds.registered) {
            return await sock.requestPairingCode(phoneNumber);
        }
        return "Already registered";
    };

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const remoteJid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        const isCommand = await handleCommand(sock, remoteJid, text);
        if (!isCommand && text.toLowerCase() === 'halo') {
            await sock.sendMessage(remoteJid, { text: 'Halo! Ketik !menu untuk fitur.' });
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        }
    });

    return sock;
}

module.exports = { startBot };
