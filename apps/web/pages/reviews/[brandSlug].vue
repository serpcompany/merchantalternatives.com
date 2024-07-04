<script setup lang="ts">
  import {
    LinkIcon,
    CheckBadgeIcon,
    QuestionMarkCircleIcon,
  } from "@heroicons/vue/24/solid";

  const { apiCaller } = useApiCaller();
  const brandSlug = useRoute("reviews-brandSlug").params.brandSlug;

  const company = await apiCaller.company.getOneBySlug.query({
    slug: brandSlug,
  });
  const tabs = ref([
    { title: "Overview", to: `/reviews/${company.slug}` },
    { title: "Review", to: `/reviews/${company.slug}/review` },
    { title: "About", to: `/reviews/${company.slug}/about` },
    { title: "Pricing", to: `/reviews/${company.slug}/pricing` },
    { title: "Advertising", to: `/reviews/${company.slug}/advertising` },
    { title: "Reputation", to: `/reviews/${company.slug}/reputation` },
  ]);

  const inform = () => {
    if (!company.engaged) {
      alert(
        "This company has not claimed their account and their information has not been verified.",
      );
    } else {
      alert(
        "This company has claimed their account and has verified their information.",
      );
    }
  };
</script>

<template>
  <div class="mx-auto max-w-[1100px] pt-20 lg:flex lg:gap-6 lg:pt-[88px]">
    <div class="flex max-w-3xl flex-1 flex-col gap-6">
      <Card class="w-full overflow-hidden">
        <div class="px-4 pb-4 pt-10 lg:flex lg:justify-between lg:px-6">
          <div>
            <CompanyLogo
              class="size-24 text-xl"
              :src="
                company.company_image.length
                  ? company.company_image[0].url
                  : null
              "
              :name="company.name"
            />
            <h1 class="mt-3.5 text-3xl font-semibold">{{ company.name }}</h1>
            <p class="mt-1 max-w-xl truncate">
              {{ company.specialize_in }}
            </p>
            <p
              v-if="company.hq_location || company.num_employees"
              class="text-muted-foreground mt-1 text-sm"
            >
              {{ company.hq_location || "" }}
              {{ company.hq_location && company.num_employees ? " • " : "" }}
              {{ company.num_employees || "" }} employees
            </p>
            <div class="mt-3 flex gap-2">
              <Button
                v-if="company.shortlink || company.url"
                size="sm"
                @click="
                  navigateTo(company.shortlink || company.url, {
                    external: true,
                    open: {
                      target: '_blank',
                    },
                  })
                "
                ><LinkIcon class="mr-2 size-4" />{{
                  company.url || `Visit ${company.name}`
                }}</Button
              >
              <Button
                variant="outline"
                size="sm"
                @click="inform"
                :class="
                  company.engaged
                    ? 'text-success border-success hover:bg-success/10'
                    : 'text-primary border-primary hover:bg-primary/10'
                "
                ><CheckBadgeIcon
                  v-if="company.engaged"
                  class="mr-2 size-5"
                /><QuestionMarkCircleIcon
                  v-else="company.engaged"
                  class="mr-2 size-5"
                />{{
                  company.engaged ? "Engaged Company" : "Non-Engaged Company"
                }}</Button
              >
            </div>
          </div>
          <div>
            <StarRating
              v-if="company.editor_rating"
              :rating="+company.editor_rating"
              size="lg"
              with-text
              class="hidden lg:flex"
            />
          </div>
        </div>
        <PageTabs
          :tabs="tabs"
          :thin="true"
          class="overflow-scroll border-t pl-2"
        />
      </Card>
      <NuxtPage :company="company" />-
    </div>
    <div class="hidden w-72 flex-none flex-col gap-6 lg:flex">
      <Card class="w-full p-4">
        <h3 class="text-2xl font-bold">Need a merchant account provider?</h3>
        <p class="mt-4 text-sm">
          If you're in the market for a merchant account provider, be sure to
          check out our user reviews, our merchant accounts guide and our top
          popular merchant provider picks
        </p>
        <Button @click="navigateTo('/reviews')" class="mt-4 w-full"
          >See our best picks</Button
        >
      </Card>
    </div>
  </div>
</template>
