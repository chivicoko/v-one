<template>
  <div class="min-h-screen relative">
    <RouterView />
  </div>
</template>

<script setup lang="ts">  
  // Using RouterView to load the component associated with the current route dynamically
  import { RouterView } from "vue-router";
</script>
