<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";

  defineProps({
    company: {
      type: Object as PropType<ApiOutput["company"]["getOneBySlug"]>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-if="company.company_pro.length && company.company_con.length"
      class="flex gap-6"
    >
      <Card class="flex-1">
        <CardHeader><CardTitle>What We Like</CardTitle></CardHeader>
        <CardContent>
          <div class="flex flex-col gap-3.5">
            <div v-for="pro in company.company_pro" class="flex gap-2">
              <CheckCircleIcon class="text-success size-6 flex-none" />{{
                pro.text
              }}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card class="flex-1">
        <CardHeader><CardTitle>What We Don't Like</CardTitle></CardHeader>
        <CardContent>
          <div class="flex flex-col gap-3.5">
            <div v-for="con in company.company_con" class="flex gap-2">
              <XCircleIcon class="text-destructive size-6 flex-none" />{{
                con.text
              }}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <ReviewSummary :company="company" />
  </div>
</template>
