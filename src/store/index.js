// The single state tree does not conflict with modularity
// In some circumstances you can split your state and mutations into sub modules.
// 如果有些状态严格属于单个组件，最好还是作为组件的局部状态。

import Vue from 'vue'
import Vuex from 'vuex'
import { fetchCustomers, fetchBills } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    customers: [],
    bills: []
  },

  actions: {
    FETCH_CUSTOMERS: ({ commit, state }) => {
      // only fetch customers that we don't already have.
      return fetchCustomers().then(items => commit('SET_CUSTOMERS', { items }))
    },
    FETCH_BILLS: ({ commit, state }) => {
      return fetchBills().then(items => commit('SET_BILLS', { items }))
    }
  },

  // mutation 必须是同步函数
  mutations: {
    SET_CUSTOMERS: (state, { items }) => {
      if (items) {
        Vue.set(state, 'customers', items)
      }
    },
    SET_BILLS: (state, { items }) => {
      if (items) {
        Vue.set(state, 'bills', items)
      }
    }
  },

  getters: {

  }
})

export default store
