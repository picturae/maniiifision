<script setup lang="ts">
import { Container } from '../Container/'
import { useManifest } from '../../stores/manifest.store'
import { ref } from 'vue'

const manifestStore = useManifest()

// const results = [
//   {
//     name: 'dog',
//     terms: ['term-A', 'term-B'],
//   },
//   {
//     name: 'cat',
//     terms: ['term-C', 'term-D'],
//   },
//   {
//     name: 'bird',
//     terms: ['term-E', 'term-F'],
//   },
// ]


// const items = ref([])
const items = ref(manifestStore.getItems)
const imageData = ref([])
const newManifestUrl = ref('')

function renderImage(item) {

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

function getResult()
{
  let url = 'https://nijdam.nu/maniiifision-api/?imageUrl=' + manifestStore.getCurrentImage() + '/full/max/0/default.jpg'
  //console.log(url)
  fetch(url).then(response => {
      response.json().then(data => {
        manifestStore.updateItems(data.responses[0].localizedObjectAnnotations)
        this.imageData = data.imageData
      })
  })
  .catch(error => {
      console.error('Error:', error);
  })
}

function saveAnnotations()
{

  let target = manifestStore.manifest.items[0].id + '#xywh='

  if(!manifestStore.manifest.items[0].annotations){
     manifestStore.manifest.items[0].annotations=[{
       id: "annot1",
       type: "AnnotationPage",
       items: []
     }]
  }

  manifestStore.getItems.forEach((item, index) => {
    console.log(item);
    manifestStore.manifest.items[0].annotations[0].items.push({
      "id": "annotation" + index,
      "type": "Annotation",
      "motivation": "commenting",
      "body": {
        "type": "TextualBody",
        "language": "nl",
        "format": "text/plain",
        "value": item.name_nl
      },
      "target": target + item.coords
    })
    //console.log(item);
    //console.log(index);
  });

  fetch('https://nijdam.nu/maniiifision-api/manifests/save.php', {
    method: 'POST',
    body: JSON.stringify(manifestStore.manifest),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
      .then(function(response){
        return response.json()})
      .then(function(data)
      {
        console.log(data)
        newManifestUrl.value = data.url;
      })


  console.log(JSON.stringify( manifestStore.manifest))
}

</script>

<template>
  <Container>
    <div class="go">
      <h2>Image Recognition</h2>
      <input type="button" value="GO" @click="getResult()" />
    </div>
    <ul>
      <li class="bbox" v-for="item in manifestStore.getItems">
        <img class="img_small" :src=renderImage(item) /> {{ item.name_nl }}
        <input type="text">
      </li>
    </ul>

<!--    <ul class="clean-ul-lvl1">-->
<!--      <li v-for="result in results" :key="result.name">-->
<!--        <label class="checkbox-line">-->
<!--          <input type="checkbox" />-->
<!--          <span class="checkmark"></span>-->
<!--          {{ result.name }}-->
<!--        </label>-->
<!--        <ul v-if="result.terms.length > 0" class="clean-ul-lvl2">-->
<!--          <li v-for="term in result.terms" :key="term">-->
<!--            <label class="checkbox-line">-->
<!--              <input type="checkbox" />-->
<!--              <span class="checkmark"></span>-->
<!--              {{ term }}-->
<!--            </label>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </li>-->
<!--    </ul>-->
    <div class="go">
       <input type="button" value="Save Annotations to new IIIF manifest" @click="saveAnnotations()" />
       {{ newManifestUrl }}
    </div>
  </Container>
</template>

<style scoped lang="scss">
@import './DataEditor.scss';
</style>
