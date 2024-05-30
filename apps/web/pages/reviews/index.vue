<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brands = await apiCaller.brand.getMany.query();
</script>

<template>
  <div class="flex justify-center gap-6 px-4 pt-4">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-4">
      <SaasPageHeader class="mb-px">
        <template #title>All Brands</template>
        <template #subtitle>Click on a profile to see it's reviews</template>
      </SaasPageHeader>
      <NuxtLink
        v-for="brand in brands"
        :key="brand.id"
        :to="`/reviews/${brand.slug}`"
      >
        <ReviewCard :brand="brand" />
      </NuxtLink>
    </div>
    <div class="w-72" />
    <div class="fixed right-40 hidden w-72 flex-none flex-col gap-6 md:flex">
      <Card class="h-80 w-full" />
      <Card class="h-40 w-full" />
    </div>
  </div>
</template>
