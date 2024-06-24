<script setup lang="ts">
  import { ArrowRightIcon } from "@heroicons/vue/24/outline";

  const { apiCaller } = useApiCaller();

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const glossary = await apiCaller.glossary.getAll.query();
</script>

<template>
  <div class="isolate bg-white">
    <GlossaryHeader />
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        v-for="letter in alphabet"
        :key="letter"
        :id="letter"
        class="pt-12 lg:pt-24"
      >
        <h2 class="text-7xl font-semibold">{{ letter }}</h2>
        <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          <NuxtLink
            v-for="word in glossary.filter((word) =>
              word.title.startsWith(letter),
            )"
            :key="word.slug"
            :to="`/glossary/${word.slug}`"
            class="hover:border-primary group relative flex flex-col border border-white px-4 pb-8 pt-4"
          >
            <h3 class="text-xl font-semibold">{{ word.title }}</h3>
            <p class="text-gray-500">{{ word.one_liner }}</p>
            <ArrowRightIcon
              class="text-primary absolute bottom-4 right-4 h-6 w-6 group-hover:block lg:hidden"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
