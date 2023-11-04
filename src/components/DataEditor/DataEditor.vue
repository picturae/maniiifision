<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'
import { ref } from 'vue'

const manifestStore = useManifest()

// const items = ref([])
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const items = ref(manifestStore.getItems)
const imageData = ref([])
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const terms = ref([])
const newManifestUrl = ref('')

function renderImage(item: any) {
  let width = imageData.value[0]
  let height = imageData.value[1]

  //x,y,w,h
  let x = Math.round(item.boundingPoly.normalizedVertices[0].x * width)
  let y = Math.round(item.boundingPoly.normalizedVertices[0].y * height)
  let w = Math.round(item.boundingPoly.normalizedVertices[2].x * width) - x
  let h = Math.round(item.boundingPoly.normalizedVertices[2].y * height) - y

  let coords = x + ',' + y + ',' + w + ',' + h

  item.coords = coords

  return manifestStore.getCurrentImage() + '/' + coords + '/max/0/default.jpg'
}

// function test() {
//   console.log(manifestStore.getCurrentImage);
// }

function getResult() {
  manifestStore.resetItems()
  manifestStore.resetTerms()
  let url =
    'https://nijdam.nu/maniiifision-api/?imageUrl=' +
    manifestStore.getCurrentImage() +
    '/full/max/0/default.jpg'
  //console.log(url)
  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        manifestStore.updateItems(data.responses[0].localizedObjectAnnotations)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.imageData = data.imageData
        // NOTE: will stuff break if removed? Feels like writing to this. in a => function is useless

        data.responses[0].localizedObjectAnnotations.forEach((item: any) => {
          fetchTerms(item.name_nl)
        })
      })
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function saveAnnotations() {
  let target = manifestStore.manifest.items[0].id + '#xywh='

  if (!manifestStore.manifest.items[0].annotations) {
    manifestStore.manifest.items[0].annotations = [
      {
        id: 'annot1',
        type: 'AnnotationPage',
        items: [],
      },
    ]
  }

  manifestStore.getItems.forEach((item: any, index: number) => {
    console.log(item)
    if (
      manifestStore.manifest &&
      manifestStore.manifest.items &&
      manifestStore.manifest.items[0] &&
      manifestStore.manifest.items[0].annotations &&
      manifestStore.manifest.items[0].annotations[0] &&
      manifestStore.manifest.items[0].annotations[0].items
    ) {
      let value = ''
      manifestStore.getTerms[item.name_nl].forEach((item: any) => {
        if (item.selected) {
          value += item.prefLabel[0] + '|' + item.uri + ','
        }
      })

      if (value == '') {
        value = item.name_nl
      }

      manifestStore.manifest.items[0].annotations[0].items.push({
        id: 'annotation' + index,
        type: 'Annotation',
        motivation: 'commenting',
        body: {
          type: 'TextualBody',
          language: 'nl',
          format: 'text/plain',
          value: value,
        },
        target: target + item.coords,
      })
    } else {
      console.warn('Something went wrong with the manifest')
    }

    //console.log(item);
    //console.log(index);
  })

  fetch('https://nijdam.nu/maniiifision-api/manifests/save.php', {
    method: 'POST',
    body: JSON.stringify(manifestStore.manifest),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // console.log(data)
      newManifestUrl.value = data.url
    })

  //console.log(JSON.stringify( manifestStore.manifest))
}

async function fetchTerms(name: string) {
  return await fetch(
    'https://termennetwerk-api.netwerkdigitaalerfgoed.nl/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query Terms {
          terms(
            sources: [
              "https://data.beeldengeluid.nl/id/datadownload/0031",
              "http://vocab.getty.edu/aat/sparql",
            ]
            query: "${name}"
            queryMode: OPTIMIZED
          ) {
            source {
              name
            }
            result {
              __typename
              ... on Terms {
                terms {
                  uri
                  prefLabel
                  altLabel
                }
              }
              ... on Error {
                message
              }
            }
          }
        }
      `,
        variables: {
          name: name,
        },
      }),
    },
  )
    .then((res) => res.json())
    .then((result) => {
      manifestStore.addTerm(
        name,
        result.data.terms
          .flatMap((element: any) => element.result.terms)
          .slice(0, 5),
      )
    })
}
</script>

<template>
  <Container>
    <div class="go">
      <input type="button" value="GO" @click="getResult()" />
      <h2>Image Recognition</h2>
    </div>
    <ul class="clean-ul-lvl1">
      <li
        v-for="(item, index) in manifestStore.getItems"
        :key="`${item}-${index}`">
        <img class="img_small" :src="renderImage(item)" />
        <div>
          <span>
            {{ item.name_nl }}
            <input type="text" />
          </span>
          <ul class="clean-ul-lvl2">
            <li
              v-for="term in manifestStore.getTerms[item.name_nl]"
              :key="term">
              <label class="checkbox-line">
                <input
                  type="checkbox"
                  @click="
                    () => {
                      term.selected = true
                    }
                  " />
                <span class="checkmark"></span>
                <div>
                  {{ term.uri }} - {{ term.prefLabel[0] }} - {{ term.altLabel }}
                </div>
              </label>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="go">
      <input
        type="button"
        value="Save Annotations to new IIIF manifest"
        @click="saveAnnotations()" />
      {{ newManifestUrl }}
    </div>
  </Container>
</template>

<style scoped lang="scss">
@import './DataEditor.scss';
</style>
