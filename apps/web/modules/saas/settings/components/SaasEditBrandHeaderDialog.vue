<script setup lang="ts">
  const { editBrandHeaderOpen } = useDashboardState();

  const emit = defineEmits<{
    success: [id: string];
  }>();

  const handleCreateTeamSuccess = async (newTeamId: string) => {
    emit("success", newTeamId);
    editBrandHeaderOpen.value = false;
  };
</script>

<template>
  <Dialog
    :open="editBrandHeaderOpen"
    @update:open="(newVal) => (editBrandHeaderOpen = newVal)"
  >
    <DialogContent>
      <DialogDescription class="sr-only">Brand name</DialogDescription>
      <DialogHeader>
        <DialogTitle> Edit brand header </DialogTitle>
      </DialogHeader>

      <SaasCreateTeamForm
        @success="(newTeam) => handleCreateTeamSuccess(newTeam.id)"
      />
    </DialogContent>
  </Dialog>
</template>
