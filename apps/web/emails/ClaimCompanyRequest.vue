<script setup lang="ts">
  const props = defineProps<{
    name: string;
    email: string;
    companyName: string;
  }>();
</script>

<template>
  <Wrapper>
    <EText>
      Hey, <br />
      <strong>{{ name }}</strong> with the email address
      <strong>{{ email }}</strong
      >has requested to claim the company
      <strong>{{ props.companyName }}</strong
      >.
    </EText>
  </Wrapper>
</template>
