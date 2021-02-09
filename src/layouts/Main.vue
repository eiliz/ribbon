<template>
  <div>
    <app-header></app-header>
    <router-view class="xl:container mx-auto" />
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
