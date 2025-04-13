<template>
  <div class="container p-4">
    <h1 class="text-2xl font-bold mb-4">Chat con Socket.IO</h1>

    <div class="mb-2">
      <input v-model="user" placeholder="Tu nombre" class="form-control mb-2" />
      <input v-model="message" placeholder="Mensaje" class="form-control mb-2" />
      <button @click="sendMessage" class="btn btn-primary">Enviar</button>
    </div>

    <ul class="list-group mt-4">
      <li v-for="(msg, i) in messages" :key="i" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="fw-bold text-primary">{{ msg.user }}</div>
        <span class="ms-2 text-body">{{ msg.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { ref, onMounted } from 'vue'

const { $socket } = useNuxtApp() as unknown as  { $socket: Socket };

const user = ref('')
const message = ref('')
const messages = ref<{ user: string, message: string }[]>([])

onMounted(() => {
  $socket.on('messageToClient', (data: { user: string, message: string }) => {
    messages.value.push(data)
  })
})

function sendMessage() {
  if (user.value && message.value) {
    $socket.emit('messageToServer', { user: user.value, message: message.value })
    message.value = ''
  }
}
</script>
