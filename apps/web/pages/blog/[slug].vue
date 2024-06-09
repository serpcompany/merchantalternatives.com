<script lang="ts" setup>
  import markdownParser from "@nuxt/content/transformers/markdown";

  const slug = useRoute("blog-slug").params.slug;
  const { formatDate } = useLocaleDate();
  const { apiCaller } = useApiCaller();
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
      <div class="bg-primary flex h-[450px] items-center pt-20">
        <NuxtLinkLocale to="/blog" class="absolute left-20 top-20 text-white">
          &larr; {{ $t("blog.backLabel") }}
        </NuxtLinkLocale>
        <div class="relative px-20">
          <div class="flex gap-2">
            <NuxtLink v-for="tag in blog.tags" to="/">
              <Badge class="bg-white/20 text-white">{{ tag.name }}</Badge>
            </NuxtLink>
          </div>
          <h2
            class="stext-4xl mt-8 text-6xl font-black tracking-tight text-white"
          >
            {{ blog.title }}
          </h2>
          <p class="mt-4 text-xl leading-8 text-gray-300">
            Helpful resources for running and growing your business.
          </p>
        </div>
      </div>
      <div class="mx-auto max-w-5xl">
        <div
          class="flex items-end justify-between border-b pb-4 pt-8 text-lg font-medium text-gray-400"
        >
          <div v-if="blog.author">
            <div>Author</div>
            <NuxtLink to="/" class="text-primary">{{
              blog.author.name
            }}</NuxtLink>
          </div>
          <div>
            {{ formatDate({ date: new Date(blog.created_at) }) }}
          </div>
        </div>
        <div class="mt-6 flex gap-10 pb-20 pt-8">
          <div class="flex-1">
            <ContentRendererMarkdown
              :value="formattedContent"
              class="prose dark:prose-invert"
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
