<script setup lang="ts">
  type HeadingButton = {
    label: string;
    action: () => void;
    icon?: Component;
  };

  defineProps({
    heading: {
      type: String,
      required: false,
    },
    subheading: {
      type: String,
      required: false,
    },
    headingButton: {
      type: Object as PropType<HeadingButton>,
      required: false,
    },
    variant: {
      type: String as PropType<"default" | "sm">,
      default: "default",
    },
  });
</script>

<template>
  <div
    class="mx-auto py-14"
    :class="{
      'max-w-[1000px]': variant === 'default',
      'max-w-3xl': variant === 'sm',
    }"
  >
    <div class="flex items-end justify-between pb-8">
      <div>
        <h1 v-if="heading" class="text-4xl font-bold">{{ heading }}</h1>
        <p v-if="subheading" class="text-muted-foreground mt-2 font-medium">
          {{ subheading }}
        </p>
      </div>
      <Button v-if="headingButton" @click="headingButton.action" variant="soft">
        {{ headingButton.label
        }}<component :is="headingButton.icon" class="mb-1 ml-2 h-5 w-5" />
      </Button>
    </div>
    <slot />
  </div>
</template>
