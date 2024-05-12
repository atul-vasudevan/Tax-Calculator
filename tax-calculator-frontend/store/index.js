import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// export default new Vuex.Store({
export const createStore = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn: false,
      userId: 0,
      calculationHistory: [],
    },
    mutations: {
      SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status;
      },
      ADD_CALCULATION(state, calculation) {
        state.calculationHistory.push(calculation);
      },
      SET_USER_ID(state, status) {
        state.userId = status;
      }
    },
    actions: {
      async registerUser({ commit }, userData) {
        console.log("register")
        try {
          const response = await axios.post('http://localhost:3001/v1/user', userData);
          console.log('User registered:', response.data);
          commit('SET_LOGIN_STATUS', true);
          commit('SET_USER_ID', response.data.id)
        } catch (error) {
          console.error('Error registering user:', error);
        }
      },
      async userlogin({ commit }, username) {
        console.log("login")
        try {
          const response = await axios.get('http://localhost:3001/v1/user', {params: {"username": username}});
          console.log('User logged in:', response.data);
          commit('SET_LOGIN_STATUS', true);
          commit('SET_USER_ID', response.data.id);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      async submitIncomeDetails({ commit }, incomeDetails) {
        console.log("submit", incomeDetails)
        try {
          const response = await axios.post('http://localhost:3001/v1/calculate/user/' + this.state.userId, incomeDetails);
          console.log('Calc details:', response.data);
          commit('ADD_CALCULATION', response.data);
        } catch (error) {
          console.error('Error calculating:', error);
        }
      },
      async deleteSelectedCalcHistory({ commit }, idToDelete) {
        console.log("del", idToDelete)
        try {
          const response = await axios.delete('http://localhost:3001/v1/calculate/' + idToDelete);
          console.log('Calc delete:', response.data);
        } catch (error) {
          console.error('Error deleting:', error);
        }
      },
      async getCalcHistoryOfUser({ commit }) {
        console.log("calchistory")
        try {
          const response = await axios.get('http://localhost:3001/v1/calculate/user/' + this.state.userId);
          console.log('calc history: ', response.data);
          commit('ADD_CALCULATION', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching calculation history:', error);
        }
      },
    },
    getters: {
      isLoggedIn: state => state.isLoggedIn,
      calculationHistory: state => state.calculationHistory,
    },
  })
};
export default createStore;
