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
    <ProsAndCons :pros="company.company_pro" :cons="company.company_con" />
    <ReviewSummary :company="company" />
  </div>
</template>
