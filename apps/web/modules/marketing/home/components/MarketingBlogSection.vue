<script setup lang="ts">
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
</script>

<template>
  <section class="bg-card text-card-foreground py-20">
    <div class="container">
      <div class="text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          Check out the latest from our blog
        </h1>
      </div>
      <div
        class="flex flex-col gap-8 divide-y py-20 lg:flex-row lg:divide-x lg:divide-y-0"
      >
        <article
          v-for="post in recentPosts"
          :key="post.id"
          class="flex flex-col items-start justify-between pt-2 lg:px-8"
        >
          <div class="max-w-xl">
            <div class="relative">
              <h3
                class="text-primary mt-3 text-5xl font-semibold hover:underline"
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
              <p class="mt-5 line-clamp-3 text-lg text-gray-600">
                {{ post.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
