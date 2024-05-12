<template >
  <div class="container">
    <form @submit.prevent="login">
      <h2 class="text-center">Login</h2>
      <div>
        <input type="text" id="username" v-model="username" required placeholder="Enter your username">
      </div>
      <div style="margin-top: 10px;">
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    login() {
      console.log("login in login", this.username)
      this.$emit('loginUser', this.username);
    },
  },
};
</script>
<style>
  .container{
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 45%;
    margin-top: 10%;
    width: auto !important;
    padding: 15px;
    background: #fff;
    border-radius: 7px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  }
  .button-container button {
    margin-top: 10px;
  }
</style>
  