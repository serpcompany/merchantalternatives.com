<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
  });

  const { settingsDialogOpen } = useDashboardState();
</script>

<template>
  <Dialog
    :open="settingsDialogOpen"
    @update:open="(newVal) => (settingsDialogOpen = newVal)"
  >
    <DialogContent>
      <DialogDescription class="sr-only">{{ title }}</DialogDescription>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
