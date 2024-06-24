<script lang="ts" setup>
  import markdownParser from "@nuxt/content/transformers/markdown";

  const slug = useRoute("blog-slug").params.slug;
  const { formatDate } = useLocaleDate();
  const { apiCaller } = useApiCaller();

  const blog = await apiCaller.blog.getOneBySlug.query({ slug });
  const formattedContent = await markdownParser.parse!(
    blog.id.toString() || "",
    blog.content || "",
    {},
  );
</script>

<template>
  <ContentRenderer v-if="blog">
    <div class="bg-white">
      <div class="bg-primary px-14 pt-20">
        <div class="flex items-center">
          <NuxtLinkLocale
            to="/blog"
            class="absolute left-36 top-20 z-10 text-white"
          >
            &larr; {{ $t("blog.backLabel") }}
          </NuxtLinkLocale>
          <div class="relative max-w-6xl px-20 py-20">
            <div class="flex gap-2">
              <NuxtLink v-for="tag in blog.tags" to="/">
                <Badge class="bg-white/20 text-white">{{ tag.name }}</Badge>
              </NuxtLink>
            </div>
            <h2 class="mt-8 text-6xl font-black tracking-tight text-white">
              {{ blog.title }}
            </h2>
            <p class="mt-4 text-xl leading-8 text-gray-300">
              {{ blog.excerpt }}
            </p>
          </div>
        </div>
      </div>
      <div class="mx-auto max-w-5xl">
        <div
          class="flex items-end justify-between border-b pb-4 pt-8 text-lg font-medium text-gray-400"
        >
          <div v-if="blog.author">
            <div>Author</div>
            <NuxtLink
              :to="`/blog/authors/${blog.author.slug}`"
              class="text-primary hover:underline"
              >{{ blog.author.name }}</NuxtLink
            >
          </div>
          <div>
            {{ formatDate({ date: new Date(blog.created_at) }) }}
          </div>
        </div>
        <div class="mt-6 flex gap-12 pb-20 pt-4">
          <div class="flex-1 pl-4">
            <ContentRendererMarkdown
              :value="formattedContent"
              class="prose dark:prose-invert text-lg"
            />
          </div>
          <div class="w-[310px] flex-none">
            <RecentPostsSidebar />
          </div>
        </div>
      </div>
    </div>
  </ContentRenderer>
</template>
