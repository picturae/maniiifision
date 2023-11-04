import { defineStore } from 'pinia'
import { Manifest } from '@iiif/presentation-3'
import { OSDReferences } from 'mirador/dist/es/src/plugins/OSDReferences';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
//
// export const useCounterStore = defineStore('counter', {
//   state: () => ({ count: 0, name: 'Eduardo' }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

export const useManifest = defineStore('manifest', {
  state: () => ({
    iiifUrl: 'https://athenaeumcollecties.nl/collecties/gedigitaliseerde-collecties/manifest/0b266318-3487-11e6-b89c-23313efd728e',
    manifest: {} as Manifest, // the original one we pulled from the link
    newManifest: {} as Manifest, // the one we provide to download
  }),
  actions: {
    setIiifUrl(url: string) {
      console.log('update store w/', url)
      this.iiifUrl = url
      console.log('updated store w/', this.iiifUrl)
    },
    setManifest(manifest: Manifest) {
      this.manifest = manifest
    },
    updateManifest(manifest: Manifest) {
      this.newManifest = manifest
    }
  },
  getters: {
    getIiifUrl(): string {
      return this.iiifUrl
    },
    getManifest(): Manifest {
      return this.newManifest
    },
    resetManifest(): Manifest {
      this.newManifest = this.manifest

      return this.newManifest
    },
    getCurrentImage(): string {
      //@todo get current clicked image
      return OSDReferences.get('test1').current.world.getItemAt(0).source["@id"]
    }
  },
})
