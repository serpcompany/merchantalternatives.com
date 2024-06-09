<script setup lang="ts">
  import { ArrowRightIcon } from "@heroicons/vue/24/outline";

  const { apiCaller } = useApiCaller();

  const industries = await apiCaller.industry.getAll.query();
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-24">
    <div class="border-b px-3 pb-6">
      <h1 class="text-2xl font-semibold">Find a Merchant</h1>
    </div>
    <div class="flex gap-10 pt-6">
      <div class="mt-6 grid grid-cols-4 gap-8">
        <NuxtLink
          v-for="industry in industries"
          :key="industry.slug"
          :to="`/reviews/industry/${industry.slug}`"
          class="hover:border-primary group relative flex flex-col border border-transparent bg-white px-4 pb-8 pt-4"
        >
          <h3 class="text-xl font-semibold">{{ industry.name }}</h3>
          <p class="text-gray-500">{{ industry.description }}</p>
          <ArrowRightIcon
            class="text-primary absolute bottom-4 right-4 hidden h-6 w-6 group-hover:block"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
