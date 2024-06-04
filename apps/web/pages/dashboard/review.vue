<script setup lang="ts">
  import {
    XCircleIcon,
    CheckCircleIcon,
    ArrowPathIcon,
  } from "@heroicons/vue/24/outline";

  definePageMeta({ layout: "dashboard" });

  const { currentBrand } = useUser();
</script>

<template>
  <SaasPage
    heading="Our Review"
    subheading="Our review of your financial services"
    :heading-button="{
      label: 'Request Rereview',
      action: () => navigateTo('/'),
      icon: ArrowPathIcon,
    }"
  >
    <div v-if="currentBrand" class="flex flex-col gap-6">
      <ReviewSummary :brand="currentBrand" :dashboard="true" />
      <div
        v-if="currentBrand.reviewPros.length && currentBrand.reviewCons.length"
        class="flex gap-6"
      >
        <Card class="flex-1">
          <CardHeader><CardTitle>What We Like</CardTitle></CardHeader>
          <CardContent>
            <div class="flex flex-col gap-3.5">
              <div v-for="pro in currentBrand.reviewPros" class="flex gap-2">
                <CheckCircleIcon class="text-success size-6 flex-none" />{{
                  pro
                }}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card class="flex-1">
          <CardHeader><CardTitle>What We Don't Like</CardTitle></CardHeader>
          <CardContent>
            <div class="flex flex-col gap-3.5">
              <div v-for="con in currentBrand.reviewCons" class="flex gap-2">
                <XCircleIcon class="text-destructive size-6 flex-none" />{{
                  con
                }}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </SaasPage>
</template>
