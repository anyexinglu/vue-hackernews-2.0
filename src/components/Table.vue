<template id="grid-template">
  <div>
    <div class="container">
      <button class="btn" @click="openNewItemDialog('新增账单')">新增</button>
    </div>
    <table v-bind:class="{ 'table-no-data': isEmpty }">
      <thead>
        <tr>
          <th v-for="col in columns">
            {{ col.name }}
          </th>
          <th>
            操作列
          </th>
        </tr>
      </thead>
      <tbody v-if="isEmpty">
        <tr><td colspan="5">没有数据</td></tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item, index) in filteredDataList">
          <td v-for="col in columns">
            <span v-if="col.isKey">
              <a href="javascript:void(0)" @click="openEditItemDialog(item[col.field])">{{item[col.field]}}</a>
            </span>
            <span v-else>{{item[col.field]}}</span>
          </td>
          <td class="text-center">
            <button class="btn-danger" @click="openEditItemDialog(item[keyColumn])">编辑</button>
            <button class="btn-danger" @click="deleteItem(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <v-dialog :mode="mode" :title="title" :show="showDialog" :item="item" :fields="columns" v-on:create-item="createItem" v-on:update-item="updateItem" v-on:close-dialog="closeDialog">
    </v-dialog>
  </div>
</template>


<script>
import $ from 'jquery'
import u from 'underscore'

export default {
  props: ['dataSource', 'columns', 'searchKey'],
  data: function() {
    return {
      mode: 0,
      title: '',
      showDialog: false,
      item: {}
    }
  },
  computed: {
    isEmpty () {
      return this.dataSource && !this.dataSource.length
    },
    keyColumn () {    // 从columns数组中提取出主键列keyColumn
      let keyColumnItem = u.find(this.columns, item => item.isKey);
      return keyColumnItem ? keyColumnItem.field : '';
    },
    // 表格数据过滤器
    filteredDataList:  function () {
      let self = this
      let result = this.dataSource.filter( (item) => {
        return item[self.keyColumn || 'billingId'].indexOf(self.searchKey) !== -1
      });
      return result
    }
  },
  methods: {
    openNewItemDialog: function (title) {
      // 对话框的标题
      this.title = title
      // mode = 1表示新建模式
      this.mode = 1
      // 初始化this.item
      this.item = {}
      // showDialog是v-dialog组件的一个方法，传入参数true表示显示对话框
      this.showDialog = true;
    },
    openEditItemDialog: function (key) {
      // 根据主键查找当前修改的数据
      let currentItem = this.findItemByKey(key)
      // 对话框的标题
      this.title = '编辑账单：' + key
      // mode = 2表示修改模式
      this.mode = 2
      // 将选中的数据拷贝到this.item
      this.item = this.initItemForUpdate(currentItem)
      // 广播事件，传入参数true表示显示对话框
      this.showDialog = true;
    },
    // 弹出修改数据的对话框时，使用对象的深拷贝
    initItemForUpdate(p, c) {
      c = c || {};
      for(let i in p) {
        // 属性i是否为p对象的自有属性
        if(p.hasOwnProperty(i)) {
          // 属性i是否为复杂类型
          if(typeof p[i] === 'object') {
            // 如果p[i]是数组，则创建一个新数组
            // 如果p[i]是普通对象，则创建一个新对象
            c[i] = Array.isArray(p[i]) ? [] : {};
            // 递归拷贝复杂类型的属性
            this.initItemForUpdate(p[i], c[i]);
          } else {
            // 属性是基础类型时，直接拷贝
            c[i] = p[i];
          }
        }
      }
      return c;
    },
    findItemByKey: function (key) {
      let keyColumn = this.keyColumn
      for(let i = 0; i < this.dataSource.length; i++){
        if(this.dataSource[i][keyColumn] === key){
          return this.dataSource[i]
        }
      }
    },
    itemExists: function () {
      let keyColumn = this.keyColumn
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.item[keyColumn] === this.dataSource[i][keyColumn])
          return true;
      }
      return false;
    },
    createItem: function () {
      let keyColumn = this.keyColumn
      if (!this.itemExists()) {
        // 将item追加到dataSource
        this.dataSource.push(this.item)
        // 广播事件，传入参数false表示隐藏对话框
        this.showDialog = false;
        // 新建完数据后，重置item对象
        this.item = {}
      } else {
        alert(keyColumn + ' "' + this.item[keyColumn] + '" is already exists')
      }
    },
    updateItem: function () {
      // 获取主键列
      let keyColumn = this.keyColumn

      for (let i = 0; i < this.dataSource.length; i++) {
        // 根据主键查找要修改的数据，然后将this.item数据更新到this.dataSource[i]
        if (this.dataSource[i][keyColumn] === this.item[keyColumn]) {
          for (let j in this.item) {
            this.dataSource[i][j] = this.item[j]
          }
          break;
        }
      }
      // 广播事件，传入参数false表示隐藏对话框
      this.showDialog = false;
      // 修改完数据后，重置item对象
      this.item = {}
    },
    deleteItem: function (entry) {
      let data = this.dataSource
      data.forEach(function(item, i) {
        if(item === entry) {
          data.splice(i, 1)
          return
        }
      })
    },
    closeDialog: function () {
      this.showDialog = false;
    }
  }
}
</script>

<style scoped>
#grid-template {
  display: none;
}
.table-no-data {
  td {
    text-align: center;
  }
}

table,
td,
th {
  border-collapse: collapse;
  border-spacing: 0
}

table {
  width: 100%;
  font-size: 13px;
}

td,
th {
  border: 1px solid #ddd;
  padding: 5px 10px;
}

th {
  padding: 10px;
  font-weight: 400;
  color: #666;
  background: #f0f0f0;
  cursor: pointer;
}

tr:nth-of-type(odd) {
  background: #fff
}

tr:nth-of-type(even) {
  background: #fafafa
}
</style>
