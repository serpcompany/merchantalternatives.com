<template>
  <nav class="to-primary/10 border-b bg-gradient-to-b from-transparent py-28">
    <div class="container text-center">
      <h1 class="mx-auto max-w-3xl text-3xl font-bold lg:text-6xl">
        Where Business Owners Go for Expert Advice On Financial Services.
      </h1>

      <p class="mt-5 text-lg opacity-75">
        Because business can be hard, but collecting money shouldn’t be.
      </p>

      <div
        class="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row"
      >
        <Button size="lg" as-child>
          <NuxtLink to="/auth/login">Get listed &rarr;</NuxtLink>
        </Button>
        <Button variant="outline" size="lg">
          <NuxtLink to="/reviews">Go to reviews</NuxtLink>
        </Button>
      </div>
    </div>
  </nav>
</template>
