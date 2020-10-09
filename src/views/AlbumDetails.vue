<template>
<v-container>
  <v-row>
    <v-col cols="10">
      <!-- eslint-disable-next-line max-len -->
      <v-file-input @change="onFileChange" label="Upload Photo" filled prepend-icon="mdi-camera" accept="image/*"></v-file-input>
    </v-col>
    <v-col cols="2" class="flex justify-center align-center">
      <v-btn @click.prevent="onCreatePhoto">Upload</v-btn>
    </v-col>
  </v-row>
  <h1 class="text-h4">{{ albumName }} Album</h1>
  <v-row>
    <v-col cols="4" class="shadow-xl mt-4 py-0" v-for="(photo, idx) in photos" :key="idx">
      <!-- eslint-disable-next-line max-len -->
      <amplify-s3-image level="protected" :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"></amplify-s3-image>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  mounted() {
    this.getPhotos();
  },
  data: () => ({
    photos: [],
    albumName: '',
    file: null,
  }),
  methods: {
    onFileChange(file) {
      this.file = file;
    },
    async getPhotos() {
      const album = await this.$store.dispatch('albums/getAlbum', this.id);
      this.photos = album.photos?.items ?? [];
      this.albumName = album.name;
    },
    async onCreatePhoto() {
      const {
        file,
      } = this;

      if (!file) {
        return null;
      }

      try {
        await this.$store.dispatch('albums/createPhoto', {
          file,
          id: this.id,
        });

        this.getPhotos();
        // return Promise.resolve('success');
      } catch (error) {
        console.log(error);
        // return Promise.reject(error);
      }
      return '';
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
amplify-s3-image {
  --width: 100%;
  --height: 100%;
}

img {
  object-fit: cover;
}
</style>
