<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import { CheckIcon } from "@heroicons/vue/24/outline";

  defineProps({
    company: {
      type: Object as PropType<ApiOutput["company"]["getPage"][0]>,
      required: true,
    },
  });
</script>

<template>
  <Card class="flex gap-3 px-4 py-5 hover:shadow">
    <BrandLogo
      :src="company.company_image?.length ? company.company_image[0].url : null"
      :name="company.name"
      class="size-12 flex-none"
    />
    <div class="flex flex-1 flex-col items-start">
      <h1 class="text-xl font-semibold">{{ company.name }}</h1>
      <p class="text-muted-foreground">{{ company.merchant_summary }}</p>
      <!--
      <div class="mt-3 flex-col gap-1">
        <div class="flex items-center gap-2">
          <CheckIcon class="text-primary size-5" />
          <span class="">{{ company.reviewSummaryPoint1 }}</span>
        </div>
        <div class="flex items-center gap-2">
          <CheckIcon class="text-primary size-5" />
          <span class="">{{ company.reviewSummaryPoint2 }}</span>
        </div>
        <div class="flex items-center gap-2">
          <CheckIcon class="text-primary size-5" />
          <span class="">{{ company.reviewSummaryPoint3 }}</span>
        </div>
      </div>
    --></div>
    <StarRating
      v-if="company.editor_rating"
      :rating="+company.editor_rating"
      size="lg"
      with-text
      class="my-auto flex-none"
    />
  </Card>
</template>
