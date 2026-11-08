package com.hws.bot

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import android.content.Intent

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Start the background service
        startService(Intent(this, BotService::class.java))

        val webView = findViewById<WebView>(R.id.webView)
        webView.settings.javaScriptEnabled = true
        // Assuming the Node.js server runs on localhost:3000
        webView.loadUrl("http://localhost:3000")
        webView.webViewClient = WebViewClient()
    }
}
