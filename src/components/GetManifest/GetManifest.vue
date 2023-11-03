<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'

const manifestStore = useManifest()

const updateIiif = (event: Event) => {
  const value = (event.target as any).value
  if (event) {
    console.log('comp updated: ', value)
    if (value) {
      manifestStore.setIiifUrl(value)
    }
  }
}
</script>

<template>
  <Container>
    <!-- type url had native URL checking -->
    <input placeholder="url to iiif manifest" type="url" @input="updateIiif" />
  </Container>
</template>

<style scoped lang="scss">
@import './GetManifest.scss';
</style>
