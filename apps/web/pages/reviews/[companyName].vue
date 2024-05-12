<script setup lang="ts">
  const companyName = useRoute("reviews-companyName").params.companyName;
</script>

<template>
  <div>
    <h1>Company Profile for {{ companyName }}</h1>
  </div>
</template>
