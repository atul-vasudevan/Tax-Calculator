<template>
  <div class="container">
    <form @submit.prevent="register">
      <h2 class="text-center">Register</h2>
      <div>
        <input type="text" id="username" v-model="username" required placeholder="Enter username">
      </div>
      <div>
        <input type="text" id="firstName" v-model="firstName" required placeholder="Enter your first name">
      </div>
      <div>
        <input type="text" id="lastName" v-model="lastName" required placeholder="Enter your last name">
      </div>

      <button class="btn btn-primary" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    register() {
      console.log("register ")
      this.$emit('registerUser', { username: this.username, first_name: this.firstName, last_name: this.lastName });
    },
  },
};
</script>
<style scoped>
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
  .container form > div {
  margin-bottom: 10px;
}

.container label {
  margin-right: 5px;
}
</style>
