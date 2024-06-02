<script setup lang="ts">
  import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

  definePageMeta({
    layout: "dashboard",
  });

  const { currentBrand } = useUser();
  const { editBrandHeaderOpen } = useDashboardState();
</script>

<template>
  <SaasPage
    v-if="currentBrand"
    heading="Company Profile"
    subheading="How your company looks on our platform"
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
        @click="() => (editBrandHeaderOpen = true)"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <Card class="mt-1 w-full overflow-hidden pt-5">
      <div class="mb-5 px-5">
        <BrandLogo
          class="size-24 text-xl"
          :src="currentBrand.logoUrl"
          :name="currentBrand.name"
        />
        <h1 class="mt-4 text-3xl font-semibold">{{ currentBrand.name }}</h1>
        <p class="mt-1 text-gray-500">{{ currentBrand.reviewOneliner }}</p>
      </div>
    </Card>
    <div class="mt-8 flex w-full items-center">
      <h2 class="text-lg font-medium">About •</h2>
      <Button
        variant="link"
        @click="() => (editBrandHeaderOpen = true)"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <div class="bg-background mt-1 h-64 w-full" />
    <div class="mt-8 flex w-full items-center">
      <h2 class="text-lg font-medium">Reviews •</h2>
      <Button
        variant="link"
        @click="() => (editBrandHeaderOpen = true)"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <div class="bg-background mt-1 h-64 w-full" />
  </SaasPage>

  <SaasEditBrandHeaderDialog />
</template>
