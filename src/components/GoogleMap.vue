<template>
  <div class="map">
    <div id="map"></div>
    <vue-slider
      v-model="datePick"
      :marks="true"
    />
    <form @submit.prevent>
      <b-field label="Дата начала">
        <b-datepicker
          placeholder="Нажмите чтобы выбрать начальную дату"
          :max-date="dateRange.end"
          v-model="dateRange.start">
        </b-datepicker>
      </b-field>
      <b-field label="Дата окончания">
        <b-datepicker
          placeholder="Нажмите чтобы выбрать конечную дату дату"
          :min-date="dateRange.start"
          :max-date="dateRange.today"
          v-model="dateRange.end">
        </b-datepicker>
      </b-field>
      <b-field label="Симптомы">
        <b-taglist>
          <b-tag v-for="(tag, index) in tagsSymptoms"
                 :key="index"
                 type="is-info"
                 closable
                 @close="removeTag(tag)">
            {{ tag.name }}
          </b-tag>
        </b-taglist>
      </b-field>
      <b-field>
        <b-autocomplete
          placeholder="Выберите симптомы"
          :open-on-focus="true"
          :data="filterSymptoms"
          field="name"
          @select="selectTag">
        </b-autocomplete>
      </b-field>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'GoogleMap',
    components: {

    },
    data () {
      return {
        regions: [],
        chooseRegion: null,
        map: null,
        dateRange: {
          today: new Date(),
          start: new Date(),
          end: new Date()
        },
        datePick: null,
        tagsSymptoms: [],
        symptoms: []
      }
    },
    methods: {
      getLatLng () {
        return new google.maps.LatLng(59.93, 30.32)
      },
      addCircle (data) {
        let circleOption = {
          strokeColor: "hsl(348, 100%, 61%)",
          strokeOpacity: 1,
          strokeWeight: 1,
          clickable: true,
          fillOpacity: .2,
          map: this.map,
          center: this.getLatLng(),
          radius: data.radius
        }

        let cityCircle = new google.maps.Circle(circleOption)

        google.maps.event.addListener(cityCircle, 'click', (ev) => {
          this.map.setCenter(cityCircle.center)
        });
      },
      removeTag (tag) {
        this.tagsSymptoms.splice( this.tagsSymptoms.indexOf(tag), 1)
      },
      selectTag (option) {
        if (!option) {
          return
        }
        this.tagsSymptoms.push(option)
      }
    },
    computed: {
      filterSymptoms () {
        return this.symptoms.filter((item) => {
          return this.tagsSymptoms.indexOf(item) < 0
        })
      }
    },
    mounted () {
      const element = document.getElementById('map')
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(59.93, 30.32)
      }
      this.map = new google.maps.Map(element, options)

      this.addCircle({radius: 2000})
    },
    created () {
      axios.get('http://kaktusv6.beget.tech/symptoms.php')
      .then((data) => {
        this.symptoms = data.data
      })
    }
  }
</script>

<style scoped lang="scss">
  #map {
    width: 100%;
    height: 500px;
    margin-bottom: 100px;
  }
</style>