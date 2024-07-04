<template>
  <section class="bg-card text-card-foreground py-24">
    <div class="container">
      <!-- Section header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          Process more sales. Save on fees. Sleep at night.
        </h1>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-16">
        <!-- Feature 1 -->
        <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <NuxtImg
            src="/images/landing/landing-3.jpg"
            class="h-[380px] w-[550px] rounded-2xl object-cover"
            alt="Feature 1"
          />

          <div>
            <h3 class="text-3xl font-bold">
              Get it right when it comes to payments
            </h3>
            <p class="text-md mt-4">
              Choosing the right credit card processors for your business can be
              the difference between saving thousands of dollars on fees to
              having your account frozen, suspended, or terminated.
            </p>
            <p class="text-md mt-4">
              Click the button below to see our top picks of the best providers
              so you can process more sales, save on fees, and keep your
              merchant account safe from closure.
            </p>
            <Button variant="outline" size="lg" class="mt-6">
              <NuxtLink to="/reviews">Go to reviews</NuxtLink>
            </Button>
          </div>
        </div>
        <!-- Feature 2 -->
        <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <NuxtImg
            src="/images/landing/landing-4.jpg"
            class="h-[380px] w-[550px] rounded-2xl object-cover lg:order-2"
            alt="Feature 1"
          />

          <div class="lg:order-1">
            <h3 class="text-3xl font-bold">
              Find the best players in your industry
            </h3>
            <p class="text-md mt-4">
              Choosing the right credit card processors for your business can be
              the difference between saving thousands of dollars on fees to
              having your account frozen, suspended, or terminated.
            </p>
            <p class="text-md mt-4">
              Click the button below to see our top picks of the best providers
              so you can process more sales, save on fees, and keep your
              merchant account safe from closure.
            </p>
            <Button variant="outline" size="lg" class="mt-6">
              <NuxtLink to="/reviews/industry">Go to industries</NuxtLink>
            </Button>
          </div>
        </div>
        <!-- Feature 3 -->
        <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <NuxtImg
            src="/images/landing/landing-5.jpg"
            class="h-[380px] w-[550px] rounded-2xl object-cover"
            alt="Feature 1"
          />

          <div>
            <h3 class="text-3xl font-bold">
              Want your payments provider in front on millions of searching
              customers?
            </h3>
            <p class="text-md mt-4">
              Choosing the right credit card processors for your business can be
              the difference between saving thousands of dollars on fees to
              having your account frozen, suspended, or terminated.
            </p>
            <p class="text-md mt-4">
              Click the button below to see our top picks of the best providers
              so you can process more sales, save on fees, and keep your
              merchant account safe from closure.
            </p>
            <Button variant="outline" size="lg" class="mt-6">
              <NuxtLink to="/auth/signup">Sign up</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
