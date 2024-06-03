<script setup lang="ts">
  import { useFileDialog } from "@vueuse/core";
  import { LoaderIcon } from "lucide-vue-next";
  import { v4 as uuid } from "uuid";
  import { useToast } from "@/modules/ui/components/toast";
  import { PencilIcon } from "@heroicons/vue/24/outline";

  const uploading = ref(false);
  const image = ref<File | null>(null);
  const cropDialogOpen = ref(false);
  const dropZoneRef = ref<HTMLDivElement>();
  const { reloadUser, currentTeam } = useUser();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();

  const getSignedUploadUrlMutation =
    apiCaller.uploads.signedUploadUrl.useMutation();
  const updateTeamMutation = apiCaller.team.update.useMutation();

  const { open: openFileDialog, onChange: onFilesSelected } = useFileDialog({
    accept: "image/*",
    multiple: false,
  });

  onFilesSelected((files) => {
    if (files?.length) {
      image.value = files[0];
      cropDialogOpen.value = true;
    }
  });

  const onCrop = async (croppedImageData: Blob | null) => {
    if (!croppedImageData || !currentTeam.value) {
      return;
    }

    uploading.value = true;
    try {
      const path = `/${currentTeam.value?.id}-${uuid()}.png`;
      const uploadUrl = await getSignedUploadUrlMutation.mutate({
        path,
        bucket: "avatars",
      });

      if (!uploadUrl) {
        throw new Error("Failed to get upload url");
      }

      await $fetch(uploadUrl, {
        method: "PUT",
        body: croppedImageData,
        headers: {
          "Content-Type": "image/png",
        },
      });

      await updateTeamMutation.mutate({
        id: currentTeam.value.id,
        avatarUrl: path,
      });

      toast({
        variant: "success",
        title: "Your logo has been updated",
      });

      await reloadUser();
    } catch (e) {
      toast({
        variant: "error",
        title: "We were unable to update your logo. Please try again later.",
      });
    } finally {
      uploading.value = false;
    }
  };
</script>

<template>
  <div>
    <label class="text-sm font-medium">Logo</label>

    <div class="mt-2 flex items-center gap-4">
      <div
        ref="dropZoneRef"
        class="relative cursor-pointer rounded-full"
        @click="openFileDialog()"
      >
        <BrandLogo
          :src="currentTeam?.avatarUrl"
          :name="currentTeam?.name ?? ''"
          class="size-24 cursor-pointer text-xl"
        />
        <Button
          type="button"
          variant="soft"
          size="sm"
          class="bg-primary/50 hover:bg-primary/90 absolute right-1 top-1 p-2 text-white transition-colors duration-200"
        >
          <PencilIcon class="size-4 stroke-2 text-white" />
        </Button>
        <div
          v-if="uploading"
          class="bg-card/90 absolute inset-0 z-20 flex items-center justify-center"
        >
          <LoaderIcon class="text-primary size-6 animate-spin" />
        </div>
      </div>
    </div>

    <SaasCropImageDialog
      :open="cropDialogOpen"
      :image="image"
      @open-change="(open: boolean) => (cropDialogOpen = open)"
      @save="
        (imageData: Blob | null) => (
          onCrop(imageData), (cropDialogOpen = false)
        )
      "
    />
  </div>
</template>
