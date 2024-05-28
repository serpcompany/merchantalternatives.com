<script setup lang="ts">
  const colors = {
    mutedForeground: "#64748b",
  };

  const props = defineProps<{
    name: string;
    email: string;
    brandName: string;
  }>();
</script>

<template>
  <Wrapper>
    <EText>
      Hey, <br />
      <strong>{{ name }}</strong> with the email address
      <strong>{{ email }}</strong
      >has requested to claim the brand <strong>{{ props.brandName }}</strong
      >.
    </EText>
  </Wrapper>
</template>
