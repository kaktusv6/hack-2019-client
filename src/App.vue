<template>
  <div id="app">
    <Header/>
<!--    <router-view/>-->
    <Home/>
<!--    <Footer/>-->
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home
  }
}
</script>

<style lang="scss">
  @import '/styles/import';
</style>
