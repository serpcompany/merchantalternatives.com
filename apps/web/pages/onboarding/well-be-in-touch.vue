<script setup lang="ts">
  import { HandThumbUpIcon } from "@heroicons/vue/24/outline";

  definePageMeta({
    layout: "auth",
  });
</script>

<template>
  <div>
    <div class="mt-12 flex justify-center">
      <HandThumbUpIcon class="h-20 w-20" />
    </div>
    <h3 className="mt-12 mb-4 text-3xl font-bold ">Thank's for your request</h3>
    <p className="mb-4 text-muted-foreground">
      We'll be in touch with you shortly to verify your ownership of the brand.
    </p>
    <Button class="mt-10 w-full" variant="ghost">
      <NuxtLinkLocale to="/" class="block"> Go to homepage </NuxtLinkLocale>
    </Button>
  </div>
</template>
