<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { reloadUser, currentBrand } = useUser();

  const emit = defineEmits(["close"]);

  const formSchema = toTypedSchema(
    z.object({
      reviewOneliner: z.string().max(144).optional(),
      website: z.string().max(100).optional(),
    }),
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      reviewOneliner: currentBrand.value?.reviewOneliner || undefined,
      website: currentBrand.value?.website || undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.brand.update.mutate({
        id: currentBrand.value!.id,
        reviewOneliner: values.reviewOneliner,
        website: values.website,
      });

      toast({
        title: "Your brand has been updated",
      });

      await reloadUser();
      emit("close");
    } catch (e) {
      toast({
        title:
          "We are sorry, but we were unable to update your brand. Please try again later.",
        variant: "error",
      });
    }
  });
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <SaasBrandLogoForm />

    <FormField v-slot="{ componentField }" name="reviewOneliner">
      <FormItem>
        <FormLabel for="reviewOneliner">Tagline</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="website">
      <FormItem>
        <FormLabel for="website">Website</FormLabel>
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
