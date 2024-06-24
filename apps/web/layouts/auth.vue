<template>
  <div
    class="bg-card text-foreground flex min-h-screen flex-col items-center justify-between gap-8 py-8"
  >
    <div class="container">
      <div class="flex items-center justify-between">
        <NuxtLinkLocale to="/" class="block">
          <Logo />
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="w-full max-w-md flex-1">
      <slot />
    </div>

    <SaasFooter />
  </div>
</template>
