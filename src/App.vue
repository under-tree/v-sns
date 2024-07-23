<script setup>
import Test from './components/Test.vue'
</script>

<template>
  <!-- <Test /> -->
  <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
  <router-view></router-view>
</template>

<style scoped>
</style>
