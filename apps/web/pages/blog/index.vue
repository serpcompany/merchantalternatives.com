<script setup lang="ts">
  const { apiCaller } = useApiCaller();
  const { formatDate } = useLocaleDate();

  const blogs = await apiCaller.blog.getAll.query();
</script>

<template>
  <div class="bg-white">
    <div class="bg-primary flex h-[450px] items-center pt-20">
      <div class="px-3 lg:px-20">
        <h2 class="text-5xl font-medium tracking-tight text-white lg:text-7xl">
          The Merchant Alternatives Blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-300">
          Helpful resources for running and growing your business.
        </p>
      </div>
    </div>
    <div
      class="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 lg:flex-row lg:px-8"
    >
      <div class="-mb-12 w-64 flex-none pt-6 lg:pb-0 lg:pt-16">
        <span class="text-4xl font-semibold">Our Top Picks</span>
      </div>
      <div class="flex flex-col divide-y">
        <article v-for="blog in blogs" :key="blog.id.toString()" class="py-16">
          <div class="flex gap-2">
            <NuxtLink v-for="tag in blog.tags" to="/">
              <Badge>{{ tag.name }}</Badge>
            </NuxtLink>
          </div>
          <NuxtLink
            :to="{
              name: 'blog-slug',
              params: { slug: blog.slug },
            }"
          >
            <h2 class="mt-8 text-5xl font-black hover:underline">
              {{ blog.title }}
            </h2>
          </NuxtLink>
          <p class="mt-4 text-gray-400">
            <span v-if="blog.author">
              By
              <NuxtLink
                :to="`/blog/authors/${blog.author.slug}`"
                class="text-primary hover:underline"
                >{{ blog.author.name }}</NuxtLink
              >
              on
            </span>
            <time>{{ formatDate({ date: new Date(blog.created_at) }) }}</time>
          </p>
          <p class="mt-4 text-xl text-gray-600">{{ blog.excerpt }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
