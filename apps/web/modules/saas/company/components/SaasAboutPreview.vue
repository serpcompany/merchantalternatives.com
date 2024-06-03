<script setup lang="ts">
  const { currentBrand } = useUser();
</script>

<template>
  <Card v-if="currentBrand">
    <CardContent class="pt-6">
      <div v-html="currentBrand.overview" class="externalHtml" />
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
