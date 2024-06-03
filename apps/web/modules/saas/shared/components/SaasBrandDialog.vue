<script setup lang="ts">
  const { createBrandDialogOpen } = useDashboardState();

  const emit = defineEmits<{
    success: [id: string];
  }>();

  const handleCreateBrandSuccess = async (newBrandId: string) => {
    emit("success", newBrandId);
    createBrandDialogOpen.value = false;
  };
</script>

<template>
  <Dialog
    :open="createBrandDialogOpen"
    @update:open="(newVal) => (createBrandDialogOpen = newVal)"
  >
    <DialogContent>
      <DialogDescription class="sr-only">
        {{ $t("createTeam.title") }}
      </DialogDescription>
      <DialogHeader>
        <DialogTitle>
          {{ $t("createTeam.title") }}
        </DialogTitle>
      </DialogHeader>

      <SaasCreateBrandForm
        @success="(newTeam) => handleCreateBrandSuccess(newTeam.id)"
      />
    </DialogContent>
  </Dialog>
</template>
