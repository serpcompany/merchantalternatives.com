<script setup lang="ts">
  import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

  definePageMeta({
    layout: "dashboard",
  });

  const { currentBrand } = useUser();
  const { editBrandHeaderOpen } = useDashboardState();
</script>

<template>
  <div v-if="currentBrand">
    <div class="mb-8 flex items-end justify-between border-b pb-4">
      <div>
        <h2 class="text-2xl font-bold lg:text-3xl">Company Profile</h2>
        <p class="mt-1 opacity-50">How your company appears on our platform</p>
      </div>
      <div>
        <Button
          variant="soft"
          @click="navigateTo('/reviews/square', { open: { target: '_blank' } })"
        >
          Go to live profile<ArrowTopRightOnSquareIcon
            class="mb-1 ml-2 h-5 w-5"
        /></Button>
      </div>
    </div>
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
          :avatarUrl="currentBrand.logoUrl"
          :name="currentBrand.name"
        />
        <h1 class="mt-4 text-3xl font-semibold">{{ currentBrand.name }}</h1>
        <p class="mt-1 text-gray-500">{{ currentBrand.bio }}</p>
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
  </div>

  <SaasEditBrandHeaderDialog />
</template>
