<script setup lang="ts">
  definePageMeta({
    layout: "auth",
  });

  const { apiCaller } = useApiCaller();
  const localePath = useLocalePath();

  const { data: user } = await apiCaller.auth.user.useQuery();

  if (!user.value) {
    await navigateTo(localePath("/auth/login"));
  }

  if (user.value!.onboardingComplete) {
    await navigateTo(localePath("/dashboard"));
  }
</script>

<template>
  <SaasOnboardingForm />
</template>
