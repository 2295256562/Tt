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

        <!-- 筛选 -->
        <span>项目名称:</span>
        <el-input v-model="projectName" size="small" style="width: 180px" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="seachbtn">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="clearbtn">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="AddProject">新增
        </el-button>

        <!--新增弹窗-->
        <el-dialog title="新增项目" :visible.sync="dialogFormVisible" width="40%" top="10%" @close='closeDialog'
                   :before-close="handleClose" :title="dailogTitleType+'项目'" @open="open">
          <el-form :model="projectForm" label-width="80px" label-position="left" :inline="true"
          >
            <el-form-item label="项目名称:" prop="name">
              <el-input v-model="projectForm.project_name" size="small" style="width: 180px"
                        placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item :label="'项目环境'+ index" v-for="(item, index) in env" :key="index"
                          :model="projectForm.project_address">
              <el-input v-model="item.envName" size="small" style="width: 180px" placeholder="请输入项目环境名称"></el-input>
              <el-input v-model="item.envAddres" size="small" style="width: 180px" placeholder="请输入环境域名"></el-input>
              <el-button type="primary" size="small" @click="deleteAdders(index)">删除</el-button>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addAddres">新增环境</el-button>
            <el-button @click="dialogFormVisible = false ">取 消</el-button>
            <el-button type="primary" @click="addProjectApi">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="tab">
        <!-- 表格 -->
        <el-table :data="projectData"  border style="width: 100%; height: 90%" header-align="center" >
          <el-table-column prop="project_name" label="项目名称"  size="small" width="180" align="center"></el-table-column>
          <el-table-column prop="create_user" label="项目创建人" align="center" size="small"></el-table-column>
          <el-table-column prop="create_time" label="项目创建日期" align="center" size="small"></el-table-column>
          <el-table-column label="操作" align="center" size="small">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页-->
        <div style="margin-top: 10px;float:right">
          <el-pagination background layout="total, prev, pager, next" :total="total" :current-page.sync="handlepage"
                         @current-change="handleCurrentChange"></el-pagination>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
    import {addProject, projectList, projectInfo, Delproject, seachProject} from "../../api/api";
    import $axios from "../../api/ajaxRequest";


    export default {

        created() {
            this.Lproject()
        },

        data() {
            return {
                projectName: '',
                projectData: [],
                handlepage: 1,
                total: 0,
                dailogTitleType: "",
                env: [{envName: '', envAddres: ''}],
                dialogFormVisible: false,
                projectForm: {project_name: '', project_address: this.env},
                editid: null,
            };
        },


        methods: {
            //新增项目环境
            addAddres() {
                this.env.push(
                    {envName: '', envAddres: ''}
                )
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.Lproject()
            },

            // 项目搜索
            seachbtn() {
                seachProject(this.projectName).then(res => {
                    this.projectData = res.data.data.results;
                    this.total = res.data.data.count;
                })
            },

            // 清空按钮
            clearbtn() {
                this.projectName = '';
                this.Lproject()
            },

            //新增项目接口
            addProjectApi() {
                console.log(this.editid, '22');
                const obj = {
                    project_name: this.projectForm.project_name,
                    project_address: this.env
                };

                if (this.editid != null) {
                    $axios.put('u_project/' + this.editid + '/', obj).then(res => {
                        this.editid = null;
                        this.dialogFormVisible = false;
                        this.$message.success('修改成功');
                        this.Lproject()
                    })
                } else {
                    addProject(obj).then(res => {
                            this.dialogFormVisible = false;
                            this.$message.success('添加成功');
                            this.Lproject()
                        }
                    )
                }

            },

            // 新增项目弹窗
            AddProject() {
                this.dialogFormVisible = true;
                this.dailogTitleType = "新增"
            },

            // 编辑项目弹窗
            handleEdit(row) {
                console.log(row.id);
                this.editid = row.id;
                this.dailogTitleType = "编辑";
                this.dialogFormVisible = true;
                this.projectRev(row.id)
            },

            // 项目详情 project
            projectRev(row) {
                projectInfo(row).then(res => {
                    console.log(res.data.data);
                    this.projectForm = res.data.data;
                    this.env = res.data.data.project_address
                })
            },

            // 删除项目
            handleDelete(row) {
                Delproject(row.id).then(res => {
                    this.$message.success("删除成功");
                    this.Lproject()
                })
            },

            //项目列表
            Lproject() {
                projectList(this.handlepage).then(res => {
                    // console.log(res.data.data);
                    this.projectData = res.data.data.results;
                    this.total = res.data.data.count;

                })
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
                this.dialogFormVisible = false
            },
            open() {
                this.env = [{envName: '', envAddres: ''}],
                    this.projectForm = {
                        project_address: [],
                        projectName: ''
                    }
            }
        }
    }
</script>

<style scoped>

</style>
