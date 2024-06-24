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
    <ProsAndCons
      v-if="company.company_pro.length && company.company_con.length"
      :pros="company.company_pro"
      :cons="company.company_con"
    />
    <ReviewSummary :company="company" />
  </div>
</template>
