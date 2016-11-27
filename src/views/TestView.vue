<template>
  <main class="test-view">
    <h3>申请消除意外欠款</h3>
    <section class="account-section">
      <p class="section-title">申请对象信息{{accountOptions.length}}</p>
      <div class="section-item customer-item">
        <span>客户名称：</span>
        <selectEx :options="customerOptions" v-model="customerId" v-bind="customerSubData">
        </selectEx>
      </div>
      <div class="section-item account-id-item">
        <span>ACCOUNT ID：</span>
        <selectEx :options="accountOptions" v-model="accountId" minimumResultsForSearch="-1" v-bind="accountSubData" v-on:input="accountIdChange">
        </selectEx>
      </div>
    </section>
    <section class="bill-list-section">
      <p class="section-title">消除欠款信息</p>

    </section>
  </main>
</template>

<script>
import $ from 'jquery'
import u from 'underscore'
import SelectEx from '../components/SelectEx.vue'
// import Vuetable from '../components/Vuetable.vue'

// import TableEx from '../components/TableEx.vue'
// var VueTables = require('vue-tables-2');
// import VueTables from 'vue-tables-2'

// Vue.use(VueTables.client, {
//   perPage: 25
// });

function fetchCustomers (store) {
  return store.dispatch('FETCH_CUSTOMERS')
}

function fetchBills (store, query) {
  return store.dispatch('FETCH_BILLS', query)
}

export default {
  name: 'test-view',
  components: {
    "selectEx": SelectEx
    // "vuetable": Vuetable
  },
  data () {
    return {
      customerId: "-1",
      customerOptions: [],
      customerSubData: {
        defaultOption: {
          id: '-1',
          text: '请选择或搜索客户名'
        }
      },
      accountSubData: {
        defaultOption: {
          id: '-1',
          text: '请选择'
        }
      },
      accountId: "",
      accountOptions: []
    }
  },
  computed: {
    bills () {
      console.log(this.$store.state.bills)
      return this.$store.state.bills
    },
    customerOptions () {
      let customers = this.$store.state.customers;
      console.log(customers)
      let customerOptions = u.map(customers, (item, key) => {
        return { id: item.customerId, text: item.customerName, accountIds: item.accountIds };
      });
      return customerOptions;
    },
    accountOptions () {
      let customerId = this.customerId;
      let customerItem = u.find(this.customerOptions, (item, key) => {
        return item.id === customerId;
      });
      let accountIds = customerItem && customerItem.accountIds;
      let accountOptions = u.map(accountIds, item => {
        return { id: item, text: item };
      });
      return accountOptions;
    }
  },
  methods: {
    accountIdChange: function (value) {
      console.log(value)

      fetchBills(this.$store, {
        accountId: value
      })
      console.log(this.bills);
    }
  },
  preFetch: fetchCustomers,
  beforeMount () {
    fetchCustomers(this.$store)
  }
}
</script>

<style lang="stylus">
main.view
  padding 0 30px 10px 0
  h3
    border-left 2px solid #f60
    padding-left 10px
    line-height 50px
  section
    margin-left 20px
    .section-item
      margin-left 50px
      display inline-block
      select
        width 200px
</style>
