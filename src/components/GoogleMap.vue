<template>
    <div class="map">
        <div id="map"></div>
        <div id="legend" ref="legend" v-if="symptoms.length > 0">
            <div class="legend-item" v-for="(symptom, index) in symptoms" :key="index">
                <div class="color" :style="{ 'background-color': colorsSymptoms[index] }"></div>
                <div class="name">{{ symptom }}</div>
            </div>
        </div>
    </div>
</template>

<script>

  import randomColor from 'random-color'

  export default {
    name: 'GoogleMap',
    props: {
      regions: Array,
      date: String
    },
    data () {
      return {
        map: null,
        geocoder: null,
        circles: [],
        symptoms: [],
        colorsSymptoms: []
      }
    },
    methods: {
      addCircle (data) {
        let regionCircleOption = {
          strokeColor: this.colorsSymptoms[this.symptoms.indexOf(data.symptom)],
          strokeOpacity: 1,
          strokeWeight: 2,
          clickable: true,
          fillOpacity: .1,
          map: this.map,
          center: { lat: parseFloat(data.lat), lng: parseFloat(data.lng) },
          radius: parseInt(data.fact_interest) * 20000
        }

        let circle = new google.maps.Circle(regionCircleOption)

        google.maps.event.addListener(circle, 'click', () => {
          this.map.setCenter(circle.center)
        })

        return circle
      },
      addCircles () {
        this.circles.forEach((circle) => {
          circle.setMap(null)
        })
        this.circles = []

        for (let i in this.regions) {
          let data = this.regions[i]
          if (data.date === this.date) {
            this.circles.push(this.addCircle(data, data.key))
          }
        }
      },
        initSymptoms () {
            for (let i in this.regions) {
                let region = this.regions[i]
                if (this.symptoms.indexOf(region.symptom) < 0) {
                    this.symptoms.push(region.symptom)
                    let color = randomColor()
                    this.colorsSymptoms.push(color.hexString())
                }
            }
        }
    },
    mounted () {
      const element = document.getElementById('map')
      const options = {
        zoom: 5,
        center: new google.maps.LatLng(43.473067, 132.509538)
      }
      this.map = new google.maps.Map(element, options)
    }
  }
</script>

<style scoped lang="scss">
  #map {
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
  }

  .slider-range {
    margin-bottom: 50px !important;
  }

  #legend {
      width: 200px;
      display: flex;
      flex-direction: column;
      padding: 15px;
      margin-bottom: 50px;
      background-color: #fff;
      border: 1px solid lightgrey;
  }
    .legend-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .color {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .name {
        font-size: 12px;
    }
</style>