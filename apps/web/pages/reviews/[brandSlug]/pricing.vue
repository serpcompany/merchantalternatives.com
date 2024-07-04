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
    <Card v-if="company.pricing_details">
      <CardHeader><CardTitle>Pricing Summary</CardTitle></CardHeader>
      <CardContent
        ><div v-html="company.pricing_details" class="externalHtml" />
      </CardContent>
    </Card>
    <Card v-if="company.contract_terms_details">
      <CardHeader><CardTitle>Contracts and Terms</CardTitle></CardHeader>
      <CardContent
        ><div v-html="company.contract_terms_details" class="externalHtml" />
      </CardContent>
    </Card>
    <Card v-if="company.support_setup_details">
      <CardHeader><CardTitle>Setup and Support</CardTitle></CardHeader>
      <CardContent
        ><div v-html="company.support_setup_details" class="externalHtml" />
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
