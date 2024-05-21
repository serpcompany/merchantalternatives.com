<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/modules/ui/lib/utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    :class="cn('text-card-foreground bg-card/90 backdrop-blur-md', props.class)"
  >
    <slot />
  </div>
</template>
