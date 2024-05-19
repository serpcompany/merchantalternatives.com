<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/modules/ui/lib/utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <div
    :class="
      cn(
        'bg-card/90 text-card-foreground backdrop-blur-md shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
