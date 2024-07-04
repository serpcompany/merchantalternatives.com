<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { AlertCircleIcon, CheckCircleIcon, FlameIcon } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import { z } from "zod";

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();

  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email(t("newsletter.hints.error.input")),
    }),
  );

  const isSubmitSuccessful = ref(false);

  const { defineField, handleSubmit, isSubmitting, errors, setFieldError } =
    useForm({
      validationSchema: formSchema,
      initialValues: {
        email: "",
      },
    });

  const email = defineField("email");

  const onSubmit = handleSubmit(
    async (values) => {
      try {
        const emailSent = await apiCaller.newsletter.signup.mutate({
          email: values.email,
        });
        if (!emailSent) {
          throw new Error("Email not sent");
        }

        isSubmitSuccessful.value = true;
      } catch (error) {
        isSubmitSuccessful.value = false;
        setFieldError("email", t("newsletter.hints.error.submission"));
      }
    },
    () => {
      isSubmitSuccessful.value = false;
    },
  );
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="mb-12 text-center">
        <FlameIcon class="text-primary mx-auto size-12" />
        <h1 class="mt-10 text-3xl font-bold lg:text-4xl">
          Keep up with the latest trends
        </h1>
        <p class="mt-3 text-lg opacity-70">
          Join thousands in getting the hottest in the payments industry to your
          inbox.
        </p>
      </div>

      <div class="mx-auto max-w-lg">
        <Alert v-if="isSubmitSuccessful === true" variant="success">
          <CheckCircleIcon class="size-4" />
          <AlertTitle>{{ $t("newsletter.hints.success.title") }}</AlertTitle>
          <AlertDescription>{{
            $t("newsletter.hints.success.message")
          }}</AlertDescription>
        </Alert>

        <template v-else>
          <form @submit.prevent="onSubmit" class="flex items-start">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="w-full">
                <FormLabel for="email" class="sr-only">CEO</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="email"
                    required
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button
              type="submit"
              class="ml-4 mt-2 flex-none"
              :loading="isSubmitting"
            >
              {{ $t("newsletter.submit") }}
            </Button>
          </form>

          <Alert v-if="errors.email" variant="error" class="mt-6 text-sm">
            <AlertCircleIcon class="size-4" />
            <AlertTitle>{{ $t("newsletter.hints.error.title") }}</AlertTitle>
            <AlertDescription>{{ errors.email }}</AlertDescription>
          </Alert>
        </template>
      </div>
    </div>
  </section>
</template>
