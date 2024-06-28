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
  const createCompanyMutation = apiCaller.company.create.useMutation();
  const claimCompanyRequest =
    apiCaller.company.claimCompanyRequest.useMutation();

  const companyType = ref<"new" | "existing">("new");
  const formSchema = toTypedSchema(
    z.object({
      companyName: z.string().min(1, "Name is required"),
    }),
  );
  const serverError = ref<null | string>(null);

  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      companyName: "",
    },
  });

  const onSubmit = handleSubmit(async ({ companyName }) => {
    serverError.value = null;

    if (companyType.value === "existing") {
      try {
        await claimCompanyRequest.mutate({
          companyName,
        });

        navigateTo("/onboarding/well-be-in-touch");
      } catch (e) {
        serverError.value = "Failed to send company claim request";
      }
    } else {
      try {
        console.log("Creating company", companyName);
        const company = await createCompanyMutation.mutate({
          name: companyName,
        });
        console.log("id: ", company?.id || "null");

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
      <h3 className="mb-4 text-xl font-bold">Setup Your Company</h3>
      <Tabs v-model="companyType" class="mt-3">
        <TabsList class="w-full">
          <TabsTrigger value="new" class="flex-1"
            >Create a new company</TabsTrigger
          >
          <TabsTrigger value="existing" class="flex-1"
            >Claim an existing company</TabsTrigger
          >
        </TabsList>
      </Tabs>
      <p class="text-muted-foreground mb-6 mt-3 text-sm">
        {{
          companyType === "new"
            ? "Create a new company to list on Merchant Alternatives"
            : "Claim an existing company you've spotted in our listings"
        }}
      </p>

      <FormField v-slot="{ componentField }" name="companyName">
        <FormItem>
          <FormLabel for="companyName" required> Company name </FormLabel>
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
