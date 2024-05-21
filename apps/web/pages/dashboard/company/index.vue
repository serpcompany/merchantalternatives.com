<script setup lang="ts">
  import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";

  definePageMeta({
    layout: "saas-dashboard",
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
          variant="outline"
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
    <ProfileHeader :brand="currentBrand" :inDashboard="true" class="mt-3" />
    <div class="mt-10 flex w-full items-center">
      <h2 class="text-lg font-medium">About •</h2>
      <Button
        variant="link"
        @click="() => (editBrandHeaderOpen = true)"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <div class="bg-background mt-3 h-64 w-full" />
    <div class="mt-10 flex w-full items-center">
      <h2 class="text-lg font-medium">Reviews •</h2>
      <Button
        variant="link"
        @click="() => (editBrandHeaderOpen = true)"
        class="px-2 text-lg font-medium"
        >Edit</Button
      >
    </div>
    <div class="bg-background mt-3 h-64 w-full" />
  </div>

  <SaasEditBrandHeaderDialog />
</template>
