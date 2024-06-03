<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const props = defineProps<{
    brandId: string;
    initialValue: string;
  }>();

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { reloadUser } = useUser();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3),
    }),
  );

  const { defineField, handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: props.initialValue || "",
    },
  });

  const [name, nameAttrs] = defineField("name");

  const isSubmitDisabled = computed(() => {
    return (
      !name.value || name.value.length < 3 || name.value === props.initialValue
    );
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.brand.update.mutate({
        id: props.brandId,
        name: values.name,
      });

      toast({
        variant: "success",
        title: t("settings.notifications.teamNameUpdated"),
      });

      reloadUser();
    } catch (error) {
      toast({
        variant: "error",
        title: t("settings.notifications.teamNameNotUpdated"),
      });
    }
  });
</script>

<template>
  <SaasActionBlock
    @submit="onSubmit"
    :isSubmitting="isSubmitting"
    :isSubmitDisabled="isSubmitDisabled"
  >
    <template #title>{{ $t("settings.team.changeName.title") }}</template>
    <div>
      <Input
        name="name"
        v-bind="nameAttrs"
        v-model="name"
        type="text"
        required
        autocomplete="name"
        class="max-w-sm"
      />
    </div>
  </SaasActionBlock>
</template>
