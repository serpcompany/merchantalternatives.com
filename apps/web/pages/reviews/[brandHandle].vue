<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brandHandle = useRoute("reviews-brandHandle").params.brandHandle;

  const brand = await apiCaller.brand.byHandle.query({
    handle: brandHandle,
  });
</script>

<template>
  <div class="flex justify-center gap-6 px-4 pt-2.5">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-6">
      <ProfileHeader :brand="brand" />
      <NuxtPage />
    </div>
    <div class="hidden w-72 flex-none flex-col gap-6 lg:flex">
      <Card class="h-80 w-full" />
      <Card class="h-64 w-full" />
      <Card class="h-96 w-full" />
    </div>
  </div>
</template>
