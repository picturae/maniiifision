<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'
import axios from 'axios'
import { Manifest } from '@iiif/presentation-3'

const manifestStore = useManifest()

const updateIiif = async (event: Event) => {
  const value = (event.target as any).value
  if (event) {
    console.log('comp updated: ', value)
    if (value) {
      manifestStore.setIiifUrl(value)
      const manifest = await getManifest(value)
      console.log(manifest)
      manifestStore.setManifest(manifest)
    }
  }
}

const getManifest = async (url: string) => {
  return axios
    .get(url)
    .then(function (response: any) {
      console.log(response.data)
      return response.data as Manifest
    })
    .catch(function (error) {
      console.log(error)
    })
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
