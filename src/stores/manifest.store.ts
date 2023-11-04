import { defineStore } from 'pinia'
import { Manifest } from '@iiif/presentation-3'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { OSDReferences } from 'mirador/dist/es/src/plugins/OSDReferences'

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
    iiifUrl: 'https://nijdam.nu/maniiifision-api/manifests/manifest.php',
    manifestJson: {},
    manifest: {} as Manifest, // the original one we pulled from the link
    newManifest: {} as Manifest, // the one we provide to download
    items: {},
    terms: [] as any[],
  }),
  actions: {
    setIiifUrl(url: string) {
      console.log('update store w/', url)
      this.iiifUrl = url
      console.log('updated store w/', this.iiifUrl)
    },
    setManifestJson(manifest: any) {
      console.log('setManifestJson')
      this.manifestJson = manifest
    },
    setManifest(manifest: Manifest) {
      console.log('setManifest')
      this.manifest = manifest
    },
    updateManifest(manifest: Manifest) {
      this.newManifest = manifest
    },
    getCurrentImage(): string {
      //@todo get current clicked image
      return OSDReferences.get('test1').current.world.getItemAt(0).source['@id']
    },
    updateItems(items: any) {
      this.items = items
    },
    setTerms(terms: any) {
      this.terms = terms
    },
    addTerm(term: any) {
      this.terms.push(term)
    },
  },
  getters: {
    getIiifUrl(): string {
      return this.iiifUrl
    },
    getManifestJson(): any {
      return this.manifestJson
    },
    getManifest(): Manifest {
      return this.newManifest
    },
    getItems(): any {
      return this.items
    },
    getTerms(): any[] {
      return this.terms
    },
    resetManifest(): Manifest {
      this.newManifest = this.manifest

      return this.newManifest
    },
  },
})
