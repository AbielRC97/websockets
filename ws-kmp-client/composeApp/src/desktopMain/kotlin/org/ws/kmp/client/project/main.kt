package org.ws.kmp.client.project

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "ws-kmp-client",
    ) {
        App()
    }
}