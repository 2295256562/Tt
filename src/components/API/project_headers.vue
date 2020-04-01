<template>
  <div style="height: 92%">
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item>请求头管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">
      <el-table :data="HeadersData" border style="width: 100%; height: 90%">
        <el-table-column prop="project_name" label="所属项目" width="180" align="center"></el-table-column>
        <el-table-column prop="headers" label="请求头信息" align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <!--            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>


      <div style="margin-top: 10px;float:right">
        <el-pagination background layout="total, prev, pager, next" :total="total" :current-page.sync="handlepage"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>



      <el-dialog title="请求头设置" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">

        <div class="headerSet" id="headersID">
          <div v-for="(item, index) in HeadersList" :key="index" style="margin-top: 10px">
            <!--key-->
            <el-select v-model="item.headerSetKey" filterable allow-create default-first-option
                       placeholder="key"
                       size="mini" style="width: 45%">
              <el-option v-for="item in headersListkey" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>

            <!--value-->
            <el-input v-model="item.headersSetValue" placeholder="value" size="mini" style="width: 45%"></el-input>

            <!--是否启用-->
            <el-switch v-model="item.headersStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
          <div>
            <!--新增按钮 -->
            <el-button size="mini" type="primary" style="width:100%;margin-top: 10px" @click="addHeaders">新增请求头
            </el-button>
          </div>

        </div>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="headershandle">确 定</el-button>
        </span>
      </el-dialog>


  </div>
</template>

<script>
    import {headerslist, headersinfo} from '../../api/api'
    import $axios from "../../api/ajaxRequest";

    export default {
        created() {
            this.Headerslist()
        },

        data() {
            return {
                HeadersData: [],
                handlepage: 1,
                total: 0,
                HeadersList: [
                    {headerSetKey: '', headersSetValue: '', headersStatus: true,}
                ],
                headersListkey: [
                    {value: 'Accept', lable: 'Accept'},
                    {value: 'Referer', lable: 'Referer'},
                    {value: 'Cache-Control', lable: 'Cache-Control'},
                    {value: 'User-Agent', lable: 'User-Agent'},
                    {value: 'Host', lable: 'Host'},
                    {value: 'Content-Type', lable: 'Content-Type'}
                ],
                dialogVisible: false,
                editid: null,
            }
        },

        methods: {
            // 编辑事件
            handleEdit(row) {
                this.dialogVisible = true;
                console.log(row.id);
                this.editid = row.id;
                headersinfo(this.editid).then(res => {
                    // console.log(res.data.data)
                    this.HeadersList = res.data.data.headers
                })
            },

            // 列表
            Headerslist() {
                headerslist(this.handlepage).then(res => {
                    console.log(res.data.data);
                    this.HeadersData = res.data.data.results;
                    this.total = res.data.data.count;
                })
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.Headerslist()
            },

            //新增headers参数
            addHeaders() {
                this.HeadersList.push(
                    {headerSetKey: '', headersSetValue: '', headersStatus: true}
                );
                this.$nextTick(() => {
                    this.HoldBot('headersID')
                })
            },

            headershandle() {
                console.log(this.editid);
                console.log(this.HeadersList);
                const header = {
                    'headers': this.HeadersList
                };
                // put 接口
                $axios.put('updateHeaders/' + this.editid + '/', header).then(res => {
                    this.$message.success('修改成功');
                    this.editid = null;
                    this.dialogVisible = false;
                    this.Headerslist()
                })

            },

            handleClose() {},

            HoldBot(elementid) {
                const DIV = document.getElementById(elementid);
                DIV.scrollTop = DIV.scrollHeight;
            },
        },
    }
</script>

<style scoped>

</style>
