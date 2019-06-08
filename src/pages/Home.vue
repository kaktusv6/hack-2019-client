<template>
  <div class="home">
    <div class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <GoogleMap></GoogleMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleMap from '../components/GoogleMap';
  export default {
    name: 'Home',
    components: {
      GoogleMap

    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>