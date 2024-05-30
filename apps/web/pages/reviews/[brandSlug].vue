<script setup lang="ts">
  import { LinkIcon } from "@heroicons/vue/24/outline";

  const { apiCaller } = useApiCaller();
  const brandSlug = useRoute("reviews-brandSlug").params.brandSlug;

  const brand = await apiCaller.brand.bySlug.query({
    slug: brandSlug,
  });
  const numOfEmployees = brand.numOfEmployees
    ? getNumOfEmployeesString(brand.numOfEmployees)
    : null;
  const tabs = ref([
    { title: "Overview", to: `/reviews/${brand.slug}` },
    { title: "Review", to: `/reviews/${brand.slug}/review` },
    { title: "About", to: `/reviews/${brand.slug}/about` },
    { title: "Pricing", to: `/reviews/${brand.slug}/pricing` },
    { title: "Services", to: `/reviews/${brand.slug}/services` },
    { title: "Advertising", to: `/reviews/${brand.slug}/advertising` },
    { title: "Contracts", to: `/reviews/${brand.slug}/contracts` },
  ]);
</script>

<template>
  <div class="mx-auto flex gap-6 pt-2.5 lg:max-w-[1100px]">
    <div class="flex w-full flex-initial flex-col gap-6">
      <Card class="w-full overflow-hidden">
        <div class="flex justify-between px-6 pb-4 pt-10">
          <div>
            <BrandLogo
              class="size-24 text-xl"
              :src="brand.logoUrl"
              :name="brand.name"
            />
            <h1 class="mt-3.5 text-3xl font-semibold">{{ brand.name }}</h1>
            <p class="mt-1">
              {{ brand.reviewOneliner }}
            </p>
            <p
              v-if="brand.hqLocation || numOfEmployees"
              class="text-muted-foreground mt-1 text-sm"
            >
              {{ brand.hqLocation || "" }}
              {{ brand.hqLocation && numOfEmployees ? " • " : "" }}
              {{ numOfEmployees || "" }}
            </p>
            <Button
              v-if="brand.website"
              size="sm"
              @click="
                navigateTo('https://' + brand.website, {
                  external: true,
                  open: {
                    target: '_blank',
                  },
                })
              "
              class="mt-3"
              ><LinkIcon class="mr-2 size-4" />{{ brand.website }}</Button
            >
          </div>
          <div>
            <StarRating
              v-if="brand.rating"
              :rating="brand.rating"
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
      <NuxtPage :brand="brand" />
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
      <Card v-if="brand.alternatives.length">
        <CardHeader>
          <CardTitle>{{ brand.name }} Alternatives</CardTitle>
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
      </Card>
    </div>
  </div>
</template>
