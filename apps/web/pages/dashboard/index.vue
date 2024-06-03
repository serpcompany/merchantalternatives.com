<script setup lang="ts">
  const { t } = useTranslations();
  const { user } = useUser();

  definePageMeta({ layout: "dashboard" });
</script>

<template>
  <SaasPage
    :heading="'Welcome ' + user?.name || ''"
    subheading="Checkout your latest stats"
  >
    <div class="grid gap-4 lg:grid-cols-3">
      <SaasStatsTile
        title="New clients"
        :value="344"
        valueFormat="number"
        :trend="0.12"
      />
      <SaasStatsTile
        title="Revenue"
        :value="5243"
        valueFormat="currency"
        :trend="0.6"
      />
      <SaasStatsTile
        title="Churn"
        :value="0.03"
        valueFormat="percentage"
        :trend="-0.3"
      />
    </div>

    <Card class="mt-8">
      <div
        class="text-muted-foreground flex h-64 items-center justify-center p-8"
      >
        Place your content here...
      </div>
    </Card>
  </SaasPage>
</template>
