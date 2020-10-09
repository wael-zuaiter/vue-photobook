import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth';
import { albums } from './albums';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    albums,
    auth,
  },
});
