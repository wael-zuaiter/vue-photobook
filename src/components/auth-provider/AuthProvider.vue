<template>
<div id="app">
  <amplify-authenticator v-if="authState !== 'signedin'"></amplify-authenticator>
  <div v-if="authState === 'signedin' && user">
    <slot />
  </div>
</div>
</template>

<style lang="scss">
amplify-authenticator {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<script>
import {
  onAuthUIStateChange,
} from '@aws-amplify/ui-components';

export default {
  name: 'AuthProvider',
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
  watch: {
    user() {
      this.$emit('user', this.user);
    },
  },
};
</script>
