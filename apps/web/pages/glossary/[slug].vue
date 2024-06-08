<script lang="ts" setup>
  const { apiCaller } = useApiCaller();
  import type { MarketingBlogPageFields } from "@/modules/marketing/blog/types";
  import markdownParser from "@nuxt/content/transformers/markdown";

  const slug = useRoute("glossary-slug").params.slug;
  const recentPosts = [
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "/blog/second-post",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "/blog/second-post",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "/blog/second-post",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ];

  const term = await apiCaller.glossary.getOneBySlug.query({ slug });
  const formattedContent = await markdownParser.parse!(
    term.id.toString() || "",
    term.content || "",
    {},
  );
</script>

<template>
  <ContentRenderer v-if="term">
    <div class="isolate bg-white">
      <GlossaryHeader />
      <div class="container max-w-5xl py-12">
        <div>
          <div class="mb-12">
            <NuxtLinkLocale to="/glossary">
              &larr; Back to glossary
            </NuxtLinkLocale>
          </div>

          <h1 class="text-6xl font-bold">{{ term.title }}</h1>
          <p class="mt-4 text-lg text-gray-600">{{ term.one_liner }}</p>
        </div>

        <div class="mt-6 flex justify-center gap-10">
          <div class="flex-1">
            <ContentRendererMarkdown
              :value="formattedContent"
              class="prose dark:prose-invert mt-6"
            />
          </div>
          <div class="w-72 flex-none pt-10">
            <h2 class="text-2xl font-semibold">Recent Blog Posts</h2>
            <div class="flex flex-col gap-8 divide-y">
              <article
                v-for="post in recentPosts"
                :key="post.id"
                class="flex flex-col items-start justify-between pt-8"
              >
                <NuxtLink :to="post.href" class="relative w-full">
                  <img
                    :src="post.imageUrl"
                    alt=""
                    class="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div
                    class="absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </NuxtLink>
                <div class="max-w-xl">
                  <div class="mt-4 flex items-center gap-x-4 text-xs">
                    <time :datetime="post.datetime" class="text-gray-500">{{
                      post.date
                    }}</time>
                    <h2
                      class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {{ post.category.title }}
                    </h2>
                  </div>
                  <div class="group relative">
                    <h3
                      class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                    >
                      <NuxtLink :href="post.href">
                        <span class="absolute inset-0" />
                        {{ post.title }}
                      </NuxtLink>
                    </h3>
                    <p
                      class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
                    >
                      {{ post.description }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentRenderer>
</template>
