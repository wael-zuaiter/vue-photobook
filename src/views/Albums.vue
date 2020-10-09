<template>
<v-container>
  <v-form @submit.prevent="createAlbum" class="mt-10">
    <h4 class="text-h5 mb-3">Create Album</h4>
    <v-text-field label="Create New Album" @change="setAlbumName"></v-text-field>
  </v-form>
  <h1 class="text-h4 text-center my-10">Albums</h1>

  <v-row dense>
    <v-col v-for="album in albums" :key="album.name" cols="4">
      <v-card class="elevation-2">
        <router-link :to="`/albums/${album.id}`">
          <!-- eslint-disable-next-line max-len -->
          <amplify-s3-image v-if="album.photos.items.length > 0" level="protected" :img-key="album.photos.items[0].fullsize.key">
            <v-card-title v-text="album.name"></v-card-title>
          </amplify-s3-image>
        </router-link>

        <v-card-actions>
          <router-link :to="`/albums/${album.id}`">
            <v-card-title v-text="album.name"></v-card-title>
          </router-link>
          <v-spacer></v-spacer>

          <v-btn icon @click.prevent="deleteAlbum(album.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import {
  mapGetters,
} from 'vuex';

export default {
  async mounted() {
    this.$store.dispatch('albums/getAlbums');
    this.$store.dispatch('auth/authAction');
  },
  data: () => ({
    albumName: '',
    error: '',
    gradient: 'to bottom,rgba(0,0,0,.1),rgba(0,0,0,.5)',
  }),
  methods: {
    openAlbumDetails(album) {
      this.$router.push(`/album/${album.id}`);
    },
    setAlbumName(value) {
      this.albumName = value;
    },
    async createAlbum() {
      this.error = '';
      if (!this.albumName) {
        this.error = 'Please enter an album name';
        return false;
      }
      const newAlbum = {
        name: this.albumName,
        owner: this.user.username,
        ownerId: this.user.id,
      };
      this.$store.dispatch('albums/createAlbum', newAlbum);
      this.$store.dispatch('albums/getAlbums');
      return true;
    },
    async deleteAlbum(albumId) {
      await this.$store.dispatch('albums/deleteAlbum', albumId);
      this.$store.dispatch('albums/getAlbums');
      return true;
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      albums: 'albums/albums',
    }),
  },
};
</script>

<style lang="scss" scoped>
amplify-s3-image {
  --width: 100%;
}
</style>
