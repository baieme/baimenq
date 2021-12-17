<template>
    <el-form ref='form' :model='form' label-width='80px' :inline='inline'>
        <!-- inline表示的是是否为行内样式 -->
        <el-form-item v-for="item in labelForm" :label='item.label' :key='item.label'>
        <!-- 进行判断如果是type是input就选用input -->
        <el-input
        v-if='item.type == "input"'
        :palceHolder="'请输入'+item.name"
        v-model = 'form[item.model]'
        ></el-input>
        <!-- type是select就选用select -->
        <el-select
        v-if="item.type == 'select'"
        :palceHolder="'请输入'+item.name"
        v-model = 'form[item.model]'
        >
        <el-option 
        v-for='i in item.opts'
        :label='i.label'
        :key = 'i.label'
        :value ='i.value'
        >
        </el-option>
        </el-select>
        <!-- type是date就选用date -->
         <el-date-picker
         v-if = 'item.type == "date"'
         placeholder = '请选择日期'
         value-format="yyyy-MM-dd"
         v-model = 'form[item.model]'
         >
         </el-date-picker>
        </el-form-item>
        <!-- 添加插槽 -->
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>
<script>
export default {
    props:{
        labelForm:Array,
        form:Object,
        inline:Boolean
    }
}
</script>
