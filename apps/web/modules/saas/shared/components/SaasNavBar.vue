<script setup lang="ts">
  import { UserCogIcon } from "lucide-vue-next";
  import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import {
    Bars3Icon,
    HomeIcon,
    BriefcaseIcon,
    StarIcon,
    XMarkIcon,
    CogIcon,
  } from "@heroicons/vue/24/outline";

  const route = useRoute();
  const { t } = useTranslations();
  const { user } = useUser();

  const sidebarOpen = ref(false);
  const isAdmin = computed(() => user.value?.role === "ADMIN");
  const currentTeamId = useCurrentTeamIdCookie();
  type MenuItem = {
    label: string;
    to: string;
    icon: Component;
    current: boolean;
  };
  const menuItems = computed<MenuItem[]>(() => {
    if (!currentTeamId.value) {
      return [];
    }
    return [
      {
        label: t("dashboard.menu.dashboard"),
        icon: HomeIcon,
        to: "/dashboard",
        current: true,
      },
      {
        label: t("dashboard.menu.company"),
        icon: BriefcaseIcon,
        to: "/dashboard/company",
        current: false,
      },
      {
        label: "Review",
        icon: StarIcon,
        to: "/dashboard/review",
        current: false,
      },
      {
        label: t("dashboard.menu.settings"),
        icon: CogIcon,
        to: "/dashboard/settings",
        current: false,
      },
      ...(isAdmin.value
        ? ([
            {
              label: t("dashboard.menu.admin"),
              icon: UserCogIcon,
              to: `/dashboard/admin`,
              current: false,
            },
          ] satisfies MenuItem[])
        : []),
    ];
  });
  const isActiveMenuItem = (to: string | null) => {
    if (!to) return false;
    if (to === "/dashboard") {
      return route.path === to;
    }
    return route.path.includes(to);
  };
</script>

<template>
  <nav v-if="user" class="">
    <!-- Mobile Top Navbar -->
    <div
      class="bg-background sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-slate-400 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <NuxtLinkLocale to="/" class="flex items-center gap-2">
        <Logo :withLabel="false" />
        <span class="text-lg font-semibold"> Merchant Alternatives </span>
      </NuxtLinkLocale>
      <div class="ml-auto mr-0 flex items-center justify-end gap-4">
        <UserMenu />
      </div>
    </div>

    <!-- Mobile Dynamic Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-900/20" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute right-0 top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon
                      class="h-6 w-6 text-slate-900"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <NuxtLinkLocale to="/" class="block">
                    <Logo :withLabel="false" />
                  </NuxtLinkLocale>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in menuItems" :key="item.label">
                          <NuxtLinkLocale
                            :to="item.to"
                            @click="sidebarOpen = false"
                            :class="[
                              isActiveMenuItem(item.to)
                                ? 'bg-slate-200 text-slate-900'
                                : 'text-slate-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ item.label }}
                          </NuxtLinkLocale>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Static Sidebar -->
    <div
      class="bg-background hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[272px] lg:flex-col"
    >
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-4">
        <div class="flex h-16 shrink-0 items-center justify-center">
          <NuxtLinkLocale to="/" class="flex items-center gap-2.5">
            <Logo />
          </NuxtLinkLocale>
        </div>
        <SaasCompanySelect />
        <nav class="flex flex-1 flex-col pb-3">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="space-y-1">
                <li v-for="item in menuItems" :key="item.label">
                  <NuxtLinkLocale
                    :to="item.to"
                    :class="[
                      isActiveMenuItem(item.to)
                        ? 'bg-highlight'
                        : 'hover:bg-highlight opacity-80 hover:opacity-100',
                      'group flex gap-x-3 p-2 text-sm font-semibold leading-6',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.label }}
                  </NuxtLinkLocale>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <NuxtLinkLocale
                :class="[
                  isActiveMenuItem('/dashboard/profile')
                    ? 'bg-highlight'
                    : 'hover:bg-highlight',
                  'group flex items-center gap-x-4 px-3 py-2 text-sm font-semibold leading-6',
                ]"
                to="/dashboard/profile"
              >
                <UserAvatar
                  :avatarUrl="user.avatarUrl"
                  :name="user.name || ''"
                />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{{ user.name || "User" }}</span>
              </NuxtLinkLocale>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </nav>
</template>
