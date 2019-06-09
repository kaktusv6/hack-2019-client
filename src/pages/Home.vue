<template>
  <div class="home">
    <div class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="map" v-if="!isLoad">
            <GoogleMap :regions="dataSet" :date="date"></GoogleMap>
          </div>
          <Form v-if="!isLoad" :symptoms="symptoms" @data-set="getDataSet" @change-date="changeDate"></Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleMap from '../components/GoogleMap'
  import Form from '../components/Form'
  import axios from 'axios'
  import colorspace from 'colorspace'

  export default {
    name: 'Home',
    components: {
      GoogleMap,
      Form
    },
    data () {
      return {
        isLoad: false,
        regions: {},
        date: '',
        dataSet: [],
        symptoms: []
      }
    },
    methods: {
      async getSymptoms () {
        await axios.get('http://kaktusv6.beget.tech/symptoms.php').then((data) => {
          this.symptoms = data.data
          this.symptoms.forEach((symptom) => {
            symptom.color = colorspace('color:space')
          })
        })
      },
      getDataSet (data) {
        this.dataSet = data
        this.isLoad = false
      },
      changeDate (date) {
        this.date = date
        let mapComponent = this.$children.find(child => { return child.$options.name === "GoogleMap" })
        mapComponent.addCircles()
      }
    },
    created () {
      this.getSymptoms()
    }
  }
</script>

<style scoped>

</style>