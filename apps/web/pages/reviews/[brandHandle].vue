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
  <div class="flex justify-center gap-6 px-4 pt-2.5">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-6">
      <Card class="w-full overflow-hidden pt-5">
        <div class="mb-5 px-5">
          <BrandLogo
            class="size-24 text-xl"
            :avatarUrl="brand.logoUrl"
            :name="brand.name"
          />
          <h1 class="mt-4 text-3xl font-semibold">{{ brand.name }}</h1>
          <p class="mt-1 text-gray-500">{{ brand.bio }}</p>
        </div>
        <PageTabs
          :tabs="tabs"
          :thin="true"
          class="border-foreground/10 border-t pl-2"
        />
      </Card>
      <NuxtPage />
    </div>
    <div class="hidden w-72 flex-none flex-col gap-6 lg:flex">
      <Card class="h-80 w-full" />
      <Card class="h-64 w-full" />
      <Card class="h-96 w-full" />
    </div>
  </div>
</template>
