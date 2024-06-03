<script setup lang="ts">
  import type { ApiOutput } from "api";

  const { createBrandDialogOpen } = useDashboardState();

  const emit = defineEmits<{
    success: [newTeamId: string | undefined];
  }>();

  const handleCreateBrandSuccess = async (
    newBrand: ApiOutput["brand"]["create"],
  ) => {
    emit("success", newBrand.team?.id);
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
        @success="
          (newBrand: ApiOutput['brand']['create']) =>
            handleCreateBrandSuccess(newBrand)
        "
      />
    </DialogContent>
  </Dialog>
</template>
