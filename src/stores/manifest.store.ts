import { defineStore } from 'pinia'

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
    iiifUrl: '',
    manifest: {}, // the original one we pulled from the link
    newManifest: {}, // the one we provide to download
  }),
  actions: {
    setIiifUrl(url: string) {
      this.iiifUrl = url
    },
    setManifest(manifest: any) {
      this.manifest = manifest
    },
    updateManifest(manifest: any) {
      this.newManifest = manifest
    },
  },
  getters: {
    getManifest(): any {
      return this.newManifest
    },
    resetManifest(): any {
      this.newManifest = this.manifest

      return this.newManifest
    },
  },
})
