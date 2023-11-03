<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Mirador from 'mirador/dist/es/src/index.js'
// interface iProps {
//   msg: string
// }
//
// defineProps<iProps>()

const iiif = ref(
  'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e',
)

let viewer

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

function reloadIiif(event) {
  if (event) {
    config.windows = [
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
    ]
    viewer = Mirador.viewer(config, [])
    //let action = Mirador.actions.setCanvas('test1', 'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json')
    // let action = Mirador.action.updateWindow('mirador-viewer',{})
    // viewer.store.dispatch(action);
  }
}

onMounted(() => {
  viewer = Mirador.viewer(config, [])
})
</script>

<template>
  <input
    v-model="iiif"
    placeholder="url to iiif manifest"
    @change="(event) => reloadIiif(event)" />
  <div id="mirador-viewer" />
</template>

<style scoped>
#mirador-viewer {
  display: block;
  width: 90%;
  height: 600px;
  margin: 1em 5%;
  position: relative;
}
input {
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
