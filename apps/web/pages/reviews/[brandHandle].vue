<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brandHandle = useRoute("reviews-brandHandle").params.brandHandle;

  const brand = await apiCaller.brand.byHandle.query({
    handle: brandHandle,
  });

  const tabs = ref([
    { title: "Home", to: `/reviews/${brand.handle}` },
    { title: "About", to: `/reviews/${brand.handle}/about` },
    { title: "Reviews", to: `/reviews/${brand.handle}/reviews` },
  ]);
</script>

<template>
  <div class="px-4 flex gap-6 justify-center pt-2.5">
    <div class="flex-initial w-full max-w-3xl flex flex-col gap-6">
      <Card class="w-full pt-5 overflow-hidden">
        <div class="px-5">
          <NuxtImg :src="brand.logo!" class="w-24 h-24 rounded-lg mt-10" />
          <h1 class="font-semibold text-3xl mt-4">{{ brand.name }}</h1>
          <p class="text-gray-500 mt-1">{{ brand.bio }}</p>
        </div>
        <PageTabs
          :tabs="tabs"
          :thin="true"
          class="mt-5 pl-2 border-t border-foreground/10"
        />
      </Card>
      <NuxtPage />
    </div>
    <div class="flex-none w-72 md:flex flex-col gap-6 hidden">
      <Card class="w-full h-80" />
      <Card class="w-full h-64" />
      <Card class="w-full h-96" />
    </div>
  </div>
</template>
