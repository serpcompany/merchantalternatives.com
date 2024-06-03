<script setup lang="ts">
  import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline";

  definePageMeta({ layout: "dashboard" });

  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { user } = useUser();

  useSeoMeta({
    title: t("settings.account.title"),
  });
  const { logout } = useUser();

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
    :heading-button="{
      label: 'Logout',
      action: logout,
      icon: ArrowRightStartOnRectangleIcon,
    }"
  >
    <div v-if="user" class="grid gap-6">
      <SaasUserAvatarForm />
      <SaasChangeNameForm :initialValue="user.name || ''" />
      <SaasChangePasswordForm />
      <SaasDeleteAccountForm />
    </div>
  </SaasPage>
</template>
