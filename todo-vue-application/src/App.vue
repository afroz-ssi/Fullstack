<template>
  <!-- <HomeComponent /> -->
  <!-- <SignupComponent />
  <LoginComponent /> -->
  <div class="routes">
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link> -->
  </div>
    <router-view></router-view> 
</template>

<script>
// import HomeComponent from './components/Pages/HomeComponent.vue'
// import SignupComponent from './components/Pages/SignupComponent.vue'
// import LoginComponent from './components/Pages/LoginComponent.vue'



export default {
  name: 'App',
  components: {
    // HomeComponent,
    // SignupComponent,
    // LoginComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
