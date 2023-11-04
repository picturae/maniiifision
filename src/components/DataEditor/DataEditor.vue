<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'

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
  console.log(manifestStore.getCurrentImage);
}

</script>

<template>
  <Container>
    <div class="go">
      <h2>Image Recognition</h2>
      <input type="button" value="GO" @click="test()"/>
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
