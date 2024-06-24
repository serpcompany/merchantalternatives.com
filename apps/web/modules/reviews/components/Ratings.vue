<script setup lang="ts">
  defineProps({
    ratesAndFees: {
      type: Number,
      default: 80,
    },
    trustInAdvertising: {
      type: Number,
      default: 70,
    },
    consumerReviews: {
      type: Number,
      default: 50,
    },
    customerSupport: {
      type: Number,
      default: 60,
    },
  });
</script>

<template>
  <div class="flex flex-col gap-2.5 font-bold">
    <div>
      <h3>Rates and Fees | {{ ratesAndFees }}%</h3>
      <PercentBar :percent="ratesAndFees" />
    </div>
    <div>
      <h3>Trust in Advertising | {{ trustInAdvertising }}%</h3>
      <PercentBar :percent="trustInAdvertising" />
    </div>
    <div>
      <h3>Consumer Reviews | {{ consumerReviews }}%</h3>
      <PercentBar :percent="consumerReviews" />
    </div>
    <div>
      <h3>Customer Support | {{ customerSupport }}%</h3>
      <PercentBar :percent="customerSupport" />
    </div>
  </div>
</template>
