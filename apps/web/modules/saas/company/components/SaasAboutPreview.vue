<script setup lang="ts">
  const { currentBrand } = useUser();
</script>

<template>
  <Card v-if="currentBrand">
    <CardContent class="pt-6">
      <div
        v-if="currentBrand.overview"
        v-html="currentBrand.overview"
        class="externalHtml"
      />
      <p v-else>Nothing here yet.</p>
    </CardContent>
  </Card>
</template>

<style scoped>
  :deep(.externalHtml) {
    p {
      margin-bottom: 10px;
    }
  }
</style>
