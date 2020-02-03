<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>模块列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="productdiv">
      <div style="width: 100%;height: 60px;">
        <span>模块名称:</span>
        <el-input v-model="modelName" size="small" style="width: 180px" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible=true">新增
        </el-button>
      </div>
      <div>
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
      <div style="margin-top: 10px;float:right">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modelName:"",
        modelData:[{}]
      }
    },

    methods: {

    }
  }
</script>

<style scoped>

</style>
