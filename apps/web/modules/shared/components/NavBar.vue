<script setup lang="ts">
  import { useWindowScroll } from "@vueuse/core";
  import { Bars3Icon } from "@heroicons/vue/24/outline";
  import { VisuallyHidden } from "radix-vue";

  const route = useRoute();
  const { t } = useTranslations();
  const { y: verticalScrollPosition } = useWindowScroll();
  const { user, loaded: userLoaded } = useUser();

  const isTop = computed(() => verticalScrollPosition.value < 10);

  const { public: runtimeConfig } = useRuntimeConfig();

  const hasUser = computed(() => {
    return userLoaded.value && user.value;
  });

  const mobileMenuOpen = ref(false);

  const isMenuItemActive = (to: string) => {
    return route.fullPath.startsWith(to);
  };

  watch(
    () => route.fullPath,
    () => {
      mobileMenuOpen.value = false;
    },
  );

  type MenuItem = {
    label: string;
    to: string;
  };
  const menuItems = computed<MenuItem[]>(() => [
    {
      label: t("common.menu.reviews"),
      to: "/reviews",
    },
    {
      label: "Industries",
      to: "/reviews/industry",
    },
    {
      label: t("common.menu.blog"),
      to: "/blog",
    },
    {
      label: t("common.menu.pricing"),
      to: "/pricing",
    },
    {
      label: "About",
      to: "/about",
    },
  ]);
</script>

<template>
  <nav
    class="bg-background/80 fixed left-0 top-0 z-20 w-full backdrop-blur-lg transition-[height] duration-200"
    :class="[isTop ? 'shadow-none' : 'shadow-sm']"
  >
    <div class="px-4 lg:container lg:px-0">
      <div class="flex items-center justify-between gap-6 py-3">
        <div class="flex flex-1 justify-start">
          <NuxtLinkLocale
            to="/"
            class="block hover:no-underline active:no-underline"
          >
            <Logo />
          </NuxtLinkLocale>
        </div>

        <div class="flex flex-1 items-center justify-end">
          <NuxtLinkLocale
            v-for="menuItem of menuItems"
            :key="menuItem.to"
            :to="menuItem.to"
            class="text-foreground/80 hidden shrink-0 px-3 py-2 text-base lg:block"
            :class="[isMenuItemActive(menuItem.to) ? 'font-bold' : '']"
          >
            {{ menuItem.label }}
          </NuxtLinkLocale>

          <Sheet v-model:open="mobileMenuOpen">
            <SheetTrigger asChild>
              <Button class="lg:hidden" size="icon" variant="ghost">
                <Bars3Icon class="size-7" />
              </Button>
            </SheetTrigger>
            <SheetContent class="w-[250px]" side="right">
              <VisuallyHidden>
                <DialogTitle> Menu </DialogTitle>
                <DialogDescription> Navigation Menu </DialogDescription>
              </VisuallyHidden>

              <div class="flex flex-col items-start justify-end">
                <NuxtLinkLocale
                  v-for="menuItem of menuItems"
                  :key="menuItem.to"
                  :to="menuItem.to"
                  class="block px-3 py-2 text-lg"
                  :class="[isMenuItemActive(menuItem.to) ? 'font-bold' : '']"
                >
                  {{ menuItem.label }}
                </NuxtLinkLocale>

                <NuxtLinkLocale
                  :to="
                    hasUser ? runtimeConfig.auth.redirectPath : '/auth/login'
                  "
                  :prefetch="!hasUser"
                  class="block px-3 py-2 text-lg"
                >
                  {{
                    hasUser
                      ? t("common.menu.dashboard")
                      : t("common.menu.login")
                  }}
                </NuxtLinkLocale>
              </div>
            </SheetContent>
          </Sheet>

          <Button class="hidden px-2 lg:block" asChild variant="ghost">
            <NuxtLinkLocale
              :to="hasUser ? runtimeConfig.auth.redirectPath : '/auth/login'"
              :prefetch="!hasUser"
            >
              {{
                hasUser ? t("common.menu.dashboard") : t("common.menu.login")
              }}
            </NuxtLinkLocale>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
