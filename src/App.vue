<template>
  <div id="app">
    <div class="hello">
      <router-link to="/test">Try Demo</router-link>
      <router-link to="/echarts">Try Echarts</router-link>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<style lang="stylus">
@import './common.sty'
.hello
    width 20%
    float left
    margin-left 50px
    a
      display block
      line-height 30px
      color #42b983
.view
  background #fff
  padding 10px 30px
  max-width 800px
  margin 0 auto
  position relative

</style>
