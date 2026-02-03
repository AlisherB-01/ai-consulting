<template>
  <button
    :class="[
      'flex items-center justify-center transition-all duration-200 active:scale-95',
      variantClasses[variant]
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' }
});

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl',
  icon: 'text-gray-400 hover:text-white p-2'
};
</script>