<script setup lang="ts">
  import { StarIcon } from "@heroicons/vue/24/outline";

  defineProps({
    rating: {
      type: Number,
      required: true,
    },
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      default: "md",
    },
    withText: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div class="flex flex-col items-center">
    <span
      v-if="withText"
      class="font-medium"
      :class="{ 'text-6xl': size === 'md', 'text-lg': size === 'sm' }"
      >{{ rating }}</span
    >
    <div
      class="flex"
      :class="{
        'mt-1.5': withText && size === 'md',
        'mt-0.5': withText && size === 'sm',
      }"
    >
      <div v-for="s in 5" class="relative">
        <div class="relative left-0 top-0 -z-10">
          <StarIcon
            class="stroke-yellow-500"
            :class="{ 'size-6': size === 'md', 'size-3.5': size === 'sm' }"
          />
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
            class="text-transparent"
            :class="{
              'fill-yellow-500': rating >= s - 1,
              'size-6': size === 'md',
              'size-3.5': size === 'sm',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
