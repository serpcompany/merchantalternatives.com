<script setup lang="ts">
  const { apiCaller } = useApiCaller();
  const slug = useRoute("reviews-best-businessTypeSlug").params
    .businessTypeSlug;

  const businesType = await apiCaller.businessType.bySlug.query({
    slug,
  });
  const brands = await apiCaller.brand.byBusinessType.query({
    businessTypeSlug: slug,
  });
</script>

<template>
  <div class="flex justify-center gap-6 px-4 pt-4">
    <div class="flex w-full max-w-3xl flex-initial flex-col gap-4">
      <div
        class="bg-gradient from-primary flex h-64 items-center bg-gradient-to-br to-slate-900 p-4"
      >
        <h1 class="text-5xl font-semibold text-white">
          Best Financial Services for {{ businesType.name }}
        </h1>
      </div>
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
