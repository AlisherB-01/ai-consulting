<template>
  <div class="relative w-full max-w-2xl group">
    <div class="flex items-center bg-[#1a2b4b]/50 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-white/30 transition-colors">
      <AppButton variant="icon" class="mr-2">
        <span class="material-icons text-xl">mic</span>
      </AppButton>

      <input
        v-model="query"
        type="text"
        placeholder="Ask whatever you want"
        class="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg py-3"
        @keyup.enter="handleSend"
      />

      <AppButton @click="handleSend" class="ml-2 !rounded-lg bg-blue-500/80">
        <span class="material-icons text-2xl">chevron_right</span>
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppButton from './ui/AppButton.vue';

const emit = defineEmits(['submit']);
const query = ref('');

const handleSend = () => {
  if (query.value.trim()) {
    emit('submit', query.value);
    query.value = '';
  }
};
</script>