<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      withLabel?: boolean;
    }>(),
    {
      withLabel: true,
    },
  );
</script>

<template>
  <NuxtImg src="/images/logo.png" alt="Logo" height="64" />
</template>
