<script setup lang="ts">
  import { CheckIcon } from "@heroicons/vue/24/outline";

  const { apiCaller } = useApiCaller();

  const brands = await apiCaller.brand.getMany.query();
</script>

<template>
  <div class="flex justify-center gap-6 px-4 pt-4">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-4">
      <SaasPageHeader class="mb-px">
        <template #title>All Brands</template>
        <template #subtitle>Click on a profile to see it's reviews</template>
      </SaasPageHeader>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.slug}`">
        <Card class="flex gap-3 p-4 hover:shadow">
          <BrandLogo
            :src="brand.logoUrl"
            :name="brand.name"
            class="size-12 flex-none"
          />
          <div class="flex flex-1 flex-col items-start">
            <h1 class="text-xl font-semibold">{{ brand.name }}</h1>
            <p class="text-muted-foreground">{{ brand.reviewOneliner }}</p>
            <div class="mt-3 flex-col gap-1">
              <div class="flex items-center gap-2">
                <CheckIcon class="text-primary size-5" />
                <span class="">{{ brand.reviewSummaryPoint1 }}</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckIcon class="text-primary size-5" />
                <span class="">{{ brand.reviewSummaryPoint2 }}</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckIcon class="text-primary size-5" />
                <span class="">{{ brand.reviewSummaryPoint3 }}</span>
              </div>
            </div>
          </div>
          <StarRating
            v-if="brand.rating"
            :rating="brand.rating"
            size="lg"
            with-text
            class="my-auto flex-none"
          />
        </Card>
      </NuxtLink>
    </div>
    <div class="w-72" />
    <div class="fixed right-40 hidden w-72 flex-none flex-col gap-6 md:flex">
      <Card class="h-80 w-full" />
      <Card class="h-40 w-full" />
    </div>
  </div>
</template>
