<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brands = await apiCaller.brand.getMany.query();
</script>

<template>
  <div class="flex justify-center gap-6 px-4 pt-4">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-6">
      <SaasPageHeader class="mb-px">
        <template #title>All Brands</template>
        <template #subtitle>Click on a profile to see it's reviews</template>
      </SaasPageHeader>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full overflow-hidden p-5 hover:shadow">
          <NuxtImg :src="brand.logoUrl || ''" class="h-24 w-24 rounded-lg" />
          <h1 class="mt-4 text-3xl font-semibold">{{ brand.name }}</h1>
          <p class="mt-1 text-gray-500">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full overflow-hidden p-5 hover:shadow">
          <NuxtImg :src="brand.logoUrl || ''" class="h-24 w-24 rounded-lg" />
          <h1 class="mt-4 text-3xl font-semibold">{{ brand.name }}</h1>
          <p class="mt-1 text-gray-500">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full overflow-hidden p-5 hover:shadow">
          <NuxtImg :src="brand.logoUrl || ''" class="h-24 w-24 rounded-lg" />
          <h1 class="mt-4 text-3xl font-semibold">{{ brand.name }}</h1>
          <p class="mt-1 text-gray-500">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
    </div>
    <div class="w-72" />
    <div class="fixed right-40 hidden w-72 flex-none flex-col gap-6 md:flex">
      <Card class="h-80 w-full" />
      <Card class="h-40 w-full" />
    </div>
  </div>
</template>
