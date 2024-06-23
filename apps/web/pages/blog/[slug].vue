<script lang="ts" setup>
  import markdownParser from "@nuxt/content/transformers/markdown";

  const slug = useRoute("blog-slug").params.slug;
  const { formatDate } = useLocaleDate();
  const { apiCaller } = useApiCaller();
  const recentPosts = [
    {
      id: 1,
      title: "How to Start an Ecommerce Business",
      href: "/blog/how-to-start-an-ecommerce-business",
      description:
        "More products are being sold than ever before, thanks to the booming world of eCommerce. There has never been a better time for one to start their own digital storefront.",
      date: "Mar 16, 2020",
      tags: ["E-COMMERCE", "STARTUPS"],
      author: {
        name: "Amy Besen",
        role: "Head of Marketing",
        href: "/blog/authors/amy-besen",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 2,
      title: "How to Start a Small Business",
      href: "/blog/how-to-start-a-small-business",
      description:
        "Don’t worry, it’s not as complicated as you think it might be. In this article we’ll cover everything you need to know.",
      date: "Mar 16, 2020",
      tags: ["SMALL BUSINESS", "STARTUPS"],
      author: {
        name: "Amy Besen",
        role: "Head of Marketing",
        href: "/blog/authors/amy-besen",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ];

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
            <h2 class="text-2xl font-semibold">Recent Blogs</h2>
            <div class="flex flex-col gap-8 divide-y">
              <article
                v-for="post in recentPosts"
                :key="post.id"
                class="flex flex-col items-start justify-between pt-2"
              >
                <div class="max-w-xl">
                  <div class="relative">
                    <h3
                      class="text-primary mt-3 text-xl font-semibold leading-6 hover:underline"
                    >
                      <NuxtLink :href="post.href">
                        <span class="absolute inset-0" />
                        {{ post.title }}
                      </NuxtLink>
                    </h3>
                    <div class="mt-4 flex items-center gap-x-4 text-gray-500">
                      <p>
                        By
                        <NuxtLink
                          to="/blog/authors/amy-besen"
                          class="text-primary hover:underline"
                          >{{ post.author.name }}</NuxtLink
                        >
                        on {{ post.date }}
                      </p>
                    </div>
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
