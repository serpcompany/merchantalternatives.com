<script setup lang="ts">
  const { t } = useTranslations();

  definePageMeta({
    layout: "auth",
  });

  useSeoMeta({
    title: t("auth.login.title"),
  });
</script>

<template>
  <SaasLoginForm />
</template>
