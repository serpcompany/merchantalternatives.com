<script setup lang="ts">
  defineProps({
    tabs: {
      type: Array<{
        title: string;
        to: string;
      }>,
      required: true,
    },
    thin: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();
</script>

<template>
  <div class="overflow-hidden">
    <div class="sm:hidden">
      <!-- 
      <label for="tabs" class="sr-only">Select a tab</label>
      Use an "onChange" listener to redirect the user to the selected tab URL. 
      <select
        id="tabs"
        name="tabs"
        :onChange=""
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-slate-900 focus:outline-none focus:ring-slate-900 sm:text-sm"
      >
        <option v-for="tab in tabs" :key="tab.title">
          {{ tab.title }}
        </option>
      </select>
      -->
    </div>
    <div class="hidden w-full sm:block" :class="{ '-mb-px': thin }">
      <div class="w-full border-b border-gray-200">
        <nav
          :class="[thin ? 'space-x-3' : ' space-x-8', '-mb-px flex']"
          aria-label="Tabs"
        >
          <NuxtLinkLocale
            v-for="tab in tabs"
            :key="tab.title"
            :href="tab.to"
            :class="[
              tab.to === route.path
                ? 'border-primary text-primary'
                : 'text-muted-foreground hover:border-highlight hover:text-foreground border-transparent',
              thin
                ? 'border-b-4 px-3 py-3 text-base font-semibold'
                : 'border-b-2 px-1 py-4 text-sm font-medium',
              'whitespace-nowrap',
            ]"
            :aria-current="tab.to === route.path ? 'page' : undefined"
            >{{ tab.title }}</NuxtLinkLocale
          >
        </nav>
      </div>
    </div>
  </div>
</template>
