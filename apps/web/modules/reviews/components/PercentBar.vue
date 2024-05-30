<script setup lang="ts">
  defineProps({
    percent: {
      type: Number,
      required: true,
    },
  });
</script>

<template>
  <div class="mt-0.5 h-4 bg-gray-200">
    <div class="bg-primary h-full" :style="`width: ${percent}%;`"></div>
  </div>
</template>
