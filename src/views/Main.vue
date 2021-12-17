<template>
  <el-container style="height: 100%">
    <el-aside width='auto'>
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header><common-header></common-header></el-header>
      <common-tag></common-tag>
      <el-main >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonTag from '../components/commonTag.vue';
// @ is an alias to /src
import commonAside from '../components/commonAside.vue';
import commonHeader from '../components/commonHeader.vue'
import home from './home/home.vue'

export default {
  name: "Main",
  components: {
    commonAside,
    commonHeader,
    home,
    CommonTag
  },
};
</script>

<style lang="scss" scoped>
  .el-header {
  background: #333;
}

</style>
