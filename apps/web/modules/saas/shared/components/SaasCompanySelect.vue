<script setup lang="ts">
  import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
  import {
    PlusIcon,
    CheckIcon,
    ChevronDownIcon,
  } from "@heroicons/vue/20/solid";

  const localePath = useLocalePath();
  const { teamMemberships, currentTeam } = useUser();
  const { switchTeam } = useSwitchTeam();
  const { createBrandDialogOpen } = useDashboardState();
  const runtimeConfig = useRuntimeConfig();

  const activeTeamIdModel = computed({
    get: () => currentTeam.value?.id,
    set: async (newValue) => {
      if (newValue) {
        switchTeam(newValue);
        await navigateTo(localePath(runtimeConfig.public.auth.redirectPath));
      }
    },
  });
</script>

<template>
  <Menu as="div" class="relative inline-block text-left" v-if="currentTeam">
    <MenuButton
      class="border-foreground group flex w-full items-center gap-3 border-2 border-opacity-10 px-3 py-2.5 hover:border-opacity-20"
    >
      <BrandLogo
        class="size-8"
        :name="currentTeam.name"
        :src="currentTeam.avatarUrl"
      />
      <div
        class="block flex-1 truncate text-left text-sm font-semibold leading-6"
      >
        {{ currentTeam.name }}
      </div>
      <ChevronDownIcon
        class="h-8 w-8 flex-none opacity-15 group-hover:opacity-25"
        aria-hidden="true"
      />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="bg-background ring-foreground shadow-foreground/10 absolute right-0 z-10 mt-2 w-full origin-top-right overflow-hidden shadow-lg ring-1 ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="teamMembership of teamMemberships"
          :key="teamMembership.team.id"
          v-slot="{ active }"
        >
          <button
            @click="() => switchTeam(teamMembership.team.id)"
            :class="[
              active ? 'bg-highlight text-foreground' : 'text-foreground/70',
              'group flex w-full items-center gap-3 px-4 py-3 text-sm',
            ]"
          >
            <BrandLogo
              class="size-8"
              :name="teamMembership.team.name"
              :src="teamMembership.team.avatarUrl"
            />
            <div
              class="text-foreground flex-1 truncate text-left text-sm font-semibold leading-6"
            >
              {{ teamMembership.team.name }}
            </div>
            <CheckIcon
              v-if="activeTeamIdModel === teamMembership.team.id"
              class="h-5 w-5 flex-none text-slate-500"
              aria-hidden="true"
            />
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            @click="() => (createBrandDialogOpen = true)"
            :class="[
              active ? 'bg-highlight' : '',
              'flex w-full items-center gap-3 border-t px-4 py-3 text-sm',
            ]"
          >
            <PlusIcon class="h-7 w-8" aria-hidden="true" />
            {{ $t("dashboard.sidebar.createCompany") }}
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>

  <SaasCreateBrandDialog
    @success="(newTeamId: string) => switchTeam(newTeamId)"
  />
</template>
