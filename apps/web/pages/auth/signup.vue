<script setup lang="ts">
  const { t } = useTranslations();

  definePageMeta({
    layout: "auth",
  });

  useSeoMeta({
    title: t("auth.signup.title"),
  });
</script>

<template>
  <SaasSignupForm />
</template>
