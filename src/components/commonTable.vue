<template>
<div class="common-manager">
 <el-table :data="tableData" style="width='100%'" max-height='300'>
    <el-table-column label='序号'>
      <template slot-scope="scope">
        <span style="margin-left: 10px">
            <!-- 获取到对应的序号 -->
          {{
              (config.page - 1) * 20 + scope.$index + 1
          }}
            </span>
      </template>
    </el-table-column>
    <!-- 设置table表格中每一列的内容 -->
    <el-table-column
    show-overflow-tooltip
       v-for = 'item in tableLabel'
       :key = 'item.prop'
       :label = 'item.label'
       :width = 'item.width ? item.width : 95' 
    >   
       <!-- scope.row代表的是当前行的内容 -->
        <template slot-scope="scope">
            <span>{{scope.row[item.prop]}}</span>
        </template>
    </el-table-column>
     <!-- 设置编辑删除的按钮 -->
 <el-table-column label='操作' min-width='120'>
    <template slot-scope="scope" >
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
     </el-table-column>
  </el-table>
      <el-pagination
      @current-change="currentChange"
      :current-page.sync="config.page"
      :page-size="20"
      layout="prev, pager, next"
      :total="config.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object,
    },
    methods:{
        handleEdit(row){
            this.$emit('edit',row)
        },
        handleDelete(row){
            this.$emit('delete',row)
        },
        currentChange(page){
            this.$emit('change',page)
        }
    }

};
</script>
<style lang="scss" scoped>

</style>