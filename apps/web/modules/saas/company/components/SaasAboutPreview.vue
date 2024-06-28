<script setup lang="ts">
  const { currentCompany } = useUser();
</script>

<template>
  <Card v-if="currentCompany">
    <CardContent class="pt-6">
      <div
        v-if="currentCompany.description"
        v-html="currentCompany.description"
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
