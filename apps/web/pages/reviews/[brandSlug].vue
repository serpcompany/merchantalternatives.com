<script setup lang="ts">
  import { LinkIcon, CheckBadgeIcon } from "@heroicons/vue/24/solid";

  const { apiCaller } = useApiCaller();
  const brandSlug = useRoute("reviews-brandSlug").params.brandSlug;

  const company = await apiCaller.company.getOneBySlug.query({
    slug: brandSlug,
  });
  const numOfEmployees = company.num_employees
    ? getNumOfEmployeesString(+company.num_employees)
    : null;
  const tabs = ref([
    { title: "Overview", to: `/reviews/${company.slug}` },
    { title: "Review", to: `/reviews/${company.slug}/review` },
    { title: "About", to: `/reviews/${company.slug}/about` },
    { title: "Pricing", to: `/reviews/${company.slug}/pricing` },
    { title: "Services", to: `/reviews/${company.slug}/services` },
    { title: "Advertising", to: `/reviews/${company.slug}/advertising` },
    { title: "Contracts", to: `/reviews/${company.slug}/contracts` },
  ]);

  const inform = () => {
    alert(
      "This company has claimed their account and has verified their information.",
    );
  };
</script>

<template>
  <div class="mx-auto flex gap-6 pt-[88px] lg:max-w-[1100px]">
    <div class="flex w-full flex-initial flex-col gap-6">
      <Card class="w-full overflow-hidden">
        <div class="flex justify-between px-6 pb-4 pt-10">
          <div>
            <BrandLogo
              class="size-24 text-xl"
              :src="null"
              :name="company.name"
            />
            <h1 class="mt-3.5 text-3xl font-semibold">{{ company.name }}</h1>
            <p class="mt-1">
              {{ company.intro }}
            </p>
            <p
              v-if="company.hq_location || numOfEmployees"
              class="text-muted-foreground mt-1 text-sm"
            >
              {{ company.hq_location || "" }}
              {{ company.hq_location && numOfEmployees ? " • " : "" }}
              {{ numOfEmployees || "" }}
            </p>
            <div class="mt-3 flex gap-2">
              <Button
                v-if="company.support_url"
                size="sm"
                @click="
                  navigateTo('https://' + company.support_url, {
                    external: true,
                    open: {
                      target: '_blank',
                    },
                  })
                "
                ><LinkIcon class="mr-2 size-4" />{{
                  company.support_url
                }}</Button
              >
              <Button
                v-if="true"
                variant="outline"
                size="sm"
                @click="inform"
                class="text-success border-success hover:bg-success/10"
                ><CheckBadgeIcon class="mr-2 size-5" />Engaged Company</Button
              >
            </div>
          </div>
          <div>
            <StarRating
              v-if="company.editor_rating"
              :rating="+company.editor_rating"
              size="lg"
              with-text
            />
          </div>
        </div>
        <PageTabs
          :tabs="tabs"
          :thin="true"
          class="border-foreground/10 border-t pl-2"
        />
      </Card>
      <!--
      <NuxtPage :company="company" />-->
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
      <!--
      <Card v-if="brand.alternatives.length">
        <CardHeader>
          <CardTitle>{{ company.name }} Alternatives</CardTitle>
        </CardHeader>
        <CardContent class="px-0 py-0">
          <div class="flex flex-col divide-y">
            <NuxtLink
              v-for="alternative in brand.alternatives"
              :to="`/reviews/${alternative.slug}`"
              :key="alternative.id"
              class="hover:bg-highlight/20 flex items-center gap-2 px-3 py-3.5"
            >
              <BrandLogo :src="alternative.logoUrl" :name="alternative.name" />
              <div class="flex flex-col items-start">
                <h3 class="text-lg font-semibold">{{ alternative.name }}</h3>
                <StarRating
                  v-if="alternative.rating"
                  :rating="alternative.rating"
                  size="sm"
                />
                <p class="text-muted-foreground mt-1 truncate text-sm">
                  {{ alternative.reviewOneliner }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </CardContent>
      </Card>-->
    </div>
  </div>
</template>
