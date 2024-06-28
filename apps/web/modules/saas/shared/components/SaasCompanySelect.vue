<script setup lang="ts">
  import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
  import {
    PlusIcon,
    CheckIcon,
    ChevronDownIcon,
  } from "@heroicons/vue/20/solid";

  const localePath = useLocalePath();
  const { teamMemberships, currentCompany, currentTeam } = useUser();
  const { switchTeam } = useSwitchTeam();
  const { createCompanyDialogOpen } = useDashboardState();
  const runtimeConfig = useRuntimeConfig();

  const activeTeamId = computed({
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
  <Menu
    as="div"
    class="relative inline-block text-left"
    v-if="currentCompany && currentTeam"
  >
    <MenuButton
      class="border-foreground group flex w-full items-center gap-3 border-2 border-opacity-10 px-3 py-2.5 hover:border-opacity-20"
    >
      <CompanyLogo
        class="size-8"
        :name="currentCompany.name"
        :src="
          currentCompany.company_image.length
            ? currentCompany.company_image[0].url
            : null
        "
      />
      <div
        class="block flex-1 truncate text-left text-sm font-semibold leading-6"
      >
        {{ currentCompany.name }}
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
            @click="async () => await switchTeam(teamMembership.team.id)"
            :class="[
              active ? 'bg-highlight text-foreground' : 'text-foreground/70',
              'group flex w-full items-center gap-3 px-4 py-3 text-sm',
            ]"
          >
            <CompanyLogo
              class="size-8"
              :name="teamMembership.team.company.name"
              :src="
                teamMembership.team.company.company_image.length
                  ? teamMembership.team.company.company_image[0].url
                  : null
              "
            />
            <div
              class="text-foreground flex-1 truncate text-left text-sm font-semibold leading-6"
            >
              {{ teamMembership.team.company?.name }}
            </div>
            <CheckIcon
              v-if="activeTeamId === teamMembership.team.id"
              class="h-5 w-5 flex-none text-slate-500"
              aria-hidden="true"
            />
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            @click="() => (createCompanyDialogOpen = true)"
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
  <SaasCreateCompanyDialog
    @success="
      (newTeamId: string | undefined) => {
        if (newTeamId) switchTeam(newTeamId);
      }
    "
  />
</template>
