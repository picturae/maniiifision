<script setup lang="ts">
import { onMounted } from 'vue'
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'
import axios from 'axios'
import { Manifest } from '@iiif/presentation-3'

const manifestStore = useManifest()

const loadIIIF = async (value: string) => {
  manifestStore.setIiifUrl(value)
  const manifest = await getManifest(value)
  console.log(manifest)
  manifestStore.setManifestJson(manifest)
  manifestStore.setManifest(manifest as Manifest)
}

const updateIiif = async (event: Event) => {
  const value = (event.target as any).value
  if (event) {
    console.log('comp updated: ', value)
    if (value) {
      loadIIIF(value)
    }
  }
  manifestStore.updateItems([])
}

const getManifest = async (url: string) => {
  return axios
    .get(url)
    .then(function (response: any) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

const defaultUrl = 'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e'

onMounted(() => {
  loadIIIF(defaultUrl)
})

</script>

<template>
  Example manifests:<br/>
  https://nijdam.nu/maniiifision-api/manifests/manifest.php<br/>
  https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e<br/>
  https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json<br/>
  <Container>
    <!-- type url had native URL checking -->
    <input placeholder="url to iiif manifest" type="url" @input="updateIiif" :value="defaultUrl"/>
  </Container>
</template>

<style scoped lang="scss">
@import './GetManifest.scss';
</style>
