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
  const { createTeamDialogOpen } = useDashboardState();
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
      class="group flex w-full items-center gap-3 rounded-lg border-2 border-slate-200 px-3 py-2.5 hover:border-slate-300"
    >
      <TeamAvatar
        class="size-8"
        :name="currentTeam.name"
        :avatar-url="currentTeam.avatarUrl"
      />
      <div
        class="text-sm font-semibold leading-6 text-slate-900 truncate block flex-1 text-left"
      >
        {{ currentTeam.name }}
      </div>
      <ChevronDownIcon
        class="h-8 w-8 flex-none text-slate-300 group-hover:text-slate-400"
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
        class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
      >
        <MenuItem
          v-for="teamMembership of teamMemberships"
          :key="teamMembership.team.id"
          v-slot="{ active }"
        >
          <button
            @click="() => switchTeam(teamMembership.team.id)"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'group flex items-center gap-3 px-4 py-3 text-sm w-full',
            ]"
          >
            <TeamAvatar
              class="size-8"
              :name="teamMembership.team.name"
              :avatar-url="teamMembership.team.avatarUrl"
            />
            <div class="text-sm font-semibold leading-6 text-slate-900">
              {{ teamMembership.team.name }}
            </div>
            <div class="w-full" />
            <CheckIcon
              v-if="activeTeamIdModel === teamMembership.team.id"
              class="h-5 w-5 flex-none text-slate-500"
              aria-hidden="true"
            />
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            @click="() => (createTeamDialogOpen = true)"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'group flex items-center gap-3 px-4 py-3 text-sm w-full border-t',
            ]"
          >
            <PlusIcon
              class="h-7 w-8 text-gray-500 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {{ $t("dashboard.sidebar.createCompany") }}
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>

  <SaasCreateTeamDialog @success="(newTeamId) => switchTeam(newTeamId)" />
</template>
