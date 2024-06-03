<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";

  defineProps({
    brand: {
      type: Object as PropType<ApiOutput["brand"]["bySlug"]>,
      required: true,
    },
  });

  const getFirstParagraph = (html: string): string =>
    html.split("<p>")[1].split("</p>")[0];
</script>

<template>
  <div class="flex flex-col gap-6">
    <ReviewSummary :brand="brand" with-button />
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div
          v-if="brand.overview"
          v-html="brand.overview"
          class="externalHtml"
        />
        <p v-else>Nothing here yet.</p>
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brand.slug}/about`)"
        >See all details</CardButton
      >
    </Card>
    <Card v-if="brand.overview">
      <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
      <CardContent>
        <p v-if="brand.overview">{{ getFirstParagraph(brand.overview) }}</p>
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brand.slug}/pricing`)"
        >See all details</CardButton
      >
    </Card>
  </div>
</template>

<style scoped>
  :deep(.externalHtml) {
    p {
      margin-bottom: 10px;
    }
  }
</style>
