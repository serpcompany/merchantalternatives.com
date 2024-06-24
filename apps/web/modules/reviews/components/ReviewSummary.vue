<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import {
    TrophyIcon,
    StarIcon,
    CurrencyDollarIcon,
  } from "@heroicons/vue/24/outline";

  defineProps({
    company: {
      type: Object as () => Partial<ApiOutput["company"]["getOneBySlug"]>,
      required: true,
    },
    withButton: {
      type: Boolean,
      default: false,
    },
    dashboard: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <Card>
    <CardHeader class="py-6 pb-3 pt-6 lg:p-6"
      ><CardTitle>Review</CardTitle></CardHeader
    >
    <CardContent
      v-if="company.editor_rating && company.consumer_reviews"
      class="flex flex-col gap-6"
    >
      <div class="lg:flex lg:gap-6">
        <div class="flex-1">
          <StarRating
            :rating="+company.editor_rating"
            size="lg"
            class="mb-4 w-fit lg:hidden"
          />
          <div class="flex items-center gap-2">
            <TrophyIcon class="size-5" />
            <h3 class="font-bold">Best For</h3>
          </div>
          <div
            class="text-muted-foreground mt-1"
            v-html="company.description"
          />
          <div class="mt-5 flex items-center gap-2">
            <StarIcon class="size-5" />
            <h3 class="font-bold">Specializes In</h3>
          </div>
          <p class="text-muted-foreground mt-1">{{ company.specialize_in }}</p>
        </div>
        <div>
          <StarRating
            :rating="+company.editor_rating"
            size="lg"
            with-text
            class="hidden lg:flex"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <CurrencyDollarIcon class="size-5" />
          <h3 class="font-bold">Pricing Summary</h3>
        </div>
        <div class="text-muted-foreground mt-1 flex divide-x-2">
          <div class="flex flex-1 flex-col px-3">
            <span>Setup Fee: {{ company.account_setup_fee }}</span>
            <span>Monthly Fee: {{ company.monthly_fee }}</span>
            <span
              >Early Termination Fee: {{ company.early_termination_fee }}</span
            >
          </div>
          <div class="flex flex-1 flex-col px-3">
            <span>Swipe Rate: {{ company.swiped_rate }}</span>
            <span>Keyed-In Rate: {{ company.keyed_in_rate }}</span>
            <span>Contract Terms: {{ "12 months" }}</span>
          </div>
        </div>
      </div>
      <Ratings :consumer-reviews="+company.consumer_reviews" />
    </CardContent>
    <CardContent v-else>
      <p v-if="!dashboard">Our review of this company is coming soon.</p>
      <p v-else>
        We have not yet reviewed your company's profile and offerings but you
        are now in the queue and we will contact you shortly.
      </p>
    </CardContent>
    <CardButton
      v-if="withButton"
      @click="navigateTo(`/reviews/${company.slug}/review`)"
      >See full review</CardButton
    >
  </Card>
</template>
