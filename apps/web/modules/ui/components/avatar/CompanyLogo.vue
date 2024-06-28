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
  <Avatar shape="square" class="rounded-none">
    <AvatarImage v-if="src" :src="src" />
    <div
      v-else
      class="bg-secondary flex h-full w-full items-center justify-center"
    >
      <span class="font-bold">{{ initials }}</span>
    </div>
  </Avatar>
</template>
