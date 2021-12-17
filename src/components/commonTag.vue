<template>
  <div class="tag">
    <el-tag v-for="(tag,index) in tags" :key="tag.name" closable :type="tag.type" @click='goPath(tag.path)'
    :color = '$route.path == tag.path ? "pink" :"white"' @close = 'close(tag,index)'
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script>
export default {
  data() {
      return {}
  },
  computed: {
    tags() {
      //获得store中toolList
      return this.$store.state.tab.toolList;
    },
  },
  methods:{
      //添加路径
      goPath(value){
          this.$router.push(value)
      },
      close(tag,index){
        //   首先获得tags的length
        let length = this.tags.length -1;
          //调用store中的closeTag方法
          this.$store.commit("closeTag",tag)
        //   进行判断如果是最后一项的话就跳转到左边的页面，不是的就对该位置重新添加路径
          if(length === index){
              this.$router.push(this.tags[index - 1].path)
          }else{
              this.$router.push(this.tags[index].path)
          }
      }
  }
};
</script>
<style lang="scss">
    .tag {
        height: 50px;
        padding-left: 20px;
        line-height: 50px;
        .el-tag {
            margin-right: 10px;
        }
    }
</style>