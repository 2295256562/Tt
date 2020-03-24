<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item>接口用例</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">
      <div style="width: 100%; height: 60px">
        <el-input v-model="caseNo" size="small" style="width: 180px" placeholder="用例编号"
                  @keyup.enter.native="search"></el-input>
        <el-input v-model="caseName" size="small" style="width: 180px" placeholder="用例名称"
                  @keyup.enter.native="search"></el-input>
        <el-input v-model="caseUrl" size="small" style="width: 180px" placeholder="用例url"
                  @keyup.enter.native="search"></el-input>
        <!--        <el-select v-model="belongProject" filterable placeholder="所属项目" size="small">-->
        <!--          <el-option v-for="item in belongProjectlist" :key="item.value" :label="item.label"-->
        <!--                     :value="item.value"></el-option>-->
        <!--        </el-select>-->
        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="clearBtn">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addCase">新增</el-button>
        <el-button style="margin-left: 10%; width: 150px" type="info" @click="batchExecute" size="small"
                   :disabled="this.sels.length === 0">批量测试
        </el-button>
      </div>

      <div class="tab">
        <!--表格-->
        <el-table :data="apicaseData"  border style="width: 100%; height: 90%" size="small"
                  @selection-change="selsChange" ref="table">
          <el-table-column fixed type="selection" size="small" width="55"></el-table-column>
          <el-table-column prop="case_name" width="200" size="small" label="用例名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="project_name" label="所属项目" width="160" size="small"></el-table-column>
          <el-table-column prop="model" label="所属模块" width="160" size="small"></el-table-column>
          <el-table-column prop="url" width="240" label="用例url" size="small"></el-table-column>
          <el-table-column prop="method" label="请求类型" width="80" size="small">
            <template slot-scope="scope" size="small">
                <el-tag v-if="scope.row.method==='1'" effect="dark" type="success">GET</el-tag>
                <el-tag v-else-if="scope.row.method==='2'" effect="dark" type="danger">POST</el-tag>
                <el-tag v-else-if="scope.row.method==='3'" effect="dark" type="warning">PUT</el-tag>
                <el-tag v-else effect="dark" type="info">PUT</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="params" width="400" label="请求参数" size="small" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="checkText" width="400" label="校验参数" size="small" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
<!--              <el-button @click="handleClick(scope.row)" type="text" size="small">测试</el-button>-->
              <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
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


    <div>
      <el-dialog title="发起测试" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">

        <div style="height: 36px">
          <div style="float: left; text-align: center; line-height: 36px">测试环境：</div>
          <div>
            <el-radio-group v-model="ENV" size="medium">
              <el-radio-button v-for="item in ENVList" :label="item.envAddres" :key="item.envName">{{ item.envName}}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div style="padding-top: 20px; height: 400px">
          <el-table :data="dialogTabel" border style="width: 100%;height: 100%" row-key="id">
            <el-table-column width="60px" label="序号" type="index"></el-table-column>
            <el-table-column prop="id" label="用例编号"></el-table-column>
            <el-table-column prop="project_name" label="所属项目"></el-table-column>
            <el-table-column prop="model" label="所属模块"></el-table-column>
            <el-table-column prop="case_name" label="用例名称"></el-table-column>
            <el-table-column prop="url" label="用例url"></el-table-column>

          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" class="iconfont icon-faqi" @click="SendTestHandle">发起测试</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>

    import {ListApicase, searchCase, projectInfo, listAPiInter, testTask } from '../../api/api';
    import Sortable from 'sortablejs';
    import draggable from 'vuedraggable';


    export default {
        created() {
            this.ListApicases();
        },

        data() {
            return {
                apicaseData: [],
                caseNo: null,
                caseName: null,
                caseUrl: null,
                belongProject: '',
                belongProjectlist: [],
                handlepage: 1,
                total: 0,
                sels: [],//选中的值显示
                dialogVisible: false,

                ENV: '',    //测试环境
                ENVList: '',  // 环境list
                dialogTabel: [],
            }
        },

        computed: {
            canUseMethods() {
                const {method} = this.apicaseData;
                const GET = '1';
                const POST = '2';
                const PUT = '3';
                const DELETE = '4';

                if (method === GET) {
                    return [{type: 'success', label: 'GET'}]
                }
                return []
            },
        },

        components: {
            draggable,
            Sortable,
        },

        methods: {
            addCase() {
                this.$router.push({name: 'APITest'});
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.ListApicases()
            },

            // 接口用例列表
            ListApicases() {
                ListApicase(this.handlepage).then(res => {
                    this.apicaseData = res.data.data.results;
                    this.total = res.data.data.count;
                })
            },

            // 搜索事件
            search() {
                const obj = {
                    id: this.caseNo,
                    case_name: this.caseName,
                    url: this.caseUrl,
                    project_id: null
                };
                searchCase(obj).then(res => {
                    // console.log(res.data.data, '22')
                    this.apicaseData = res.data.data.results;
                })
            },

            // 清空按钮事件
            clearBtn() {
                this.caseUrl = null;
                this.caseName = null;
                this.caseNo = null;
                this.ListApicases();
            },

            // 编辑事件
            editClick(row) {
                this.$router.push({
                    path: '/APITest',
                    query: {
                        id: row.id
                    }
                })
            },

            selsChange(sels) {
                this.sels = sels
            },

            // 批量执行
            batchExecute(row) {
                const ids = this.sels.map(item => item.id);//获取所有选中行的id组成的字符串，以逗号分隔
                console.log(ids)
                const projectid = this.sels.map(item => item.project_id);
                console.log(projectid)
                this.dialogVisible = true;
                // 根据项目id找到对应的环境返回
                // console.log(row.id)
                projectInfo(projectid[0]).then(res => {
                    // console.log(res.data.data)
                    this.ENVList = res.data.data.project_address
                });

                listAPiInter(ids).then(res => {
                    console.log(res.data.data)
                    this.dialogTabel = res.data.data
                })
            },

            // 发起测试点击事件
            SendTestHandle() {
                const  ids = this.sels.map(item => item.id);
                const projectid = this.sels.map(item => item.project_id);
                const project_name = this.sels.map(item => item.project_name);

                // console.log(ids)
                const  obj = {
                    'env': this.ENV,
                    'envname':this.ENVList,
                    'ids': ids,
                    'projectid': projectid[0],
                    'project_name':project_name[0]
                };
                testTask(obj).then(res => {
                    console.log(res.data);
                    this.dialogVisible = false;
                    this.$notify({message: res.data.data, type: 'success'})
                })
            },

            // 测试事件
            async handleClick(row) {
                this.dialogVisible = true;
                // console.log(row.id)
                // console.log(row)
                // console.log(row.project_id) // 项目id

                // 根据项目id找到对应的环境返回
                await projectInfo(row.project_id).then(res => {
                    // console.log(res.data.data)
                    this.ENVList = res.data.data.project_address
                });

                await listAPiInter(row.id).then(res => {
                    console.log(res.data.data)
                    this.dialogTabel = res.data.data
                })
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },



        },

        mounted() {
            // 表格中需要实现行拖动，所以选中tr的父级元素
            // const table = document.querySelector('.el-table__body-wrapper tbody')
            let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            const self = this
            Sortable.create(el, {
                onEnd({newIndex, oldIndex}) {
                    console.log(newIndex, oldIndex)
                    const targetRow = self.dialogTabel.splice(oldIndex, 1)[0]
                    self.dialogTabel.splice(newIndex, 0, targetRow)
                }
            })
        }
    }
</script>

<style scoped>

</style>
