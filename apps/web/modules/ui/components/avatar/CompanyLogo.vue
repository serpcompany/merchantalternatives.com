<script setup lang="ts">
  const props = defineProps({
    src: {
      type: null as unknown as PropType<string | null>,
      default: null,
    },
    name: {
      type: String,
      default: "?",
    },
  });

  const initials = computed(() =>
    props.name
      .split(" ")
      .map((word) => word[0])
      .join(""),
  );
</script>

<template>
  <Avatar shape="square" class="bg-primary/10 rounded-none">
    <AvatarImage v-if="src" :src="src" />
    <span v-else class="font-bold">{{ initials }}</span>
  </Avatar>
</template>
