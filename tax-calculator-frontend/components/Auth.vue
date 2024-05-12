<template>
  <div v-if="!isLoggedIn">
    <h2 v-if="!showForm" class="text-center">Tax Calculator</h2> 
    <div v-if="!showForm">
      <div class="button-container">
        <button @click="showRegistrationForm" class="btn btn-primary">Register</button>
        <button @click="showLoginForm" class="btn btn-primary" style="margin-left: 10px;">Login</button>
      </div>
    </div>
    <div v-else>
      <div v-if="isRegister">
        <registration-form @registerUser="registerUser" />
      </div>

      <div v-else>
        <login-form @loginUser="loginUser" />
      </div>
    </div>
  </div>
  <div v-else class="calculator-container">
    <calculator v-if="!showCalcHistory" @incomeDetails="incomeDetails" @viewHistory="viewHistory" class="calculator"/>
    <calc-history v-if="showCalcHistory" :calculationHistory="calculationHistory" @deleteEntry="deleteEntry"/>
  </div>
</template>

<script>
import RegistrationForm from '../components/Registration.vue';
import LoginForm from '../components/Login.vue';
import Calculator from '../components/Calculator.vue';
import CalcHistory from '../components/CalcHistory.vue';
  
  export default {
    components: {
      RegistrationForm,
      LoginForm,
        Calculator,
        CalcHistory,
    },
    data() {
      return {
        isRegister: true,
        calculationHistory: [],
        showForm: false,
        showCalcHistory: false,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
    },
    methods: {

      viewHistory() {
        this.showCalcHistory = true;
        if (this.calculationHistory.length === 0) {
          this.fetchCalcHistory();
        }
      },
      showRegistrationForm() {
          this.isRegister = true;
          this.showForm = true;
      },
      showLoginForm() {
          this.isRegister = false;
          this.showForm = true;
      },
      registerUser(userData) {
        console.log("register in auth", userData)
        this.$store.dispatch('registerUser', userData);
      },
      async loginUser(username) {
        console.log("login in auth")
        try {
          await this.$store.dispatch('userlogin', username);
          // this.fetchCalcHistory();
        } catch (error) {
          console.error('Login error:', error);
        }
      },
      async incomeDetails(income) {
        console.log("submit in auth", income)
        try {
          await this.$store.dispatch('submitIncomeDetails', income);
          this.showCalcHistory = true;
          if (this.calculationHistory.length === 0) {
            this.fetchCalcHistory();
          }
        } catch (error) {
          console.error('Calculation error:', error);
        }
      },
      async fetchCalcHistory() {
        try {
          this.calculationHistory = await this.$store.dispatch('getCalcHistoryOfUser');
        } catch (error) {
          console.error('Calculation history error:', error);
        }
      },
      async deleteEntry(idToDelete) {
        try {
          console.log("val in auth ", idToDelete)
          await this.$store.dispatch('deleteSelectedCalcHistory', idToDelete);
        } catch (error) {
          console.error('Calculation history error:', error);
        }
      }

    },
  };
  </script>
  
  <style>
  .button-container{
    display: flex;
    flex-direction: row;
    position: absolute;
    /* top: 50%;
    left: 40%; */
    margin-top: 10%;
    margin-left: 50%;
    padding: 15px;
    transform: translate(-50%,-50%);
    /* max-width: 430px; */
    /* width: 100%; */
    background: #fff;
    border-radius: 7px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  }
  .button-container button {
    margin-top: 0%;
  }
  .calculator{
  width: 48%; /* Adjust width as needed, leaving some space for margins */
}
  </style>
  