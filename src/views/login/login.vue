<template>
  <el-form
    :model="form"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    
  >
     <el-form-item label="姓名" prop="pass">
      <el-input
        type="input"
        v-model="form.name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {getMenu} from '../../api/data.js'
export default {
    data(){
        return {
           form:{
               name:'admin',
               password:'admin'
           },
        }
    },
    methods:{
        submitForm(){
            getMenu(this.form).then((res)=>{
                console.log(res)
                if(res.data.code === 20000){
                    this.$store.commit('removeMenu');
                    this.$store.commit('setMenu',res.data.data.menu);
                    console.log(res.data.data.menu)
                    this.$store.commit('setToken',res.data.data.token);
                    //添加动态路由
                    this.$store.commit('addMenu',this.$router);
                    this.$router.push({name:'home'})
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
    .demo-ruleForm {
        width: 400px;
        height: 300px;
        border:1px solid pink;
        position: relative;
        left: 50%;
        margin-left: -200px;
        top: 50%;
        margin-top: -150px;
    }
</style>