// File: android-kotlin/app/src/main/java/com/hws/bot/NodeService.kt
package com.hws.bot

import android.app.*
import android.content.Intent
import android.os.IBinder
import com.janeasystems.nodejs_mobile.NodeService

class BotService : NodeService() {
    override fun onCreate() {
        super.onCreate()
        // Path ke server.js anda yang di-bundle ke assets
        startNodeWithScript("server.js")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val channelId = "bot_channel"
        val channel = NotificationChannel(channelId, "Bot Service", NotificationManager.IMPORTANCE_LOW)
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        
        val notification = Notification.Builder(this, channelId)
            .setContentTitle("HWS Bot Running")
            .setContentText("Bot WhatsApp aktif di background")
            .setSmallIcon(android.R.drawable.ic_menu_info_details)
            .build()
        
        startForeground(1, notification)
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
