<template>
  <div class="w-full max-w-2xl">
    <div 
      class="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 pl-4 transition-all"
      :class="{ 'ring-2 ring-red-500/50 border-red-500/50': isListening }"
    >
      <button 
        type="button"
        @click="toggleListening"
        class="relative p-2 transition-colors focus:outline-none"
        :class="isListening ? 'text-red-500' : 'text-white/40 hover:text-white'"
      >
        <Icon icon="tabler:microphone" class="text-2xl" />
        <span v-if="isListening" class="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></span>
      </button>

      <input
        v-model="text"
        type="text"
        :placeholder="isListening ? 'Listening...' : 'Ask whatever you want'"
        class="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 text-lg px-3"
        @keyup.enter="handleSend"
      />

      <button @click="handleSend" class="bg-[#3b82f6] hover:bg-blue-500 text-white p-2.5 rounded-xl transition-all active:scale-95">
        <Icon icon="tabler:chevron-right" class="text-2xl" />
      </button>
    </div>
    
    <p v-if="speechError" class="text-red-400 text-xs mt-2 ml-4 italic">
      Error: {{ speechError }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Icon } from "@iconify/vue";
import { useSpeechRecognition } from '@/composables/useSpeechRec';

const emit = defineEmits(['submit']);
const text = ref('');

const { isListening, transcript, error: speechError, start, stop } = useSpeechRecognition();

watch(transcript, (newVal) => {
  if (newVal) text.value = newVal;
});

const toggleListening = () => {
  isListening.value ? stop() : start();
};

const handleSend = () => {
  if (text.value.trim()) {
    emit('submit', text.value);
    text.value = '';
  }
};
</script>