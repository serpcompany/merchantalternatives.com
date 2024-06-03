<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import {
    UserIcon,
    UserGroupIcon,
    MapPinIcon,
    RocketLaunchIcon,
  } from "@heroicons/vue/24/outline";

  defineProps({
    brand: {
      type: Object as PropType<ApiOutput["brand"]["bySlug"]>,
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
            brand.ceo ||
            brand.numOfEmployees ||
            brand.hqLocation ||
            brand.yearFounded
          "
          class="flex flex-col divide-y"
        >
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <UserIcon class="h-6 w-6" />
              CEO
            </div>
            <span>{{ brand.ceo }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <UserGroupIcon class="h-6 w-6" />
              Employees
            </div>
            <span>{{ brand.numOfEmployees }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <MapPinIcon class="h-6 w-6" />
              HQ
            </div>
            <span>{{ brand.hqLocation }}</span>
          </div>
          <div class="flex justify-between py-4">
            <div class="flex items-center gap-2">
              <RocketLaunchIcon class="h-6 w-6" />
              Founded
            </div>
            <span>{{ brand.yearFounded }}</span>
          </div>
        </div>
        <p v-else>Nothing here yet.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div
          v-if="brand.overview"
          v-html="brand.overview"
          class="externalHtml"
        />
        <p v-else>Nothing here yet.</p>
      </CardContent>
    </Card>
    <Card v-if="brand.industriesServed.length">
      <CardHeader><CardTitle>Industries Served</CardTitle></CardHeader>
      <CardContent
        ><div class="flex divide-x">
          <ul class="flex-1 list-inside list-disc px-4">
            <li
              v-for="industry in brand.industriesServed.slice(0, 10)"
              :key="industry.id"
            >
              {{ industry.name }}
            </li>
          </ul>
          <ul
            v-if="brand.industriesServed.slice(10).length"
            class="flex-1 list-inside list-disc px-4"
          >
            <li
              v-for="industry in brand.industriesServed.slice(10)"
              :key="industry.id"
            >
              {{ industry.name }}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
    <Card v-if="brand.businessTypesServed.length">
      <CardHeader><CardTitle>Business Type Served</CardTitle></CardHeader>
      <CardContent>
        <div class="flex divide-x">
          <ul class="flex-1 list-inside list-disc px-4">
            <li
              v-for="businessType in brand.businessTypesServed.slice(0, 10)"
              :key="businessType.id"
            >
              {{ businessType.name }}
            </li>
          </ul>
          <ul
            v-if="brand.businessTypesServed.slice(10).length"
            class="flex-1 list-inside list-disc px-4"
          >
            <li
              v-for="businessType in brand.businessTypesServed.slice(10)"
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
