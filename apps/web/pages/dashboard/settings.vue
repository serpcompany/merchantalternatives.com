<script setup lang="ts">
  const { t } = useTranslations();
  const { currentTeam } = useUser();

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
  <div v-if="currentTeam">
    <div class="pb-4">
      <h2 class="text-2xl font-bold lg:text-3xl">
        {{ currentTeam.name }} Settings
      </h2>
      <p class="mt-1 opacity-50">All your company settings</p>
    </div>
    <div class="flex flex-col gap-7">
      <TabsTUI :tabs="tabs" />
      <NuxtPage />
    </div>
  </div>
</template>
