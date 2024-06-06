<script lang="ts" setup>
  import type { MarketingBlogPageFields } from "@/modules/marketing/blog/types";
  import { joinURL } from "ufo";

  const route = useRoute("blog-path");
  const runtimeConfig = useRuntimeConfig();
  const { formatDate } = useLocaleDate();
  const { locale, defaultLocale } = useI18n();
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

  const { data: post } = await useAsyncData(
    route.path,
    async () => {
      const localeExtensionPattern = /(\.[a-zA-Z\\-]{2,5})+\.md$/;
      try {
        return await queryContent<MarketingBlogPageFields>(
          `blog/${route.params.path}`,
        )
          .where({
            $and: [
              { draft: { $not: true } },
              locale.value === defaultLocale
                ? { _file: { $not: { $match: localeExtensionPattern } } }
                : {
                    _file: { $match: localeExtensionPattern },
                  },
            ],
          })
          .findOne();
      } catch {
        await navigateTo("/blog");
        return null;
      }
    },
    {
      watch: [locale],
    },
  );
  if (!post.value) {
    await navigateTo("/blog");
    throw new Error("Post not found");
  }

  // SEO
  useContentHead(post.value);

  // Override the `ogImage` field. It is already set by `useContentHead` above, but without the base url.
  useSeoMeta({
    ogImage: post.value.image?.src
      ? joinURL(runtimeConfig.public.siteUrl, post.value.image.src)
      : undefined,
  });
</script>

<template>
  <ContentRenderer v-if="post" :value="post">
    <div class="bg-white py-20">
      <div class="container max-w-6xl">
        <div>
          <div class="mb-12">
            <NuxtLinkLocale to="/blog">
              &larr; {{ $t("blog.backLabel") }}
            </NuxtLinkLocale>
          </div>

          <h1 class="text-5xl font-bold">{{ post.title }}</h1>

          <div class="mt-4 flex items-center justify-start gap-6">
            <div v-if="post.authorName" class="flex items-center">
              <div
                v-if="post.authorImage"
                class="relative mr-2 size-8 overflow-hidden rounded-full"
              >
                <NuxtImg
                  :src="post.authorImage"
                  :alt="post.authorName"
                  sizes="96px"
                  class="object-cover object-center"
                />
              </div>
              <div>
                <p class="text-sm font-semibold opacity-50">
                  {{ post.authorName }}
                </p>
              </div>
            </div>

            <div v-if="post.date" class="ml-auto mr-0">
              <p class="text-sm opacity-30">
                {{ formatDate({ date: new Date(post.date) }) }}
              </p>
            </div>

            <div v-if="post.tags?.length" class="flex flex-1 flex-wrap gap-2">
              <span
                v-for="tag of post.tags"
                :key="tag"
                class="text-primary text-xs font-semibold uppercase tracking-wider"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-10">
          <div class="flex-1">
            <div
              v-if="post.image?.src"
              class="relative aspect-[16/9] overflow-hidden"
            >
              <NuxtImg
                :src="post.image.src"
                :alt="post.title"
                sizes="100vw md:50vw lg:1200px"
                width="1920"
                height="1080"
                class="size-full object-cover object-center"
              />
            </div>
            <ContentRendererMarkdown
              :value="post"
              class="prose dark:prose-invert mx-auto mt-6 max-w-2xl"
            />
          </div>
          <div class="w-72 flex-none">
            <h2 class="text-2xl font-semibold">Recent Posts</h2>
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
