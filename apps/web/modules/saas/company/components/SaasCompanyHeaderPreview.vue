<script setup lang="ts">
  import {
    LinkIcon,
    CheckBadgeIcon,
    QuestionMarkCircleIcon,
  } from "@heroicons/vue/24/solid";

  const { currentCompany } = useUser();

  const inform = () => {
    alert(
      "This company has claimed their account and has verified their information.",
    );
  };
</script>

<template>
  <Card
    v-if="currentCompany"
    class="mt-1 w-full overflow-hidden px-6 pb-6 pt-10"
  >
    <CompanyLogo
      class="size-24 text-xl"
      :src="
        currentCompany.company_image.length
          ? currentCompany.company_image[0].url
          : null
      "
      :name="currentCompany.name"
    />
    <h1 class="mt-3.5 text-3xl font-semibold">{{ currentCompany.name }}</h1>
    <p class="mt-1 max-w-xl truncate">{{ currentCompany.specialize_in }}</p>
    <p
      v-if="currentCompany.hq_location || currentCompany.num_employees"
      class="text-muted-foreground mt-1 text-sm"
    >
      {{ currentCompany.hq_location || "" }}
      {{
        currentCompany.hq_location && currentCompany.num_employees ? " • " : ""
      }}
      {{ currentCompany.num_employees || "" }}
    </p>
    <div class="mt-3 flex gap-2">
      <Button
        v-if="currentCompany.shortlink || currentCompany.url"
        size="sm"
        @click="
          navigateTo(currentCompany.shortlink || currentCompany.url, {
            external: true,
            open: {
              target: '_blank',
            },
          })
        "
        ><LinkIcon class="mr-2 size-4" />{{
          currentCompany.url || `Visit ${currentCompany.name}`
        }}</Button
      >
      <Button
        variant="outline"
        size="sm"
        @click="inform"
        :class="
          currentCompany.engaged
            ? 'text-success border-success hover:bg-success/10'
            : 'text-primary border-primary hover:bg-primary/10'
        "
        ><CheckBadgeIcon
          v-if="currentCompany.engaged"
          class="mr-2 size-5"
        /><QuestionMarkCircleIcon
          v-else="company.engaged"
          class="mr-2 size-5"
        />{{
          currentCompany.engaged ? "Engaged Company" : "Non-Engaged Company"
        }}</Button
      >
    </div>
  </Card>
</template>
