<template>
  <header>
    <!-- 头部左侧的内容 -->
    <div class="l-header">
      <el-button
        plain
        class="el-icon-menu"
        size="mini"
        @click="checkCollapse"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-breadcrumb>
         <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
        
      </el-breadcrumb> -->
    </div>
    <!-- 头部右侧的内容 -->
    <div class="r-header">
      <el-dropdown :hide-on-click="true">
        <span class="el-dropdown-link">
          <img :src="$store.state.imgUrl" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b" >
           <span @click='off'> 退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    checkCollapse() {
      //进行菜单栏的展开与切换
      this.$store.commit("collapseMenu");
    },
    off(){
      console.log(11)
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    current() {
      return this.$store.state.tab.currentMenu;
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;

  .l-header {
    display: flex;
    align-items: center;
    color: #fff;
    .el-button {
      margin-right: 20px;
      border-radius: 3px;
    }
  }
  .r-header {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>