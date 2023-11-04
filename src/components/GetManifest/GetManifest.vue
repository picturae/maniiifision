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
      manifestStore.setManifest(manifest)
    }
  }
}

const getManifest = async (url: string) => {
  return axios
    .get(url)
    .then(function (response: any) {
      return response.data as Manifest
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  Example manifests:<br/>
  https://nijdam.nu/maniiifision-api/manifests/manifest.php<br/>
  https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e<br/>
  <Container>
    <!-- type url had native URL checking -->
    <input placeholder="url to iiif manifest" type="url" @input="updateIiif" />
  </Container>
</template>

<style scoped lang="scss">
@import './GetManifest.scss';
</style>
