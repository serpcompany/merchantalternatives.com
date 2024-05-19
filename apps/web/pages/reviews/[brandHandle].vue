<script setup lang="ts">
  const { apiCaller } = useApiCaller();

  const brandHandle = useRoute("reviews-brandHandle").params.brandHandle;

  const brand = await apiCaller.brand.byHandle.query({
    handle: brandHandle,
  });
</script>

<template>
  <Error404 v-if="!brand" />
  <div>
    <h1>{{ brand.bio }}</h1>
  </div>
</template>
