<script setup lang="ts">
  const { t } = useTranslations();
  const { currentBrand } = useUser();

  const tabs = [
    {
      title: t("settings.menu.team.general"),
      to: "/dashboard/settings",
    },
    {
      title: t("settings.menu.team.members"),
      to: "/dashboard/settings/members",
    },
    {
      title: t("settings.menu.team.billing"),
      to: "/dashboard/settings/billing",
    },
  ];
</script>

<template>
  <SaasPage
    v-if="currentBrand"
    :heading="`${currentBrand.name} Settings`"
    subheading="All your company settings"
    variant="sm"
  >
    <div class="flex flex-col gap-7">
      <PageTabs :tabs="tabs" />
      <NuxtPage />
    </div>
  </SaasPage>
</template>
