<template>
<v-app>
  <Header />

  <v-main class="bg-purple-100">
    <router-view></router-view>
  </v-main>

  <Footer />
</v-app>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AppLayout',
  components: {
    Header,
    Footer,
  },
};
</script>
