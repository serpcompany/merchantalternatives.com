<script setup lang="ts">
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/24/outline";

  definePageMeta({ layout: "dashboard" });

  const { currentCompany } = useUser();
</script>

<template>
  <SaasPage
    v-if="currentCompany?.editor_rating"
    heading="Our Review"
    subheading="Our review of your financial services"
    :heading-button="{
      label: 'Request Rereview',
      action: () => navigateTo('/'),
      icon: ArrowPathIcon,
    }"
  >
    <div v-if="currentCompany" class="flex flex-col gap-6">
      <ReviewSummary :company="currentCompany" :dashboard="true" />
      <ProsAndCons
        v-if="
          currentCompany.company_pro.length && currentCompany.company_con.length
        "
        :pros="currentCompany.company_pro"
        :cons="currentCompany.company_con"
      />
    </div>
  </SaasPage>
  <div v-else class="mt-40">
    <div class="flex flex-col items-center">
      <ClockIcon class="stoke-2 size-28 text-gray-500" />
      <h1 class="mt-5 text-2xl font-medium text-gray-500">
        Your review is on the way
      </h1>
      <p class="mt-4 text-center text-gray-400">
        We are currently reviewing your financial services. Please check back
        later.
      </p>
    </div>
  </div>
</template>
