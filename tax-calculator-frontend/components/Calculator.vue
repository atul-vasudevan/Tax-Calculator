<template>
  <div v-if="isLoggedIn">
    <ValidationObserver v-slot="{ handleSubmit }" @submit.prevent="handleSubmit(submitDetails)">
      <ValidationProvider name="superannuation" rules="required|numericWithDecimal|minSuper" v-slot="{ errors }">
        <label for="superannuation">Superannuation (%):</label>
        <input type="text" id="superannuation" v-model="superannuation">
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
      
      <ValidationProvider name="income" rules="required|numeric|minIncome" v-slot="{ errors }">
        <label for="income">Income:</label>
        <input type="text" id="income" v-model="income">
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>

      <label for="includeSuper">Include Super:</label>
      <input type="checkbox" id="includeSuper" v-model="includeSuper">

      <button type="submit">Submit</button>
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
  },
};
</script>
