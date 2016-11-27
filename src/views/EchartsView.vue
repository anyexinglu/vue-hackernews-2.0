<template>
  <main class="echarts-view">

  </main>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'

function initEcharts () {
  var option = {
      title: {
          text: '未来一周气温变化',
          subtext: '纯属虚构'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['最高气温','最低气温']
      },
      toolbox: {
          show: true,
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {}
          }
      },
      xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value',
          axisLabel: {
              formatter: '{value} °C'
          }
      },
      series: [
          {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                  data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          },
          {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                  data: [
                      {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'},
                      [{
                          symbol: 'none',
                          x: '90%',
                          yAxis: 'max'
                      }, {
                          symbol: 'circle',
                          label: {
                              normal: {
                                  position: 'start',
                                  formatter: '最大值'
                              }
                          },
                          type: 'max',
                          name: '最高点'
                      }]
                  ]
              }
          }
      ]
  };

  var myChart = echarts.init($('.echarts-view')[0]);
  myChart.setOption(option);
}

export default {
  name: 'echarts-view',
  data () {
    return {
    }
  },
  mounted () {
    initEcharts()
  }
}
</script>

<style lang="stylus">
.echarts-view
  width 500px
  height 400px
</style>
