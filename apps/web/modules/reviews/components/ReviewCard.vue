<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import { CheckIcon } from "@heroicons/vue/24/outline";

  defineProps({
    brand: {
      type: Object as PropType<ApiOutput["brand"]["getMany"][0]>,
      required: true,
    },
  });
</script>

<template>
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
</template>
