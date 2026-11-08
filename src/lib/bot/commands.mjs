import { loadConfig } from './config.mjs';

async function handleCommand(sock, remoteJid, text) {
    const command = text.split(' ')[0].toLowerCase();
    const config = loadConfig();

    // Cek apakah pengirim ada di block list
    if (config.blockList.includes(remoteJid.split('@')[0])) {
        return true; // Blokir pesan dari nomor ini
    }

    // Jika silent mode aktif untuk grup ini, jangan balas apapun
    if (config.silentMode.includes(remoteJid)) {
        return true;
    }

    switch (command) {
        case '!menu':
            await sock.sendMessage(remoteJid, { text: "Menu: !info, !group" });
            break;
        // ... command lainnya
    }
    return true;
}

export { handleCommand };
