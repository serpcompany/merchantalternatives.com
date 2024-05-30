<script setup lang="ts">
  import { ArrowRightIcon } from "@heroicons/vue/24/outline";

  defineEmits(["click"]);
</script>

<template>
  <div class="relative bottom-0 w-full border-t">
    <button
      type="button"
      @click="$emit('click')"
      class="text-muted-foreground w-full py-3 font-semibold"
    >
      <slot />
      &rarr;
    </button>
  </div>
</template>
