<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import {
    UserIcon,
    UserGroupIcon,
    MapPinIcon,
    RocketLaunchIcon,
  } from "@heroicons/vue/24/outline";

  defineProps({
    company: {
      type: Object as PropType<ApiOutput["company"]["getOneBySlug"]>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader>
      <CardContent>
        <div
          v-if="
            company.ceo ||
            company.num_employees ||
            company.hq_location ||
            company.year_founded
          "
          class="flex flex-col divide-y"
        >
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <UserIcon class="h-6 w-6" />
              CEO
            </div>
            <span>{{ company.ceo }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <UserGroupIcon class="h-6 w-6" />
              Employees
            </div>
            <span>{{ company.num_employees }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <MapPinIcon class="h-6 w-6" />
              HQ
            </div>
            <span>{{ company.hq_location }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <RocketLaunchIcon class="h-6 w-6" />
              Founded
            </div>
            <span>{{ company.year_founded }}</span>
          </div>
        </div>
        <p v-else>Nothing here yet.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div
          v-if="company.description"
          v-html="company.description"
          class="externalHtml"
        />
        <p v-else>Nothing here yet.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>Industries Served</CardTitle></CardHeader>
      <CardContent
        ><div class="flex divide-x">
          <ul class="flex-1 list-inside list-disc px-4">
            <li v-for="industry in company.industry" :key="industry.id">
              {{ industry.name }}
            </li>
          </ul>
          <ul
            v-if="company.industry.slice(10).length"
            class="flex-1 list-inside list-disc px-4"
          >
            <li
              v-for="industry in company.industry.slice(10)"
              :key="industry.id"
            >
              {{ industry.name }}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>Business Type Served</CardTitle></CardHeader>
      <CardContent>
        <div class="flex divide-x">
          <ul class="flex-1 list-inside list-disc px-4">
            <li
              v-for="businessType in company.business_type"
              :key="businessType.id"
            >
              {{ businessType.name }}
            </li>
          </ul>
          <ul
            v-if="company.business_type.slice(10).length"
            class="flex-1 list-inside list-disc px-4"
          >
            <li
              v-for="businessType in company.business_type.slice(10)"
              :key="businessType.id"
            >
              {{ businessType.name }}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
  :deep(.externalHtml) {
    p {
      margin-bottom: 10px;
    }
  }
</style>
