<script setup lang="ts">
import { Mirador } from './components/Mirador'
import { GetManifest } from './components/GetManifest'
import { HelloWorld } from './components/HelloWorld'
import { IiifViewer } from './components/IiifViewer'
</script>

<template>
  <main>
    <GetManifest />
    <Mirador />
    <IiifViewer />
    <HelloWorld msg="Vite + Vue" />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
