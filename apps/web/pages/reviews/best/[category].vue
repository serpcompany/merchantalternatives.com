<script setup lang="ts">
  const category = useRoute("reviews-best-category").params.category;
</script>

<template>
  <div>
    <h1>Best Companies in {{ category }}</h1>
  </div>
</template>
