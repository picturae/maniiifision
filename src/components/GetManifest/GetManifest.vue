<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
      await loadIIIF(value)
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

const iiif = ref(
  'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e',
)

onMounted(() => {
  loadIIIF(iiif.value)
})

watch([iiif], ([iiif]) => {
  loadIIIF(iiif)
})
</script>

<template>
  <Container>
    <article>
      Example manifests:
      <div>
        <input
          type="button"
          value="Load: "
          @click="
            () =>
              (iiif =
                'https://nijdam.nu/maniiifision-api/manifests/manifest.php')
          " />
        https://nijdam.nu/maniiifision-api/manifests/manifest.php
      </div>
      <div>
        <input
          type="button"
          value="Load: "
          @click="
            () =>
              (iiif =
                'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e')
          " />
        https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e
      </div>
      <div>
        <input
          type="button"
          value="Load: "
          @click="
            () =>
              (iiif =
                'https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json')
          " />
        https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json
      </div>
    </article>
    <!-- type url had native URL checking -->
    <input
      placeholder="url to iiif manifest"
      type="url"
      :value="iiif"
      @input="updateIiif" />
  </Container>
</template>

<style scoped lang="scss">
@import './GetManifest.scss';
</style>
