<script setup lang="ts">
  import type { ApiOutput } from "api";

  const props = defineProps({
    inDashboard: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: Object as PropType<ApiOutput["brand"]["byHandle"]>,
      required: true,
    },
  });

  const tabs = ref([
    { title: "Home", to: `/reviews/${props.brand.handle}` },
    { title: "About", to: `/reviews/${props.brand.handle}/about` },
    { title: "Reviews", to: `/reviews/${props.brand.handle}/reviews` },
  ]);
</script>

<template>
  <Card class="w-full overflow-hidden pt-5">
    <div class="mb-5 px-5">
      <NuxtImg :src="brand.logoUrl || ''" class="mt-10 h-24 w-24 rounded-lg" />
      <h1 class="mt-4 text-3xl font-semibold">{{ brand.name }}</h1>
      <p class="mt-1 text-gray-500">{{ brand.bio }}</p>
    </div>
    <PageTabs
      v-if="!inDashboard"
      :tabs="tabs"
      :thin="true"
      class="border-foreground/10 border-t pl-2"
    />
  </Card>
</template>
