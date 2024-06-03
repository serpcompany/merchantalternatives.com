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
      ceo: z.string().max(100).optional(),
      numOfEmployees: z.coerce.number().int().optional(),
      hqLocation: z.string().max(100).optional(),
      yearFounded: z.coerce.number().int().optional(),
    }),
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      ceo: currentBrand.value?.ceo || undefined,
      numOfEmployees: currentBrand.value?.numOfEmployees || undefined,
      hqLocation: currentBrand.value?.hqLocation || undefined,
      yearFounded: currentBrand.value?.yearFounded || undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.brand.update.mutate({
        id: currentBrand.value!.id,
        ceo: values.ceo,
        numOfEmployees: values.numOfEmployees,
        hqLocation: values.hqLocation,
        yearFounded: values.yearFounded,
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
    <FormField v-slot="{ componentField }" name="ceo">
      <FormItem>
        <FormLabel for="ceo">CEO</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="numOfEmployees">
      <FormItem>
        <FormLabel for="numOfEmployees">Number of Employees</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="hqLocation">
      <FormItem>
        <FormLabel for="hqLocation">HQ Location</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="yearFounded">
      <FormItem>
        <FormLabel for="yearFounded">Year Founded</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-4 w-full" type="submit" :loading="isSubmitting">
      Update
    </Button>
  </form>
</template>
