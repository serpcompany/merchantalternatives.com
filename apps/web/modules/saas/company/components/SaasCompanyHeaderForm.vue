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
      specialiseIn: z.string().optional(),
      url: z.string().max(100).optional(),
    }),
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      specialiseIn: currentCompany.value?.specialize_in || undefined,
      url: currentCompany.value?.url || undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.company.update.mutate({
        id: +currentCompany.value!.id,
        data: {
          specialize_in: values.specialiseIn,
          url: values.url,
        },
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
    <SaasBrandLogoForm />

    <FormField v-slot="{ componentField }" name="specialiseIn">
      <FormItem>
        <FormLabel for="specialiseIn">Tagline</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel for="url">Website</FormLabel>
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
