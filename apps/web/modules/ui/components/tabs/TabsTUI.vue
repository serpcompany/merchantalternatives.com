<script setup lang="ts">
  defineProps({
    tabs: {
      type: Array<{
        title: string;
        to: string;
      }>,
      required: true,
    },
  });

  const route = useRoute();
</script>

<template>
  <div>
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
    <div class="hidden sm:block w-full">
      <div class="border-b border-gray-200 w-full">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <NuxtLinkLocale
            v-for="tab in tabs"
            :key="tab.title"
            :href="tab.to"
            :class="[
              tab.to === route.path
                ? 'border-slate-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
            ]"
            :aria-current="tab.to === route.path ? 'page' : undefined"
            >{{ tab.title }}</NuxtLinkLocale
          >
        </nav>
      </div>
    </div>
  </div>
</template>
