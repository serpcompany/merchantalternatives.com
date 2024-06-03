<script setup lang="ts">
  import { LinkIcon, CheckBadgeIcon } from "@heroicons/vue/24/solid";

  const { currentBrand } = useUser();
  const numOfEmployees = computed(() =>
    currentBrand.value?.numOfEmployees
      ? getNumOfEmployeesString(currentBrand.value.numOfEmployees)
      : null,
  );

  const inform = () => {
    alert(
      "This company has claimed their account and has verified their information.",
    );
  };
</script>

<template>
  <Card v-if="currentBrand" class="mt-1 w-full overflow-hidden px-6 pb-6 pt-10">
    <BrandLogo
      class="size-24 text-xl"
      :src="currentBrand.logoUrl"
      :name="currentBrand.name"
    />
    <h1 class="mt-3.5 text-3xl font-semibold">{{ currentBrand.name }}</h1>
    <p class="mt-1">{{ currentBrand.reviewOneliner }}</p>
    <p
      v-if="currentBrand.hqLocation || numOfEmployees"
      class="text-muted-foreground mt-1 text-sm"
    >
      {{ currentBrand.hqLocation || "" }}
      {{ currentBrand.hqLocation && numOfEmployees ? " • " : "" }}
      {{ numOfEmployees || "" }}
    </p>
    <div class="mt-3 flex gap-2">
      <Button
        v-if="currentBrand.website"
        size="sm"
        @click="
          navigateTo('https://' + currentBrand.website, {
            external: true,
            open: {
              target: '_blank',
            },
          })
        "
        ><LinkIcon class="mr-2 size-4" />{{ currentBrand.website }}</Button
      >
      <Button
        v-if="currentBrand.engaged"
        variant="outline"
        size="sm"
        @click="inform"
        class="text-success border-success hover:bg-success/10"
        ><CheckBadgeIcon class="mr-2 size-5" />Engaged Company</Button
      >
    </div>
  </Card>
</template>
