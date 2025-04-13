<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Chat con Socket.IO</h1>

    <div class="space-y-4">
      <div>
        <input
          v-model="user"
          placeholder="Tu nombre"
          class="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          v-model="message"
          placeholder="Escribe un mensaje"
          class="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button
          @click="sendMessage"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </div>
    </div>

    <ul class="mt-6 space-y-4">
      <li
        v-for="(msg, i) in messages"
        :key="i"
        class="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-start"
      >
        <div class="text-lg font-semibold text-blue-600">{{ msg.user }}</div>
        <span class="text-gray-700">{{ msg.message }}</span>
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
});

onBeforeUnmount(() => {
  // Desconectar el socket cuando el componente se destruye
  $socket.disconnect()
})
function sendMessage() {
  if (user.value && message.value) {
    $socket.emit('messageToServer', { user: user.value, message: message.value })
    message.value = ''
  }
}
</script>
