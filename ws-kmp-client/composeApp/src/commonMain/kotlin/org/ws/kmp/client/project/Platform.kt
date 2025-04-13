package org.ws.kmp.client.project

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform