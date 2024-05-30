<script setup lang="ts">
  defineProps({
    src: {
      type: null as unknown as PropType<string | null>,
      default: null,
    },
    name: {
      type: String,
      default: "?",
    },
  });
</script>

<template>
  <Avatar shape="square" class="bg-primary/10">
    <AvatarImage v-if="src" :src="src" />
    <span v-else="name" class="text-2xl font-bold">{{
      name.substring(0, 1)
    }}</span>
  </Avatar>
</template>
