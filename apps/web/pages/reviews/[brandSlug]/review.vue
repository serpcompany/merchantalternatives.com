<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";

  defineProps({
    brand: {
      type: Object as PropType<ApiOutput["brand"]["bySlug"]>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex flex-col gap-6">
    <ReviewSummary :brand="brand" />
    <div
      v-if="brand.reviewPros.length && brand.reviewCons.length"
      class="flex gap-6"
    >
      <Card class="flex-1">
        <CardHeader><CardTitle>What We Like</CardTitle></CardHeader>
        <CardContent>
          <div class="flex flex-col gap-3.5">
            <div v-for="pro in brand.reviewPros" class="flex gap-2">
              <CheckCircleIcon class="text-success size-6 flex-none" />{{ pro }}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card class="flex-1">
        <CardHeader><CardTitle>What We Don't Like</CardTitle></CardHeader>
        <CardContent>
          <div class="flex flex-col gap-3.5">
            <div v-for="con in brand.reviewCons" class="flex gap-2">
              <XCircleIcon class="text-destructive size-6 flex-none" />{{ con }}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
