<script setup lang="ts">
  import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

  definePageMeta({
    layout: "dashboard",
  });

  const { currentBrand } = useUser();
  const { settingsDialogOpen } = useDashboardState();

  type FormType = "brand header" | "quick facts" | "about" | null;
  const openFormType = ref<FormType>(null);

  const openSettingsDialog = (formType: FormType) => {
    settingsDialogOpen.value = true;
    openFormType.value = formType;
  };
  const closeSettingsDialog = () => {
    settingsDialogOpen.value = false;
    openFormType.value = null;
  };
</script>

<template>
  <SaasPage
    v-if="currentBrand"
    heading="Company Profile"
    subheading="How your company looks in our listings"
    :heading-button="{
      label: 'Go to live profile',
      action: () =>
        navigateTo(`/reviews/${currentBrand!.slug}`, {
          open: { target: '_blank' },
        }),
      icon: ArrowTopRightOnSquareIcon,
    }"
  >
    <div class="flex w-full items-center">
      <h2 class="text-lg font-medium">Header •</h2>
      <Button
        variant="link"
        @click="openSettingsDialog('brand header')"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <SaasBrandHeaderPreview />
    <div class="mt-8 flex w-full items-center">
      <h2 class="text-lg font-medium">Quick Facts •</h2>
      <Button
        variant="link"
        @click="openSettingsDialog('quick facts')"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <SaasQuickFactsPreview />
    <div class="mt-8 flex w-full items-center">
      <h2 class="text-lg font-medium">About •</h2>
      <Button
        variant="link"
        @click="openSettingsDialog('about')"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <SaasAboutPreview />

    <div class="mt-8 flex w-full items-center">
      <h2 class="text-lg font-medium">Pricing •</h2>
      <Button variant="link" class="px-2 text-lg font-medium">Edit</Button>
    </div>
    <div class="bg-background mt-1 h-64 w-full" />
  </SaasPage>

  <SaasSettingsDialog :title="'Edit ' + openFormType">
    <SaasBrandHeaderForm
      v-if="openFormType === 'brand header'"
      @close="closeSettingsDialog()"
    />
    <SaasQuickFactsForm
      v-if="openFormType === 'quick facts'"
      @close="closeSettingsDialog()"
    />
    <SaasAboutForm
      v-if="openFormType === 'about'"
      @close="closeSettingsDialog()"
    />
  </SaasSettingsDialog>
</template>
