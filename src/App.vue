<template>
<div id="app">
  <amplify-authenticator v-if="authState !== 'signedin'"></amplify-authenticator>
  <div v-if="authState === 'signedin' && user">
    <amplify-sign-out></amplify-sign-out>
    <div>Hello, {{user.username}}</div>
  </div>
</div>
</template>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<script>
import {
  onAuthUIStateChange
} from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange
  }
}
</script>
