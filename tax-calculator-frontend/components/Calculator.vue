<template>
  <div v-if="isLoggedIn" class="container">
    <h3>Calculate tax</h3>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submitDetails)" class="form">
        <div class="custom-height">
          <ValidationProvider name="superannuation" rules="required|numericWithDecimal|minSuper" v-slot="{ errors }">
            <input type="text" id="superannuation" v-model="superannuation" placeholder="Superannuation (%)">
            <span class="error d-block">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="custom-height">
          <ValidationProvider name="income" rules="required|numeric|minIncome" v-slot="{ errors }">
            <input type="text" id="income" v-model="income" placeholder="Income">
            <span class="error d-block">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div>
          <label for="includeSuper">Does the income include superannuation?</label>
          <input type="checkbox" id="includeSuper" v-model="includeSuper">
        </div>
        <div class="d-block" style="margin-top: 10px;">
          <button class="btn btn-primary" type="submit" :disabled="!superannuation">Submit</button>
        </div>
        <div class="d-block" style="margin-top: 10px;">
          <button class="btn btn-primary" @click="viewHistory">View history</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      superannuation: null,
      income: null,
      includeSuper: false,
    };
  },
  computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      }
    },
  methods: {
    submitDetails() {
      console.log("submit in calc")
      this.$emit('incomeDetails', { superannuation: this.superannuation, income: this.income, super_included: this.includeSuper });
    },
    viewHistory() {
      this.$emit('viewHistory');
    }
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 45%;
  margin-top: 10%;
  padding: 15px;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.3);
}

.form {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-provider {
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 12px;
}

label {
  margin-right: 5px;
}
.custom-height {
  height: 48px;
}
</style>
