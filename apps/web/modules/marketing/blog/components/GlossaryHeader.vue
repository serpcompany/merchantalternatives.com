<script setup lang="ts">
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );
</script>

<template>
  <div class="absolute inset-0 -z-10">
    <NuxtImg
      src="/images/blog/cover.jpg"
      alt="World"
      class="bg-primary h-96 w-full object-cover"
    />
  </div>
  <div class="absolute inset-0 h-96 bg-slate-800/5" />
  <div
    class="relative flex h-96 items-center justify-center overflow-hidden px-4 pt-20 text-center lg:overflow-auto lg:px-0"
  >
    <div>
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        The Merchant Alternatives Glossary
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-300">
        Everything you need to know about the world of digital finance.
      </p>
    </div>
    <div
      class="absolute bottom-0 flex w-full gap-3 overflow-scroll px-4 py-2 lg:w-fit lg:gap-1 lg:overflow-auto lg:px-0"
    >
      <NuxtLink
        v-for="letter in alphabet"
        :key="letter"
        :to="`/glossary#${letter}`"
        type="button"
        class="duration-50 flex h-10 w-10 items-center text-2xl text-white/60 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white lg:justify-center"
      >
        {{ letter }}
      </NuxtLink>
    </div>
  </div>
</template>
