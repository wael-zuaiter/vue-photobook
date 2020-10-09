<template>
<v-footer padless class="text-center white--text deep-purple accent-6 v-sheet">
  <v-col cols="10">
    {{ new Date().getFullYear() }} — <strong>Photo Album</strong>
  </v-col>
  <v-col cols="2">
    <amplify-sign-out></amplify-sign-out>
  </v-col>
</v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>

</style>
