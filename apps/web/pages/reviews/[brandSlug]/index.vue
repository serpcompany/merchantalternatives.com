<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";

  defineProps<{
    brand: ApiOutput["brand"]["bySlug"];
  }>();

  const getFirstParagraph = (html: string): string =>
    html.split("<p>")[1].split("</p>")[0];
</script>

<template>
  <div class="flex flex-col gap-6">
    <ReviewSummary :brand="brand" with-button />
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div v-html="brand.overview" class="externalHtml" />
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brand.slug}/about`)"
        >See all details</CardButton
      >
    </Card>
    <Card>
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
