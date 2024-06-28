<script setup lang="ts">
  import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";

  type ProOrCon = {
    id: number;
    text: string;
  };

  defineProps({
    pros: {
      type: Array as PropType<ProOrCon[]>,
      required: true,
    },
    cons: {
      type: Array as PropType<ProOrCon[]>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex gap-2">
    <Card class="flex-1">
      <CardHeader class="p-3 lg:px-5 lg:py-6"
        ><CardTitle>What We Like</CardTitle></CardHeader
      >
      <CardContent class="p-3 lg:px-5 lg:pb-6 lg:pt-0">
        <div class="flex flex-col gap-3.5">
          <div v-for="pro in pros" class="flex gap-2">
            <CheckCircleIcon class="text-success size-6 flex-none" />{{
              pro.text
            }}
          </div>
        </div>
      </CardContent>
    </Card>
    <Card class="flex-1">
      <CardHeader class="p-3 lg:px-5 lg:py-6"
        ><CardTitle>What We Don't Like</CardTitle></CardHeader
      >
      <CardContent class="p-3 lg:px-5 lg:pb-6 lg:pt-0">
        <div class="flex flex-col gap-3.5">
          <div v-for="con in cons" class="flex gap-2">
            <XCircleIcon class="text-destructive size-6 flex-none" />{{
              con.text
            }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
