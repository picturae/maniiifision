<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'

const image =
  'https://www.iesa.edu/sites/default/files/cultural-heritage-management.jpg'

const backend = 'https://nijdam.nu/maniiifision-api/?imageUrl='

const results = [
  {
    name: 'dog',
    terms: ['term-A', 'term-B'],
  },
  {
    name: 'cat',
    terms: ['term-C', 'term-D'],
  },
  {
    name: 'bird',
    terms: ['term-E', 'term-F'],
  },
]

const manifestStore = useManifest()

function test() {
  console.log(manifestStore.getCurrentImage)
}

async function performImageRecognition(event) {
  const response = await fetch(backend + image)
  const responses = await response.json()
  console.log(responses.responses[0].localizedObjectAnnotations)
  responses.responses[0].localizedObjectAnnotations.forEach((element) => {
    console.log(element)
  })
}
</script>

<template>
  <Container>
    <div class="go">
      <h2>Image Recognition</h2>
      <input @click="test" type="button" value="test" />
      <input @click="performImageRecognition" type="button" value="performImageRecognition" />
    </div>
    <ul class="clean-ul-lvl1">
      <li v-for="result in results" :key="result.name">
        <label class="checkbox-line">
          <input type="checkbox" />
          <span class="checkmark"></span>
          {{ result.name }}
        </label>
        <ul v-if="result.terms.length > 0" class="clean-ul-lvl2">
          <li v-for="term in result.terms" :key="term">
            <label class="checkbox-line">
              <input type="checkbox" />
              <span class="checkmark"></span>
              {{ term }}
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </Container>
</template>

<style scoped lang="scss">
@import './DataEditor.scss';
</style>
