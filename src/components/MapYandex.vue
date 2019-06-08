<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>

  export default {
    name: 'MapYandex',
    components: {

    },
    data () {
      return {
        yandexMap: null,
        regions: []
      }
    },
    methods: {
      // initHandler () {
      //   console.log(1);
      //   this.yandexMap = new ymaps.Map('map', {
      //     center: [65, 100],
      //     zoom: 2,
      //     type: null,
      //     controls: ['zoomControl']
      //   }, {
      //     restrictMapArea: [[10, 10], [85,-160]]
      //   })
      //
      //   let pane = new ymaps.pane.StaticPane(this.yandexMap, {
      //     zIndex: 100, css: {
      //       width: '100%', height: '100%', backgroundColor: '#ffffff'
      //     }
      //   });
      //
      //   this.yandexMap.panes.append('white', pane);
      //
      //   ymaps.borders.load('RU', {
      //     lang: 'ru',
      //     quality: 0
      //   })
      //   .then((result) => {
      //     result.features.forEach((feature) => {
      //       let region = new ymaps.GeoObject(feature);
      //       this.yandexMap.geoObjects.add(region);
      //     });
      //   })
      // },
    },
    // async created () {
    //   ymaps.ready(this.initHandler)
    // }
  }
</script>

<style scoped>
#map {
  width: 100%;
  height: 1000px;
}
</style>