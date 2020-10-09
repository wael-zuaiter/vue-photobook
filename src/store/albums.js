import { API, graphqlOperation, Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import awsConfig from '@/aws-exports';
import {
  createAlbum as createAlbumMutation,
  createPhoto as createPhotoMutation,
  deleteAlbum as deleteAlbumMutation,
} from '@/graphql/mutations';
import {
  getAlbum as getAlbumQuery,
  listAlbums as listAlbumsQuery,
} from '@/graphql/queries';

export const albums = {
  namespaced: true,
  state: {
    albums: null,
    error: null,
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    async createAlbum({ dispatch }, newAlbum) {
      try {
        await API.graphql(graphqlOperation(createAlbumMutation, { input: newAlbum }));
        dispatch('getAlbums');
      } catch (error) {
        console.log(error);
      }
    },
    async getAlbum(_, albumId) {
      try {
        const album = await API.graphql(graphqlOperation(getAlbumQuery, { id: albumId }));
        return album.data.getAlbum;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async deleteAlbum(_, albumId) {
      try {
        const album = await API.graphql(
          graphqlOperation(deleteAlbumMutation, { input: { id: albumId } }),
        );
        return album.data.deleteAlbum;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async getAlbums({ commit }) {
      try {
        const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
        commit('setAlbums', albumsData.data.listAlbums.items);
      } catch (error) {
        console.log(error);
      }
    },
    async createPhoto(_, data) {
      const {
        aws_user_files_s3_bucket: bucket,
        aws_user_files_s3_bucket_region: region,
      } = awsConfig;
      const photoId = uuid();
      const { file, type, id: albumId } = data;
      const extention = file.name.substr(file.name.lastIndexOf('.') + 1);
      const key = `images/${photoId}.${extention}`;

      const input = {
        id: photoId,
        photoAlbumId: albumId,
        contentType: type,
        fullsize: {
          key,
          region,
          bucket,
        },
      };
      try {
        await Storage.put(key, file, {
          level: 'protected',
          contentType: type,
          metadata: {
            albumId,
            photoId,
          },
        });
        await API.graphql(graphqlOperation(createPhotoMutation, {
          input,
        }));
        return Promise.resolve('success');
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
  },
  getters: {
    albums: (state) => state.albums,
  },
};
