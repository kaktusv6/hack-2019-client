<template>
    <div id="map"></div>
</template>

<script>

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
        symptoms: []
      }
    },
    methods: {
      addCircle (data) {
        let regionCircleOption = {
          strokeColor: "hsl(348, 100%, 61%)",
          strokeOpacity: 1,
          strokeWeight: 1,
          clickable: true,
          fillOpacity: .2,
          map: this.map,
          center: { lat: parseFloat(data.lat), lng: parseFloat(data.lng) },
          radius: parseInt(data.fact_interest) * 10000
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
            let region = this.regions[i]
            if (this.symptoms.indexOf(region.symptom)) {
                
            }
        }
        for (let i in this.regions) {
          let data = this.regions[i]
          if (data.date === this.date) {
            this.circles.push(this.addCircle(data, data.key))
            return;
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
    margin-bottom: 100px;
  }

  .slider-range {
    margin-bottom: 50px !important;
  }
</style>