<script setup>
  import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
  } from "@heroicons/vue/20/solid";

  defineProps({
    page: {
      type: Number,
      default: 1,
    },
  });
</script>

<template>
  <nav
    class="flex items-center justify-end gap-4 border-gray-200 px-4 text-gray-400 sm:px-0"
  >
    <NuxtLink
      v-if="page > 1"
      :href="`/reviews?p=${page - 1}`"
      class="inline-flex items-center pr-1 pt-4 font-medium hover:text-gray-700"
    >
      <ArrowLongLeftIcon class="mr-3 h-5 w-5" aria-hidden="true" />
      Previous
    </NuxtLink>
    <span v-if="page > 1" class="pt-4">•</span>
    <NuxtLink
      :href="`/reviews?p=${page + 1}`"
      class="inline-flex items-center pl-1 pt-4 font-medium hover:text-gray-700"
    >
      Next
      <ArrowLongRightIcon class="ml-3 h-5 w-5" aria-hidden="true" />
    </NuxtLink>
  </nav>
</template>
