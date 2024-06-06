<script setup lang="ts">
  const authorised = ref(false);
  const password = ref("");

  const checkPassword = () => {
    if (password.value === "4321") {
      authorised.value = true;
    }
  };
</script>

<template>
  <div>
    <div v-if="!authorised" class="flex h-screen items-center justify-center">
      <form @submit.prevent="checkPassword">
        <Input
          type="password"
          v-model="password"
          placeholder="Enter password"
          class="w-full"
        />
        <Button type="submit" class="mt-4 w-full"> Submit </Button>
      </form>
    </div>
    <div v-else>
      <NavBar />
      <main class="min-h-screen pt-20">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>
