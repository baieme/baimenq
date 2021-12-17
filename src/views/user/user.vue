<template>
  <div>
    <el-dialog
      :title="titlename === add ? '编辑用户' : '新增用户'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <!-- form表单里面的内容 -->
      <common-form
        :form="operateForm"
        :labelForm="operateFormLabel"
        :inline="true"
      ></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增和搜索框的内容 -->
    <div class="search">
      <el-button type="text" @click="add" size="medium" class="button"
        >+新增</el-button
      >
      <common-form :labelForm="formLabel" :form="searchFrom" :inline="true">
        <el-button class="button" @click = 'chan' type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData = "tableData"
      :tableLabel = "tableLabel"
      :config = "config"
      @delete = 'del'
      @edit = 'edi'
      @change = 'chan()'
    >
    </common-table>
  </div>
</template>
<script>
import commonForm from "../../components/commonForm.vue";
import commonTable from "../../components/commonTable.vue";

import {getUser} from '../../api/data.js'
export default {
  components: {
    commonForm,
    commonTable,
  },
  data() {
    return {
      dialogVisible: false,
      titlename: "add",
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      tableData: [
        {
          date: "2017-05-04",
          name: "小小",
          address: "浙江省杭州市千岛湖镇 阳光路",
        },
        {
          date: "1956-05-04",
          name: "爷爷",
          address: "浙江省杭州市千岛湖镇 清波花园",
        },
        {
          date: "1958-05-04",
          name: "奶奶",
          address: "浙江省杭州市千岛湖镇 冬瓜乌",
        },
      ],
    };
  },
  methods: {
    submit() {
      if(this.titlename == 'add'){
        this.$http.post('/api/user/add',this.operateForm).then(res=>{
              this.chan();
              this.dialogVisible = false;
        })
      }else{
        this.$http.post('/api/user/edit',this.operateForm).then(res=>{
              this.chan();
              this.dialogVisible = false
        })
      }
      this.dialogVisible = false;

    },
    // 新增用户
    add() {
      this.titlename = "add";
      this.dialogVisible = true;
      this.operateForm = {};
    },
    // 编辑用户
    edi(row){
      this.operateForm = row;
      this.titleName = 'edit'
      this.dialogVisible = true;
    },

    chan(){
      // getUser({
      //   page:this.config.page,
      // }).then((res)=>{
      //     console.log(res)
      //     this.tableData = res.list.map(el=>{
      //     el.sexLabel = el.sex === 0 ? '女' : '男' 
      //     return el
      //   })
      //   this.config.total = res.count
      // })
      
      // 根据搜索框的内容进行搜索
      if(this.searchFrom.keyword ){
        this.config.page = Number(this.searchFrom.keyword)
        this.searchFrom.keyword = '';
      }
      //通过mock重新获得this.tableData的值
       getUser({
        page: this.config.page,
              }).then((res) => {
                console.log(res)
          this.tableData = res.data.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        // this.config.loading = false;
      });
     
    },
    //删除数据
    del(row){
      this.$confirm('确定停用该条消息吗 ?','提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        let id = row.id
        this.$http.get('/api/user/delete',{
          params:{
              id
          }
      
        }).then(el=>{
          this.chan();
          this.$message({
            message:"删除成功",
            type:'success'
          })
        })
      })
      .catch(el => {
         this.$message({
            message:"删除失败",
            type:'failure'
          }
         )
      }
      )
    }
    
  },
  created() {
    this.chan();
  },
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  .button {
    width: 80px;
    height: 40px;
    text-align: center;
    background: skyblue;
    color: #fff;
  }
}
</style>