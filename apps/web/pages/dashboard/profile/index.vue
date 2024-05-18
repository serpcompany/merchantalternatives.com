<script setup lang="ts">
  definePageMeta({
    layout: "saas-dashboard",
  });

  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { user } = useUser();

  useSeoMeta({
    title: t("settings.account.title"),
  });

  watchEffect(() => {
    if (!user.value) {
      navigateTo(localePath("/auth/login"));
    }
  });
</script>

<template>
  <div>
    <SaasPageHeader>
      <template #title>Profile Settings</template>
      <template #subtitle>Your profile settings</template>
    </SaasPageHeader>
    <div v-if="user" class="grid gap-6">
      <SaasUserAvatarForm />
      <SaasChangeNameForm :initialValue="user.name || ''" />
      <SaasChangePasswordForm />
      <SaasDeleteAccountForm />
    </div>
  </div>
</template>
