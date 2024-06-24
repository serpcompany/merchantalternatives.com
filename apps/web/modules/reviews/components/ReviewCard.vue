<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import { ChevronDownIcon } from "@heroicons/vue/24/outline";
  import Tabs from "~/modules/ui/components/tabs/Tabs.vue";

  defineProps({
    company: {
      type: Object as PropType<ApiOutput["company"]["getPage"][0]>,
      required: true,
    },
  });
</script>

<template>
  <Card>
    <div class="flex gap-3 px-4 py-5">
      <BrandLogo
        :src="
          company.company_image?.length ? company.company_image[0].url : null
        "
        :name="company.name"
        class="size-12 flex-none"
      />
      <div class="flex flex-1 flex-col items-start">
        <NuxtLink :to="`/reviews/${company.slug}`"
          ><h1 class="text-xl font-semibold hover:underline">
            {{ company.name }}
          </h1></NuxtLink
        >
        <div class="text-muted-foreground" v-html="company.merchant_summary" />
      </div>
      <StarRating
        v-if="company.editor_rating"
        :rating="+company.editor_rating"
        size="lg"
        with-text
        class="my-auto flex-none"
      />
    </div>
    <div class="relative bottom-0 w-full border-t">
      <Tabs>
        <div class="flex items-center justify-between border-b pr-4">
          <TabsList class="bg-card flex flex-1 justify-start rounded-none">
            <TabsTrigger
              :value="`${company.id}-ratings`"
              class="data-[state=active]:bg-highlight flex items-center justify-center gap-1 rounded-none data-[state=active]:shadow-none"
            >
              Ratings
              <ChevronDownIcon class="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              v-if="company.company_pro.length || company.company_con.length"
              :value="`${company.id}-pros-and-cons`"
              class="data-[state=active]:bg-highlight flex items-center justify-center gap-1 rounded-none data-[state=active]:shadow-none"
            >
              Pro & Cons
              <ChevronDownIcon class="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              :value="`${company.id}-best-for`"
              class="data-[state=active]:bg-highlight flex items-center justify-center gap-1 rounded-none data-[state=active]:shadow-none"
            >
              Best For
              <ChevronDownIcon class="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          <NuxtLink
            :to="`/reviews/${company.slug}`"
            class="text-primary font-medium hover:underline"
          >
            See full review &rarr;
          </NuxtLink>
        </div>
        <TabsContent :value="`${company.id}-ratings`" class="px-6 pb-6 pt-3">
          <Ratings
            :consumer-reviews="
              company.consumer_reviews ? +company.consumer_reviews : undefined
            "
          />
        </TabsContent>
        <TabsContent :value="`${company.id}-pros-and-cons`" class="px-2 pb-2">
          <ProsAndCons
            :pros="company.company_pro"
            :cons="company.company_con"
          />
        </TabsContent>
        <TabsContent :value="`${company.id}-best-for`" class="px-6 pb-6 pt-3">
          <p>{{ company.specialize_in }}</p>
        </TabsContent>
      </Tabs>
    </div>
  </Card>
</template>
