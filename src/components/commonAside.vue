<template>

  <el-menu default-active="" class="el-menu-vertical-demo" 
   background-color='#545c64'
   text-color='#fff'
  :collapse="isCollapse">
  <h3 v-show="!isCollapse">电商项目管理后台</h3>
   <h3 v-show='isCollapse'>后台</h3>
  <!-- //将没有children的进行遍历循环 -->
  <el-menu-item :index="value.path" v-for="value in noChildren" :key = 'value.path' @click='getPath(value)'>
    <i :class= "'el-icon-'+ value.icon" ></i>
    <span slot="title">{{value.label}}</span>
  </el-menu-item>
   <!-- //将有children的进行遍历得到菜单栏 -->
    <el-submenu :index="value.path" v-for='value in hasChildren' :key='value.path' >
    <template slot="title">
      <i :class="'el-icon-'+value.icon"></i>
      <span slot="title">{{value.label}}</span>
    </template>
    <!-- //二级菜单栏 -->
    <el-menu-item-group v-for='subValue in value.children' :key='subValue.path' >
      <el-menu-item :index='subValue.path' @click='getPath(subValue)'>
           <i :class = "'el-icon-'+subValue.icon"></i>
          <span slot="title">{{subValue.label}}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>

</template>
<script>
export default {
    data(){
        return {
            menuData:[
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ],
     
        }
        
    },
    computed:{
        hasChildren(){
            return this.$store.state.tab.menu.filter(el=>el.children)

            
        },
        noChildren(){
            return this.$store.state.tab.menu.filter(el=>!el.children)
        },
        //将isCollapse的值和vuex中值联系在一起
        isCollapse(){
          //获取到vuex中state中的值
          return this.$store.state.tab.isCollapse;
        },

    },
    methods:{
      //进行判断如果是page1或page2就返回登录页面
      getPath(value){
        if(value.name == "page1" || value.name == 'page2'){
          this.$router.push({name:'login'})
        }else{
            this.$router.push({name:value.name});
        }
      
        this.$store.commit('setTooList',value)
        console.log('a')
        console.log(this.$store.state.tab.currentMenu);
      }
    }
    //  methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
    // }
}
</script>
<style lang="scss" scoped>
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
 
  .el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
  
</style>