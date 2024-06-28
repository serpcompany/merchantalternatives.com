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
    <NuxtLink :to="`/reviews/${company.slug}`">
      <div class="flex gap-3 px-4 py-5">
        <CompanyLogo
          :src="
            company.company_image?.length ? company.company_image[0].url : null
          "
          :name="company.name"
          class="size-12 flex-none"
        />
        <div class="flex flex-1 flex-col items-start">
          <h1 class="text-xl font-semibold hover:underline">
            {{ company.name }}
          </h1>
          <StarRating
            v-if="company.editor_rating"
            :rating="+company.editor_rating"
            size="md"
            class="pb-2 pt-1 lg:hidden"
          />
          <div
            class="text-muted-foreground mt-1"
            v-html="company.specialize_in"
          />
        </div>
        <StarRating
          v-if="company.editor_rating"
          :rating="+company.editor_rating"
          size="lg"
          with-text
          class="my-auto hidden flex-none lg:flex"
        />
      </div>
    </NuxtLink>
    <div class="relative bottom-0 w-full border-t">
      <Tabs>
        <div class="flex items-center justify-between border-b pr-4">
          <TabsList class="bg-card flex flex-1 justify-start rounded-none">
            <TabsTrigger
              v-if="company.merchant_summary"
              :value="`${company.id}-about`"
              class="data-[state=active]:bg-highlight flex items-center justify-center gap-1 rounded-none data-[state=active]:shadow-none"
            >
              About
              <ChevronDownIcon class="h-4 w-4" />
            </TabsTrigger>
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
          </TabsList>
          <NuxtLink
            :to="`/reviews/${company.slug}`"
            class="text-primary hidden font-medium hover:underline lg:block"
          >
            See full review &rarr;
          </NuxtLink>
        </div>
        <TabsContent :value="`${company.id}-about`" class="px-6 pb-6 pt-3">
          <p v-html="company.merchant_summary"></p>
        </TabsContent>
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
      </Tabs>
    </div>
  </Card>
</template>
