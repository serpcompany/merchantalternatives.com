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
  <SaasLoginForm class="px-4 lg:px-0" />
</template>
