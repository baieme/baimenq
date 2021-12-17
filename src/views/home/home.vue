<template>
  <el-row :gutter="20">
    <el-col :span="8" style="padding: 0">
      <!-- 用户的信息 -->
      <div class="grid-content bg-purple">
        <el-card :body-style="{ padding: '20px' }" shadow="hover">
          <div class="user">
            <img :src="$store.state.imgUrl" />
            <div class="user-name">
              <div class="Administrator">管理员</div>
              <div class="admin">admin</div>
            </div>
          </div>
          <!-- 用户登录的时间地点 -->
          <div class="login-address">
            <p>上次登录的时间：<span>2021-11-13</span></p>
            <p>上次登录的地点：<span>武汉</span></p>
          </div>
        </el-card>
        <!-- 手机销售的具体信息 -->
        <el-table :data="tableData">
          <el-table-column
            :prop="key"
            :label="value"
            v-for="(value, key) in tableHeader"
            :key="key"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="16" style="padding: 0">
      <div class="grid-content bg-purple order">
        <!-- 订单卡片 -->
        <el-card
          v-for="value in countData"
          :key="value.name"
          :body-style="{ padding: 0 }"
          shadow="hover"
        >
          <div class="order-container">
            <i
              :class="`el-icon-${value.icon}`"
              :style="{ background: value.color }"
            ></i>
            <div class="order-content">
              <div class="price">￥{{ value.value }}</div>
              <div>{{ value.name }}</div>
            </div>
          </div>
        </el-card>
        
      </div>
      <!-- echarts折线图部分 -->
      <el-card style="height:280px">
      <echart :getEchart="orderDate" style="height:280px"></echart>
      </el-card>
      <div style="height: 280px" class="echart">
        <el-card>
           <echart :getEchart="userDate" style="height:280px"></echart>
        </el-card>
        <el-card>
           <echart :getEchart="videoDate" style="height:280px" :isHasAxios='false'></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// import request from "../../api/axios.js";
import *as echarts from 'echarts';
import Echart from '../../components/Echarts.vue'
import {get} from '../../api/data.js'

export default {
  data() {
    return {
      tableData: [],
      tableHeader: {
        name: "手机类型",
        totalBuy: "总购买",
        monthBuy: "月购买",
        todayBuy: "日购买",
      },
      countData: [],
      orderDate:{
        xDate:[],
        series:[],
      },
       userDate:{
        xDate:[],
        series:[],
      },
       videoDate:{
        xDate:[],
        series:[],
      },
    };
  },
   components:{
    Echart,

  },
  mounted() {
    // get().then(res=>console.log(1)).catch(error=>console.log(error))
      get().then((res) => {
        //获得mock模拟的数据
        var res = res.data.data
        console.log(res)
        this.tableData = res.tableData;
        this.countData = res.countData;
        //echarts折线图的配置
        this.orderDate.xDate = res.orderData.date;
        var orderName = Object.keys(res.orderData.data[0])
        console.log(orderName )
        orderName.forEach(key =>{
          this.orderDate.series.push({
            name:key,
            type:'line',
            data:res.orderData.data.map(el=>el[key])
          });
        })
        console.log(this.orderDate)
       
        // var myChart = echarts.init(this.$refs.echart)
        //   myChart.setOption(this.order);
         //echarts条形图的配置
         var myuserData = Object.keys(res.userData[0]);
         var myName = myuserData.splice(0,1)
         myuserData.forEach(el=>{
           if(el == 'active'){
              this.userDate.series.push({
              name:'活跃用户',
              type:'bar',
              data:res.userData.map(key=>key[el])
           })
           }else {
             this.userDate.series.push({
             name:'新用户',
             type:'bar',
             data:res.userData.map(key=>key[el])
           })
           }
           
         })
         res.userData.forEach(el=>{
           this.userDate.xDate.push(el.date);
         })

         //echarts饼状图的配置
         this.videoDate.series.push({
           type:'pie',
           data:res.videoData,
         })
      })
      .catch((error) => console.log(error));
      
  }
 
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-name {
    margin-right: 30px;
    text-align: center;
    .Administrator {
      font-weight: bold;
      font-size: 30px;
    }
    .admin {
      color: #808080;
      font-size: 25px;
      margin-top: 10px;
    }
  }
  border-bottom: 1px solid #808080;
}
.login-address {
  margin-top: 20px;
  font-size: 14px;
  color: #808080;
  p {
    margin-top: 10px;
  }
  span {
    margin-left: 50px;
  }
}
.el-table {
  margin-top: 20px;
  height: 500px;
}
.order {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-card {
    margin-bottom: 20px;
    .order-container {
      display: flex;
      align-items: center;
      justify-content: space-around;

      i {
        display: block;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 40px;
        color: #fff;
      }
      .order-content {
        margin: 0 40px 0 20px;
        text-align: center;
        div {
          font-size: 14px;
          color: #808080;
        }
        .price {
          font-size: 22px;
          font-weight: bold;
          color: #000;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.echart {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>