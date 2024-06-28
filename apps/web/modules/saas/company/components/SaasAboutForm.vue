<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { reloadUser, currentCompany } = useUser();

  const emit = defineEmits(["close"]);

  const formSchema = toTypedSchema(
    z.object({
      description: z.string().optional(),
    }),
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      description: currentCompany.value?.description || undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.company.update.mutate({
        id: currentCompany.value!.id,
        data: { description: values.description },
      });

      toast({
        title: "Your company has been updated",
      });

      await reloadUser();
      emit("close");
    } catch (e) {
      toast({
        title:
          "We are sorry, but we were unable to update your company. Please try again later.",
        variant: "error",
      });
    }
  });
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel for="description">Tell us about your company</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-4 w-full" type="submit" :loading="isSubmitting">
      Update
    </Button>
  </form>
</template>
