<template>
  <div id="app">
    <div class="container">
      <div class="form-group">
        <label>Search</label>
        <input type="text" class="search-input" v-model="searchQuery" />
      </div>

    </div>
    <div class="container">
      <v-table :data-list="people" :columns="columns" :search-key="searchQuery">
      </v-table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data: function () {
    // body...
    return {
      searchQuery: '',
      columns: [{
        name: 'name',
        isKey: true
      }, {
        name: 'age'
      }, {
        name: 'sex',
        dataSource: ['Male', 'Female']
      }],
      people: [{
        name: 'Jack',
        age: 30,
        sex: 'Male'
      }, {
        name: 'Bill',
        age: 26,
        sex: 'Male'
      }, {
        name: 'Tracy',
        age: 22,
        sex: 'Female'
      }, {
        name: 'Chris',
        age: 36,
        sex: 'Male'
      }]
    }
  }
}
</script>

<style lang="stylus">

</style>
