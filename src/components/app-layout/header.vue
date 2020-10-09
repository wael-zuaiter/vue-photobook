<template>
<v-app-bar app>
  <v-tabs background-color="deep-purple accent-6" centered dark icons-and-text>
    <v-tabs-slider></v-tabs-slider>

    <v-tab to="/">
      Home
      <v-icon>mdi-home</v-icon>
    </v-tab>

    <v-tab to="/albums">
      Albums
      <v-icon>mdi-album</v-icon>
    </v-tab>

    <v-tab to="/about">
      About
      <v-icon>mdi-account-box</v-icon>
    </v-tab>
  </v-tabs>
</v-app-bar>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>

</style>
