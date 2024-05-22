<script setup lang="ts">
  const { t } = useTranslations();

  definePageMeta({
    layout: "auth",
  });

  useSeoMeta({
    title: t("auth.verifyOtp.title"),
  });
</script>

<template>
  <SaasOtpForm />
</template>
