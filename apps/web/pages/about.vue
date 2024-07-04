<script setup lang="ts">
  import { RocketLaunchIcon, FlagIcon } from "@heroicons/vue/24/outline";

  useHead({
    title: "About Us | Merchant Alternatives",
    meta: [
      {
        name: "description",
        content:
          "Merchant Alternatives provides independently researched un-biased reviews of merchant account providers, software & vendors.",
      },
    ],
  });
</script>

<template>
  <div class="isolate overflow-hidden bg-white">
    <!-- Hero section -->
    <div class="relative isolate -z-10">
      <svg
        class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>
      <div
        class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style="
            clip-path: polygon(
              63.1% 29.5%,
              100% 17.1%,
              76.6% 3%,
              48.4% 0%,
              44.6% 4.7%,
              54.5% 25.3%,
              59.8% 49%,
              55.2% 57.8%,
              44.4% 57.2%,
              27.8% 47.9%,
              35.1% 81.5%,
              0% 97.7%,
              39.2% 100%,
              35.2% 81.4%,
              97.2% 52.8%,
              63.1% 29.5%
            );
          "
        />
      </div>
      <div class="overflow-hidden">
        <div
          class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-20"
        >
          <div
            class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
          >
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                We do the research so you can get back to your business
              </h1>
              <p
                class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none"
              >
                With over 15 years of first-hand experience in the merchant
                processing industry experience, it is our mission to support
                business owners by providing experience & expertise that is
                unique, enjoyable and focused on helping your business succeed.
              </p>
            </div>
            <div
              class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
            >
              <div
                class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
              >
                <div class="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600275669439-14e40452d20b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    class="aspect-[2/3] w-full bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>
              <div
                class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36"
              >
                <div class="relative">
                  <img
                    src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    class="aspect-[2/3] w-full bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
                <div class="relative">
                  <img
                    src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                    alt=""
                    class="aspect-[2/3] w-full bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>
              <div class="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative">
                  <img
                    src="https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&w=400&h=528&q=80"
                    alt=""
                    class="aspect-[2/3] w-full bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
                <div class="relative">
                  <img
                    src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                    alt=""
                    class="aspect-[2/3] w-full bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div
      class="mx-auto -mt-12 flex max-w-7xl flex-col px-6 pb-40 sm:mt-0 lg:flex-row lg:px-8 xl:-mt-8"
    >
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-none lg:px-14">
        <div
          class="background-blur-lg border-primary/40 mx-auto my-10 flex size-32 items-center justify-center rounded-lg border bg-white/40 shadow-lg"
        >
          <RocketLaunchIcon class="size-24" />
        </div>
        <h2
          class="mt-14 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Our Mission
        </h2>
        <div class="mt-3 lg:w-full lg:max-w-xl lg:flex-auto">
          <p class="text-xl leading-8 text-gray-600">
            Our mission is to help business owners make better, more informed
            decisions, about the products, services & systems they use.
          </p>
          <div class="mt-6 max-w-lg text-base leading-7 text-gray-700">
            <p>
              We conduct independent research to review & rate merchant account
              providers by category, type & purpose.
            </p>
          </div>
        </div>
      </div>
      <div class="bg-border mt-[240px] hidden h-56 w-0.5 lg:block" />
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-none lg:px-14">
        <div
          class="background-blur-lg border-primary/40 mx-auto my-10 flex size-32 items-center justify-center rounded-lg border bg-white/40 shadow-lg"
        >
          <FlagIcon class="size-24" />
        </div>
        <h2
          class="mt-14 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Our Purpose
        </h2>
        <div class="mt-3 lg:w-full lg:max-w-xl lg:flex-auto">
          <p class="text-xl leading-8 text-gray-600">
            Merchant Alternatives provides independently researched un-biased
            reviews of merchant account providers, software & vendors.
          </p>
          <div class="mt-6 max-w-lg text-base leading-7 text-gray-700">
            <p>
              We also provide educational resources for entrepreneurs, merchants
              and business owners to help them succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
