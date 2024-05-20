<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brands = await apiCaller.brand.getMany.query();
</script>

<template>
  <div class="px-4 flex gap-6 justify-center pt-4">
    <div class="flex-initial w-full max-w-3xl flex flex-col gap-6">
      <SaasPageHeader>
        <template #title>All Brands</template>
        <template #subtitle>Click on a profile to see it's reviews</template>
      </SaasPageHeader>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full p-5 overflow-hidden hover:shadow-md">
          <NuxtImg :src="brand.logo!" class="w-24 h-24 rounded-lg" />
          <h1 class="font-semibold text-3xl mt-4">{{ brand.name }}</h1>
          <p class="text-gray-500 mt-1">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full p-5 overflow-hidden hover:shadow">
          <NuxtImg :src="brand.logo!" class="w-24 h-24 rounded-lg" />
          <h1 class="font-semibold text-3xl mt-4">{{ brand.name }}</h1>
          <p class="text-gray-500 mt-1">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
      <NuxtLink v-for="brand in brands" :to="`/reviews/${brand.handle}`">
        <Card class="w-full p-5 overflow-hidden hover:shadow">
          <NuxtImg :src="brand.logo!" class="w-24 h-24 rounded-lg" />
          <h1 class="font-semibold text-3xl mt-4">{{ brand.name }}</h1>
          <p class="text-gray-500 mt-1">{{ brand.bio }}</p>
        </Card>
      </NuxtLink>
    </div>
    <div class="w-72" />
    <div class="flex-none w-72 md:flex flex-col gap-6 hidden fixed right-40">
      <Card class="w-full h-80" />
      <Card class="w-full h-40" />
    </div>
  </div>
</template>
