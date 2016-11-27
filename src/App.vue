<template>
  <div id="app">
    <div class="header"></div>
    <router-view class="view"></router-view>
  </div>
</template>

<style lang="stylus">
@import './common.sty'
.view
  background #fff
  padding 10px 30px
  max-width 800px
  margin 0 auto
  position relative

</style>
