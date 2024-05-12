<template>
  <div v-if="calculationHistory.length">
    <h3>Calculation History</h3>
    <ul>
      <li v-for="calculation in calculationHistory" :key="calculation.id">
        <p><strong>Superannuation:</strong> {{ calculation.superannuation }}</p>
        <p><strong>Income:</strong> {{ calculation.income }}</p>
        <p><strong>Include Super:</strong> {{ calculation.includeSuper ? 'Yes' : 'No' }}</p>
        <!-- Display other calculation details -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    calculationHistory: Array,
  },
};
</script>
