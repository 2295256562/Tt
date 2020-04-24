<template>
  <div style="height: 85%">
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
        <el-button type="primary" size="small" icon="el-icon-delete" @click="clearModelBtn">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addModel">新增</el-button>
        <!--弹窗-->
        <el-dialog :title="dailogTitleType + '模块'" :visible.sync="dialogFormVisible">
          <el-form :model="modelform" :rules="rules" label-width="80px">

            <el-form-item label="所属项目" prop="product">
              <el-select v-model="modelform.project_id" placeholder="请选择所属项目" style="width: 100%">
                <el-option v-for="item in soureproduct" :key="item.id" :label="item.project_name" :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="模块名称" prop="name" class="modelcs">
              <el-select v-model="modelform.model_name" style="width: 100%" multiple filterable allow-create
                         default-first-option placeholder="请输入模块名称">
                <el-option v-for="item in optionsModel" :key="item" :label="item" :value="item">{{item}}</el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="模块描述">-->
<!--              <el-input :rows="2" type="textarea" v-model="modelform.desc" placeholder="输入描述"></el-input>-->
<!--            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="quxiao">取 消</el-button>
            <el-button type="primary" @click="addpro">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="tab">
        <!--表格-->
        <el-table :data="modelData" border style="width: 100%; height: 90%" header-align="center">
          <el-table-column prop="project_name" label="所属项目" width="140" align="center" size="small"></el-table-column>
          <el-table-column prop="model_name" label="模块名称" align="center" size="small">
            <template slot-scope="scope">
              <div>
                <el-tag v-for="item in scope.row.model_name.split(',')" :key="item" style="margin-right: 5px">
                  {{item}}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="模块创建时间" align="center" width="180" size="small"></el-table-column>
          <el-table-column prop="create_user" label="模块创建人" align="center" width="180" size="small"></el-table-column>
          <el-table-column label="操作" align="center" width="180" size="small">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <div style="margin-top: 10px;float:right">
          <el-pagination background layout="total, prev, pager, next" :total="total" :current-page.sync="handlepage"
                         @current-change="handleCurrentChange"></el-pagination>
        </div>

      </div>
    </div>


  </div>

</template>

<script>

    import {sourceprojectList, addModel, modelList, delModel, modelInfo} from "../../api/api";
    import $axios from "../../api/ajaxRequest";

    export default {

        created() {
            this.MmodelList();
        },

        data() {
            return {
                modelName: "",
                dialogFormVisible: false,
                dailogTitleType: "",
                modelData: [],
                modelform: {
                    // project_name: '',
                    project_id: null,
                    model_name: "",
                    // desc: ''
                },
                soureproduct: [],
                handlepage: 1,
                total: 0,
                optionsModel: [],
                editid: null,
                rules: {
                    name: [{required: true, message: "请输入模块名称", trigger: 'blur'}],
                    product: [{required: true, message: "请选择所属项目", trigger: 'blur'}]
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
                this.is_edit = false;
                this.edit_id = -1;
                this.modelform = {
                    name: "",
                    product: "",
                    create_user: "",
                };
                this.dialogFormVisible = false
            },

            // 确定按钮事件
            addpro() {

                const obj = {
                    project_id: this.modelform.project_id,
                    model_name: this.modelform.model_name.join(','),
                    desc: this.modelform.desc
                };
                if (this.edit_id != null) {
                    // 修改
                    $axios.put('updateMod/' + this.edit_id + '/', obj).then(res => {
                        this.edit_id = null;
                        this.$message.success('修改成功');
                        this.dialogFormVisible = false;
                        this.MmodelList()
                    })
                } else {
                    addModel(obj).then(res => {
                        this.$message.success('添加成功');
                        this.dialogFormVisible = false;
                        this.MmodelList()
                    })
                }
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.MmodelList();
            },

            // 模块列表数据
            MmodelList() {
                modelList(this.handlepage).then(res => {
                    this.modelData = res.data.data.results;
                    this.total = res.data.data.count;
                })
            },

            // 所属项目
            SoureceProject() {
                sourceprojectList().then(res => {
                    this.soureproduct = res.data.data;
                })
            },

            // 删除模块
            handleDelete(row) {
                delModel(row.id).then(res => {
                    this.$message.success("删除成功");
                    this.MmodelList()
                })
            },

            // 编辑模块信息
            handleEdit(row) {
                this.edit_id = row.id;
                this.dialogFormVisible = true;
                this.dailogTitleType = '编辑';
                modelInfo(row.id).then(res => {
                    console.log(res.data.data, '22222222');
                    this.modelform = res.data.data;
                    this.modelform.project_id = res.data.data.project_name;
                    // console.log(res.data.data.model_name.split(','))
                    this.modelform.model_name = res.data.data.model_name.split(',')

                })
            },

        }
    }
</script>

<style scoped>

</style>


<style>
  .el-select > .el-select__tags > .el-tag > .el-tag--info {
    /* background-color: #f6ffed; */
    /* border-color: #b7eb8f; */
    /* color: #52c41a; */
    color: #52c41a;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
</style>
