<script setup lang="ts">
  import {
    UserIcon,
    UserGroupIcon,
    MapPinIcon,
    RocketLaunchIcon,
  } from "@heroicons/vue/24/outline";

  const { currentCompany } = useUser();
</script>

<template>
  <Card v-if="currentCompany">
    <CardContent class="pt-6">
      <div
        v-if="
          currentCompany.ceo ||
          currentCompany.num_employees ||
          currentCompany.hq_location ||
          currentCompany.year_founded
        "
        class="flex flex-col divide-y"
      >
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <UserIcon class="h-6 w-6" />
            CEO
          </div>
          <span>{{ currentCompany.ceo }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <UserGroupIcon class="h-6 w-6" />
            Employees
          </div>
          <span>{{ currentCompany.num_employees }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <MapPinIcon class="h-6 w-6" />
            HQ
          </div>
          <span>{{ currentCompany.hq_location }}</span>
        </div>
        <div class="flex justify-between py-4">
          <div class="flex items-center gap-2">
            <RocketLaunchIcon class="h-6 w-6" />
            Founded
          </div>
          <span>{{ currentCompany.year_founded }}</span>
        </div>
      </div>
      <p v-else>Nothing here yet.</p>
    </CardContent>
  </Card>
</template>
