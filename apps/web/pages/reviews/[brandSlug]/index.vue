<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";

  defineProps({
    company: {
      type: Object as PropType<ApiOutput["company"]["getOneBySlug"]>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex flex-col gap-6">
    <ReviewSummary :company="company" with-button />
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div
          v-if="company.merchant_summary"
          v-html="company.merchant_summary"
          class="externalHtml"
        />
        <p v-else>Nothing here yet.</p>
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${company.slug}/about`)"
        >See all details</CardButton
      >
    </Card>
    <Card v-if="company.pricing_details">
      <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
      <CardContent>
        <div v-html="company.pricing_details" class="externalHtml" />
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${company.slug}/pricing`)"
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
