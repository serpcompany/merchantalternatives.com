<script setup lang="ts">
  import { StarIcon } from "@heroicons/vue/24/outline";

  defineProps({
    rating: {
      type: Number,
      required: true,
    },
    withText: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div class="flex flex-col items-center">
    <span v-if="withText" class="text-6xl font-medium">{{ rating }}</span>
    <div class="mt-1.5 flex">
      <div v-for="s in 5" class="relative">
        <div class="relative left-0 top-0 -z-10">
          <StarIcon class="size-6 stroke-yellow-500" />
        </div>
        <div
          class="absolute left-0 top-0 overflow-hidden"
          :class="{
            'w-0': rating >= s - 1 && rating < s - 1 + 0.25,
            'w-1/2': rating >= s - 1 + 0.25 && rating < s - 1 + 0.75,
            'w-full': rating >= s - 1 + 0.75 && rating < s,
          }"
        >
          <StarIcon
            class="size-6 text-transparent"
            :class="{ 'fill-yellow-500': rating >= s - 1 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
