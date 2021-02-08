<template>
  <div>
    <app-header></app-header>
    <router-view class="xl:container mx-auto py-8" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader
  }
};
</script>
