<script setup lang="ts">
  import type { ApiOutput } from "api/modules/trpc/router";
  import {
    TrophyIcon,
    StarIcon,
    CurrencyDollarIcon,
  } from "@heroicons/vue/24/outline";

  defineProps<{
    brand: ApiOutput["brand"]["bySlug"];
  }>();

  const brandSlug = useRoute("reviews-brandSlug").params.brandSlug;
  const getFirstParagraph = (html: string): string =>
    html.split("<p>")[1].split("</p>")[0];
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card
      v-if="
        brand.rating &&
        brand.ratesAndFeesRating &&
        brand.consumerReviewsRating &&
        brand.customerSupportRating &&
        brand.truthInAdvertisingRating
      "
    >
      <CardHeader><CardTitle>Review</CardTitle></CardHeader>
      <CardContent class="flex flex-col gap-6">
        <div class="flex gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <TrophyIcon class="size-5" />
              <h3 class="font-bold">Best For</h3>
            </div>
            <p class="text-muted-foreground mt-1">{{ brand.bestFor }}</p>
            <div class="mt-5 flex items-center gap-2">
              <StarIcon class="size-5" />
              <h3 class="font-bold">Specializes In</h3>
            </div>
            <p class="text-muted-foreground mt-1">{{ brand.specializesIn }}</p>
          </div>
          <div>
            <StarRating :rating="brand.rating" with-text />
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <CurrencyDollarIcon class="size-5" />
            <h3 class="font-bold">Pricing Summary</h3>
          </div>
          <div class="text-muted-foreground mt-1 flex divide-x-2">
            <div class="flex flex-1 flex-col px-3">
              <span>Setup Fee: {{ brand.setupFee }}</span>
              <span>Monthly Fee: {{ brand.monthlyFee }}</span>
              <span
                >Early Termination Fee: {{ brand.earlyTerminationFee }}</span
              >
            </div>
            <div class="flex flex-1 flex-col px-3">
              <span>Swipe Rate: {{ brand.swipeRate }}</span>
              <span>Keyed-In Rate: {{ brand.keyedInRate }}</span>
              <span>Contract Terms: {{ brand.contractTerms }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 font-bold">
          <div>
            <h3>Rates and Fees | {{ brand.ratesAndFeesRating }}%</h3>
            <PercentBar :percent="brand.ratesAndFeesRating" />
          </div>
          <div>
            <h3>
              Trust in Advertising | {{ brand.truthInAdvertisingRating }}%
            </h3>
            <PercentBar :percent="brand.truthInAdvertisingRating" />
          </div>
          <div>
            <h3>Consumer Reviews | {{ brand.consumerReviewsRating }}%</h3>
            <PercentBar :percent="brand.consumerReviewsRating" />
          </div>
          <div>
            <h3>Customer Support | {{ brand.customerSupportRating }}%</h3>
            <PercentBar :percent="brand.customerSupportRating" />
          </div>
        </div>
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brandSlug}/review`)"
        >See full review</CardButton
      >
    </Card>
    <Card>
      <CardHeader><CardTitle>About</CardTitle></CardHeader>
      <CardContent>
        <div v-html="brand.overview" class="externalHtml" />
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brandSlug}/about`)"
        >See all details</CardButton
      >
    </Card>
    <Card>
      <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
      <CardContent>
        <p v-if="brand.overview">{{ getFirstParagraph(brand.overview) }}</p>
      </CardContent>
      <CardButton @click="navigateTo(`/reviews/${brandSlug}/pricing`)"
        >See all details</CardButton
      >
    </Card>
  </div>
</template>

<style scoped>
  .externalHtml {
    :deep {
      p {
        margin-bottom: 10px;
      }
    }
  }
</style>
