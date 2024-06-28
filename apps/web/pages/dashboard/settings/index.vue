<script setup lang="ts">
  definePageMeta({
    layout: "dashboard",
  });

  const { t } = useTranslations();
  const { currentCompany } = useUser();

  useSeoMeta({
    title: t("settings.team.title"),
  });
</script>

<template>
  <div v-if="currentCompany" class="grid gap-6">
    <SaasChangeCompanyNameForm
      :companyId="currentCompany.id"
      :initialValue="currentCompany.name"
    />
    <SaasDeleteTeamForm />
  </div>
</template>
