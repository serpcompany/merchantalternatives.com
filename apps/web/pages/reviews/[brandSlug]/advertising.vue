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
    <Card v-if="company.advertising_sales_details">
      <CardHeader><CardTitle>Advertising & Sales</CardTitle></CardHeader>
      <CardContent>
        <div v-html="company.pricing_details" class="externalHtml" />
      </CardContent>
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
