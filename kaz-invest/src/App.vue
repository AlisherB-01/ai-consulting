<template>
  <main class="min-h-screen bg-[#002b5c] flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-3xl">
      <ChatHero />
      
      <ChatInput @submit="handleSearch" :disabled="isLoading" />

      <div v-if="isLoading" class="mt-6 text-white/50 animate-pulse">
        AI размышляет...
      </div>
      
      <div v-if="answer" class="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-white">
        <p class="text-sm text-blue-400 mb-2 font-bold uppercase tracking-widest">Ответ:</p>
        <p class="leading-relaxed whitespace-pre-wrap">{{ answer }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import ChatHero from './components/chat/ChatHero.vue';
import ChatInput from './components/chat/ChatInput.vue';
import { sendMessageToAI } from './api/chatService';

const answer = ref('');
const isLoading = ref(false);

const handleSearch = async (query) => {
  isLoading.value = true;
  answer.value = '';

  try {
    const data = await sendMessageToAI(query);
    answer.value = data.reply;
  } catch (err) {
    answer.value = "Произошла ошибка при связи с сервером.";
  } finally {
    isLoading.value = false;
  }
};
</script>