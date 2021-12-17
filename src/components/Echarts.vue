// 封装echarts
<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    getEchart: {
      type: Object,
      default() {
        return {
          xDate: [],
          series:[],
        };
      },
    },
    isHasAxios: {
      type: Boolean,
      default: true,
    },
  },
  computed:{
    option(){
     return this.isHasAxios ? this.hasAxios : this.noAxios
    }
  },
  methods: {
    initDate() {
    this.getDate();
    if(this.echart){
       this.echart.setOption(this.option)
    }else {
      this.echart =  echarts.init(this.$refs.echart)
      this.echart.setOption(this.option)
    }
    },
    getDate() {
      if (this.isHasAxios) {
        this.hasAxios.xAxis.data = this.getEchart.xDate;
        this.hasAxios.series = this.getEchart.series;
      } else {
        this.noAxios.series = this.getEchart.series;
      }
  }
  },
  watch: {
    getEchart: {
      handler: function() {
        this.initDate();
      },
      deep: true,
    },
  },
  data() {
    return {
      hasAxios: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      noAxios: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart:null
    };
  },
};
</script>