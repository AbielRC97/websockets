// plugins/socket.client.ts
import { io } from 'socket.io-client'

export default defineNuxtPlugin(nuxtApp => {
  const socket = io('http://localhost:3000/chat', {  // Asegúrate de que la URL sea la correcta
    transports: ['websocket'],
    withCredentials: true
  })

  nuxtApp.provide('socket', socket)
})
