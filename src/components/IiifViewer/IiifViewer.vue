<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Mirador from 'mirador/dist/es/src/index.js'
import { useManifest } from '../../stores/manifest.store'
import { Container } from '../Container/'

// interface iProps {
//   msg: string
// }
//
// defineProps<iProps>()

const manifestStore = useManifest()
const { getIiifUrl: iiif } = storeToRefs(manifestStore)

// const iiif = ref(
//   'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e',
// )

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let viewer

// function getCurrentImage() {
//   return
// }

const update = () => {
  const config = {
    // annotation: {
    //   adapter: canvasId => new AnnotationsAdapter(canvasId)
    // },
    id: 'mirador-viewer',
    requests: {
      preprocessors: [],
    },
    // All settings can be found here: https://github.com/ProjectMirador/mirador/blob/master/src/config/settings.js
    windows: [
      {
        allowClose: false,
        allowFullscreen: true,
        allowMaximize: false,
        allowTopMenuButton: false,
        imageToolsEnabled: true,
        imageToolsOpen: false,
        thumbnailNavigationPosition: 'far-bottom',
        id: 'test1',
        loadedManifest: iiif.value,
      },
    ],
    // osdConfig: {
    //   loadTilesWithAjax: true,
    //   ajaxHeaders: {
    //     Authorization: 'Bearer ' + this.getToken()
    //   }
    // },
    workspaceControlPanel: {
      enabled: true,
    },
    typography: {
      useNextVariants: true, // set so that console deprecation warning is removed
    },
  }

  viewer = Mirador.viewer(config, [])
}

onMounted(() => {
  update()
})
watch([iiif], update)
</script>

<template>
  <Container>
    <div id="mirador-viewer" />
  </Container>
</template>

<style scoped lang="scss">
@import './IiifViewer.scss';
</style>
