<template>
  <div v-if="calculationHistory.length">
    <div class="calculation-history-container">
      <h3>Calculation History</h3>
      <table class="calculation-history">
        <thead>
          <tr>
            <th>Superannuation</th>
            <th>Gross</th>
            <th>Gross + Superannuation</th>
            <th>Tax</th>
            <th>Net</th>
            <th>Net + Superannuation</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(calculation, index) in calculationHistory" :key="index">
            <td>{{ calculation.calculated_value.superannuation }}</td>
            <td>{{ calculation.calculated_value.gross }}</td>
            <td>{{ parseFloat(calculation.calculated_value.gross) + parseFloat(calculation.calculated_value.superannuation) }}</td>
            <td>{{ calculation.calculated_value.tax_amount }}</td>
            <td>{{ calculation.calculated_value.income_after_tax }}</td>
            <td>{{ calculation.calculated_value.income_after_tax_super }}</td>
            <td class="delete-button">
              <button @click="deleteEntry(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    calculationHistory: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteEntry(index) {
      console.log("val", index)
      const deletedId = this.calculationHistory[index].id;
      this.calculationHistory.splice(index, 1);
      this.$emit('deleteEntry', deletedId);
    }
  }
};
</script>
<style scoped>
.calculation-history-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.calculation-history {
  width: 100%;
  border-collapse: collapse;
}

.calculation-history th,
.calculation-history td {
  border: 1px solid #ddd;
  padding: 8px;
}

.calculation-history th {
  background-color: #f2f2f2;
  text-align: left;
}

.calculation-history tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.calculation-history tbody tr:hover {
  background-color: #ddd;
}

.delete-button {
  align-items: center;
  justify-content: center;
  display: flex;
}

</style>
