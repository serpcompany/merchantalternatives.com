<script setup lang="ts">
  import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
  } from "@heroicons/vue/20/solid";

  const { apiCaller } = useApiCaller();
  const p = useRoute("reviews-industry-industrySlug").query.p;
  const industrySlug = useRoute("reviews-industry-industrySlug").params
    .industrySlug;

  const page = computed(() => (p ? +p : 1));

  const companies = await apiCaller.company.getPageByIndustry.query({
    page: page.value,
    industrySlug,
  });
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-24">
    <div class="border-b px-3 pb-6">
      <h1 class="text-2xl font-semibold">Find a Merchant</h1>
    </div>
    <div class="flex gap-10 pt-6">
      <div class="hidden w-72 flex-none flex-col gap-6 md:flex">
        <Card class="h-80 w-full">
          <CardHeader><CardTitle>Filter</CardTitle></CardHeader>
        </Card>
      </div>
      <div class="flex-1">
        <div class="flex flex-col gap-4">
          <NuxtLink
            v-for="company in companies"
            :key="company.id"
            :to="`/reviews/${company.slug}`"
          >
            <ReviewCard :company="company" />
          </NuxtLink>
        </div>
        <nav
          class="mt-4 flex items-center justify-end gap-4 border-gray-200 px-4 pt-4 text-gray-400 sm:px-0"
        >
          <NuxtLink
            v-if="page > 1"
            :to="`/reviews?p=${page - 1}`"
            external
            class="flex items-center font-medium hover:text-gray-700"
          >
            <ArrowLongLeftIcon class="mr-3 h-5 w-5" aria-hidden="true" />
            Previous
          </NuxtLink>
          <span v-if="page > 1">•</span>
          <NuxtLink
            :to="`/reviews?p=${page + 1}`"
            external
            class="flex items-center font-medium hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon class="ml-3 h-5 w-5" aria-hidden="true" />
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>
