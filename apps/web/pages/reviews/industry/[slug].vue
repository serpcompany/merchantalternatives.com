<script setup lang="ts">
  import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
  } from "@heroicons/vue/20/solid";

  const { apiCaller } = useApiCaller();
  const slug = useRoute("reviews-industry-slug").params.slug;
  const p = useRoute("reviews-industry-slug").query.p;

  const page = computed(() => (p ? +p : 1));

  const industry = await apiCaller.industry.getPageBySlug.query({
    slug,
    page: page.value,
  });
  const industries = await apiCaller.industry.getAll.query();
</script>

<template>
  <div class="bg-primary flex h-[420px] items-center pt-20">
    <div class="px-20">
      <div class="max-w-5xl">
        <h2 class="text-6xl font-medium tracking-tight text-white">
          Find Your Next Partner in the {{ industry.name }} Industry
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-300">
          With over 15 years of first-hand experience in the merchant processing
          industry experience, it is our mission to something something
          something about our reviews.
        </p>
      </div>
    </div>
  </div>
  <div class="mx-auto max-w-6xl px-4 py-6">
    <div class="flex gap-10 pt-6">
      <div class="flex-1">
        <div class="flex flex-col gap-4">
          <NuxtLink
            v-for="company in industry.company"
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
            :to="`/reviews/industry/${slug}?p=${page - 1}`"
            external
            class="flex items-center font-medium hover:text-gray-700"
          >
            <ArrowLongLeftIcon class="mr-3 h-5 w-5" aria-hidden="true" />
            Previous
          </NuxtLink>
          <span v-if="page > 1">•</span>
          <NuxtLink
            :to="`/reviews/industry/${slug}?p=${page + 1}`"
            external
            class="flex items-center font-medium hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon class="ml-3 h-5 w-5" aria-hidden="true" />
          </NuxtLink>
        </nav>
      </div>
      <div class="hidden flex-none flex-col gap-6 md:flex">
        <Card>
          <CardHeader><CardTitle>Try another industry</CardTitle></CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-2">
              <li v-for="industry in industries">
                <NuxtLink
                  :to="`/reviews/industry/${industry.slug}`"
                  class="text-primary hover:underline"
                >
                  {{ industry.name }}
                </NuxtLink>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
