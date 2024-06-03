<script setup lang="ts">
  definePageMeta({
    layout: "dashboard",
  });

  const { t } = useTranslations();
  const { currentBrand } = useUser();

  useSeoMeta({
    title: t("settings.team.title"),
  });
</script>

<template>
  <div v-if="currentBrand" class="grid gap-6">
    <SaasChangeBrandNameForm
      :brandId="currentBrand.id"
      :initialValue="currentBrand.name"
    />
    <SaasDeleteTeamForm />
  </div>
</template>
