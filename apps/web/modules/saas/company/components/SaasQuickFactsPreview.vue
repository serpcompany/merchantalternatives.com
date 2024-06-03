<script setup lang="ts">
  import {
    UserIcon,
    UserGroupIcon,
    MapPinIcon,
    RocketLaunchIcon,
  } from "@heroicons/vue/24/outline";

  const { currentBrand } = useUser();
</script>

<template>
  <Card v-if="currentBrand">
    <CardContent class="pt-6">
      <div
        v-if="
          currentBrand.ceo ||
          currentBrand.numOfEmployees ||
          currentBrand.hqLocation ||
          currentBrand.yearFounded
        "
        class="flex flex-col divide-y"
      >
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <UserIcon class="h-6 w-6" />
            CEO
          </div>
          <span>{{ currentBrand.ceo }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <UserGroupIcon class="h-6 w-6" />
            Employees
          </div>
          <span>{{ currentBrand.numOfEmployees }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <MapPinIcon class="h-6 w-6" />
            HQ
          </div>
          <span>{{ currentBrand.hqLocation }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <RocketLaunchIcon class="h-6 w-6" />
            Founded
          </div>
          <span>{{ currentBrand.yearFounded }}</span>
        </div>
      </div>
      <p v-else>Nothing here yet.</p>
    </CardContent>
  </Card>
</template>
