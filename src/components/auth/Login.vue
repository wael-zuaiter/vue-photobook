<template>
<div class='login'>
  <form @submit.prevent="login">
    <input v-model="username" name="username" placeholder="Username" />
    <input v-model="password" name="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
import {
  mapActions,
} from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions({
      loginAction: 'auth/login',
    }),
    async login() {
      try {
        await this.loginAction({
          username: this.username,
          password: this.password,
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
