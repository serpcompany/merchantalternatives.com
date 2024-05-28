<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { ArrowLeftIcon, ArrowRightIcon } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import { z } from "zod";
  import Button from "~/modules/ui/components/button/Button.vue";

  const emit = defineEmits<{
    complete: [];
    back: [];
  }>();

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const createBrandMutation = apiCaller.brand.create.useMutation();

  const brandType = ref<"new" | "existing">("new");
  const formSchema = toTypedSchema(
    z.object({
      brandName: z.string().min(1, "Name is required"),
    }),
  );
  const serverError = ref<null | string>(null);

  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      brandName: "",
    },
  });

  const onSubmit = handleSubmit(async ({ brandName }) => {
    serverError.value = null;

    if (brandType.value === "existing") {
      try {
        await createBrandMutation.mutate({
          name: brandName,
        });

        navigateTo("/onboarding/well-be-in-touch");
      } catch (e) {
        serverError.value = "Failed to send brand claim request";
      }
    } else {
      try {
        await createBrandMutation.mutate({
          name: brandName,
        });

        emit("complete");
      } catch (e) {
        serverError.value = t("onboarding.notifications.teamSetupFailed");
      }
    }
  });
</script>

<template>
  <form @submit="onSubmit" class="py-3">
    <div class="mt-3">
      <h3 className="mb-4 text-xl font-bold">Setup Your Brand</h3>
      <Tabs v-model="brandType" class="mt-3">
        <TabsList class="w-full">
          <TabsTrigger value="new" class="flex-1"
            >Create a new brand</TabsTrigger
          >
          <TabsTrigger value="existing" class="flex-1"
            >Claim an existing brand</TabsTrigger
          >
        </TabsList>
      </Tabs>
      <p class="text-muted-foreground mb-6 mt-3 text-sm">
        {{
          brandType === "new"
            ? "Create a new brand to list on Serp.Money"
            : "Claim an existing brand you've spotted in our listings"
        }}
      </p>

      <FormField v-slot="{ componentField }" name="brandName">
        <FormItem>
          <FormLabel for="brandName" required>
            {{ $t("onboarding.team.name") }}
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="company" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="mt-20 flex gap-2">
      <Button
        type="button"
        variant="outline"
        @click="$emit('back')"
        class="flex-1"
      >
        <ArrowLeftIcon class="mr-2 size-4" />
        {{ $t("onboarding.back") }}
      </Button>

      <Button type="submit" :loading="isSubmitting" class="flex-1">
        {{ $t("onboarding.continue") }}
        <ArrowRightIcon class="ml-2 size-4" />
      </Button>
    </div>
  </form>
</template>
