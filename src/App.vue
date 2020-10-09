<template>
<div id="app" class="bg-purple-800">
  <auth-provider @user="getUser">
    <app-layout>
      {{ user.username }}
    </app-layout>
  </auth-provider>
</div>
</template>

<script>
import {
  AuthProvider,
  AppLayout,
} from './components';

export default {
  name: 'App',
  components: {
    AuthProvider,
    AppLayout,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser(user) {
      this.user = user;
    },
  },
};
</script>
