<script setup lang="ts">
  definePageMeta({
    layout: "dashboard",
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
  <SaasPage
    heading="Profile Settings"
    subheading="Your profile settings"
    variant="sm"
  >
    <div v-if="user" class="grid gap-6">
      <SaasUserAvatarForm />
      <SaasChangeNameForm :initialValue="user.name || ''" />
      <SaasChangePasswordForm />
      <SaasDeleteAccountForm />
    </div>
  </SaasPage>
</template>
