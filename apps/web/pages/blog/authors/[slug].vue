<script lang="ts" setup>
  const slug = useRoute("blog-authors-slug").params.slug;
  const { formatDate } = useLocaleDate();
  const { apiCaller } = useApiCaller();

  const author = await apiCaller.blog.getAuthorBySlug.query({ slug });
</script>

<template>
  <div class="bg-white">
    <div class="bg-primary flex h-[450px] items-center pt-20">
      <div class="flex gap-8 px-3 lg:px-20">
        <div>
          <h1 class="text-4xl font-black text-white lg:text-6xl">
            {{ author.name }}
          </h1>
          <p class="mt-4 text-xl text-white">Marketing Manager</p>
          <p class="mt-3 text-white">{{ author.bio }}</p>
        </div>
      </div>
    </div>
    <div
      class="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 lg:flex-row lg:px-8"
    >
      <div class="-mb-20 w-64 flex-none pt-12 lg:pt-16">
        <span class="text-4xl font-semibold">{{ author.name }}'s Posts</span>
      </div>
      <div class="flex flex-col divide-y">
        <article
          v-for="blog in author.blogs"
          :key="blog.id.toString()"
          class="py-12 lg:py-16"
        >
          <NuxtLink
            :to="{
              name: 'blog-slug',
              params: { slug: blog.slug },
            }"
          >
            <h2 class="mt-8 text-4xl font-black hover:underline lg:text-5xl">
              {{ blog.title }}
            </h2>
          </NuxtLink>
          <p class="mt-4 text-gray-400">
            <time>{{ formatDate({ date: new Date(blog.created_at) }) }}</time>
          </p>
          <p class="mt-4 text-xl text-gray-600">{{ blog.excerpt }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
