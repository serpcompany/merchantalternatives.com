<script setup lang="ts">
  const { t } = useTranslations();

  definePageMeta({
    layout: "auth",
  });

  useSeoMeta({
    title: t("auth.forgotPassword.title"),
  });
</script>

<template>
  <SaasForgotPasswordForm />
</template>
