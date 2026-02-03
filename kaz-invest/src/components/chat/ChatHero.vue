<template>
  <header class="space-y-4 mb-8">
    <div class="bg-[#2b4b85] w-10 h-10 rounded-lg flex items-center justify-center shadow-inner">
<Icon class="text-white" icon="tabler:message-circle-filled" />
    </div>
    
    <div class="space-y-2">
      <h2 class="text-white text-2xl font-light opacity-90">
        {{ greeting }}
      </h2>
      <h1 class="text-white text-5xl font-bold tracking-tight leading-tight">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-white/50 text-lg max-w-md leading-relaxed pt-2">
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  greeting: { type: String, default: 'Hi there!' },
  title: { type: String, default:  'What would you like to know?' },
  subtitle: { type: String, default: 'Use one of the most common prompts below to ask your own question' }
});
</script>