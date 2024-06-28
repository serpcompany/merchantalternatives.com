<script setup lang="ts">
  import type { ApiOutput } from "api";

  const { createCompanyDialogOpen } = useDashboardState();

  const emit = defineEmits<{
    success: [newTeamId: string | undefined];
  }>();

  const handleCreateCompanySuccess = async (
    newCompany: ApiOutput["company"]["create"],
  ) => {
    emit("success", newCompany.team?.id);
    createCompanyDialogOpen.value = false;
  };
</script>

<template>
  <Dialog
    :open="createCompanyDialogOpen"
    @update:open="(newVal) => (createCompanyDialogOpen = newVal)"
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

      <SaasCreateCompanyForm
        @success="
          (newCompany: ApiOutput['company']['create']) =>
            handleCreateCompanySuccess(newCompany)
        "
      />
    </DialogContent>
  </Dialog>
</template>
