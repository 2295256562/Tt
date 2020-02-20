<template>
  <div>
    <div>
      <div class="topdiv">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>模块列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="productdiv">
        <div style="width: 100%; height: 60px">
          <span>模块名称:</span>
          <el-input v-model="modelName" size="small" style="width: 180px" placeholder="请输入内容"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" @click="searchModel">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-search" @click="clearModelBtn">清空</el-button>
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addModel">新增
          </el-button>
        </div>

        <div>
          <!--表格-->
          <el-table :data="modelData" border style="width: 100%">
            <el-table-column prop="model" label="模块名称" width="180"></el-table-column>
            <el-table-column prop="belongProject" label="所属项目"></el-table-column>
            <el-table-column prop="createTime" label="模块创建时间"></el-table-column>
            <el-table-column prop="createPerson" label="模块创建人"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <div style="margin-top: 10px;float:right">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div>
      <el-dialog :title="dailogTitleType + '模块'" :visible.sync="dialogFormVisible">
        <el-form :model="modelform" :rules="rules" label-width="80px">

          <el-form-item label="所属项目" prop="product">
            <el-select v-model="modelform.product" placeholder="请选择所属项目" style="width: 100%" >
              <el-option v-for="item in soureproduct" :key="item.name" :label="item.name" :value="item.id"
                         ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模块名称" prop="name" class="modelcs" >
            <el-select v-model="modelform.name" style="width: 100%"  multiple filterable allow-create default-first-option placeholder="请输入模块名称"></el-select>
          </el-form-item>
          <el-form-item label="模块描述">
            <el-input v-model="modelform.desc" placeholder="输入描述"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="addpro">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>

  import { sourceprojectList } from "../../api/api";

  export default {
    data() {
      return {
        modelName: "",
        dialogFormVisible: false,
        dailogTitleType: "",
        modelData: [],
        modelform: {
          product: '',
          name: [],
          desc: ''
        },
        soureproduct: "",
        rules: {
          name: [{required: true, message: "请输入模块名称"}],
          product: [{required: true, message: "请选择所属项目"}]
        },
      }
    },

    methods: {

      // 搜索按钮
      searchModel() {

      },

      // 清空按钮
      clearModelBtn() {
        this.modelName = "";
        // 刷新列表
      },

      // 新增模块弹窗
      addModel() {
        this.dialogFormVisible = true;
        this.dailogTitleType = "新增";
        this.SoureceProject();
      },

      // 关闭新增弹窗
      quxiao() {
        this.is_edit = false
        this.edit_id = -1
        this.modelform = {
          name: "",
          product: "",
          create_user: "",
        }
        this.dialogFormVisible = false
      },

      // 新增模块事件
      addpro() {
      },

      SoureceProject() {
        sourceprojectList().then(res => {
          console.log(res.data.data)
          this.soureproduct = res.data.data
        })
      },
    }
  }
</script>

<style scoped>
  
</style>


<style>
  .el-select >.el-select__tags >.el-tag >.el-tag--info {
      /* background-color: #f6ffed; */
      /* border-color: #b7eb8f; */
      /* color: #52c41a; */
      color: #52c41a;
      background: #f6ffed;
      border-color: #b7eb8f;
  }
</style>
