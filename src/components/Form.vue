<template>
  <div class="form">
    <b-field class="slider-range" label="Выберите дату">
      <vue-slider
        v-model="datePick"
        :data="dates"
        :included="true"
        @change="changeDate"
      />
    </b-field>
    <form @submit.prevent>
      <b-field label="Дата начала">
        <b-datepicker
          placeholder="Нажмите чтобы выбрать начальную дату"
          :max-date="dateRange.end"
          v-model="dateRange.start"
          :date-formatter="formateDate">
        </b-datepicker>
      </b-field>
      <b-field label="Дата окончания">
        <b-datepicker
          placeholder="Нажмите чтобы выбрать конечную дату дату"
          :min-date="dateRange.start"
          :max-date="dateRange.today"
          v-model="dateRange.end"
          :date-formatter="formateDate">
        </b-datepicker>
      </b-field>
      <b-field label="Симптомы">
        <b-taglist>
          <b-tag v-for="(tag, index) in selectedSymptoms"
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
      <b-button type="is-info" :loading="isSubmitForm" @click="submitForm()">Получить данные</b-button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: {
      symptoms: {
        type: Array,
        default: () => []
      }
    },
    name: 'Form',
    data () {
      return {
        isSubmitForm: false,
        dates: [],
        dateRange: {
          today: new Date(),
          start: new Date(2019, 1, 5),
          end: new Date(2019, 5, 4)
        },
        datePick: null,
        selectedSymptoms: []
      }
    },
    methods: {
      changeDate (val) {
        this.$emit('change-date', val)
      },
      removeTag (tag) {
        this.selectedSymptoms.splice(this.selectedSymptoms.indexOf(tag), 1)
      },
      selectTag (option) {
        if (!option) {
          return
        }
        this.selectedSymptoms.push(option)
      },
      formateDate (date) {
        let d = new Date(date);
        let values = [ d.getDate(), d.getMonth() + 1]
        values.forEach((valueDate, i) => {
          values[i] = values[i].toString().replace( /^([0-9])$/, '0$1' );
        })

        return d.getFullYear() + '-' + values[1] + '-' + values[0]
      },
      submitForm () {
        this.isSubmitForm = true;
        let symptoms = []
        this.selectedSymptoms.forEach((symptom) => {
          symptoms.push(symptom.name)
        })
        axios.get('http://kaktusv6.beget.tech/interest.php', {
          params: {
            date_start: this.formateDate(this.dateRange.start),
            date_end: this.formateDate(this.dateRange.end),
            symptoms: symptoms
          }
        }).then((data) => {
          this.$emit('data-set', data.data)
          data.data.forEach((item) => {
            let date = item.date
            if (this.dates.indexOf(date) < 0) {
              this.dates.push(date)
            }
          })
          this.$emit('change-date', this.dates[this.dates.length - 1])
          this.isSubmitForm = false;
        })
      }
    },
    computed: {
      filterSymptoms () {
        return this.symptoms.filter((item) => {
          return this.selectedSymptoms.indexOf(item) < 0
        })
      }
    },
  }
</script>

<style scoped>

</style>