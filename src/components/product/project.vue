<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <div class="productdiv">
    <div style="width: 100%;height: 60px;">
      <span>项目名称:</span>
      <el-input v-model="projectName" size="small" style="width: 180px" placeholder="请输入内容"></el-input>
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible=true">新增
      </el-button>

      <!--新增弹窗-->
      <el-dialog title="新增项目" :visible.sync="dialogFormVisible" width="40%" top="10%" @close='closeDialog'
                 :before-close="handleClose" v-if="dialogFormVisible">
        <el-form :model="projectForm" label-width="80px" label-position="left" :inline="true" :rules="rulesprojectForm">
          <el-form-item label="项目名称:" prop="name">
            <el-input v-model="projectForm.name" size="small" style="width: 180px" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item :label="'项目环境'+ index" v-for="(item, index) in env" :key="index" :model="projectForm.address">
            <el-input v-model="item.envName" size="small" style="width: 180px" placeholder="请输入项目环境名称"></el-input>
            <el-input v-model="item.envAddres" size="small" style="width: 180px" placeholder="请输入环境域名"></el-input>
            <el-button type="primary" size="small" @click="deleteAdders">删除</el-button>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAddres">新增环境</el-button>
          <el-button @click="dialogFormVisible = false ">取 消</el-button>
          <el-button type="primary" @click="addProjectApi">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-table :data="projectData" border style="width: 100%">
        <el-table-column prop="date" label="项目名称" width="180"></el-table-column>
        <el-table-column prop="address" label="项目创建人"></el-table-column>
        <el-table-column prop="address" label="项目创建日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;float:right">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import { addProject } from "../../api/api";
  export default {
    data() {
      return {
        projectName: '',
        projectData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        env: [{envName: '', envAddres: ''}],
        dialogFormVisible: false,
        projectForm: {name: '', address: this.env}
      }
    },
    rulesprojectForm: {},

    methods: {
      //新增项目环境
      addAddres() {
        this.env.push(
          {envName: '', envAddres: ''}
        )
      },

      //新增项目接口
      addProjectApi() {
        console.log(1111);
        addProject(this.projectForm).then(
          console.log('1111')
        );
        dialogFormVisible = false
      },

      //删除项目环境
      deleteAdders(index) {
        this.env.splice(index, 1);
        if (this.env.length === 0) {
          this.env.push({envNmae: '', envAddres: ''});
          this.$message.warning("无法删除")
        }
      },

      // 销毁弹窗
      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
          done();
        }).catch(_ => {
        });
      },

      //关闭弹窗事件
      closeDialog(done) {
        done();
        const arr = this.env.map(_v => {
          _v.envNmae = '';
          _v.envAddres = '';
          return _v
        });
        this.projectForm = {name: '', address: ''};
        this.env = arr
      }
    }
  }
</script>

<style scoped>

</style>
