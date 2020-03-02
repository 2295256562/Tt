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
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addCase">新增
        </el-button>
      </div>

      <div>
        <!--表格-->
        <el-table :data="apicaseData" height="500" border style="width: 100%" size="small">
          <el-table-column type="selection" size="small" width="55"></el-table-column>
          <el-table-column fixed prop="case_name" width="150" label="用例名称"></el-table-column>
          <el-table-column prop="project_name" label="所属项目" width="80" size="small"></el-table-column>
          <el-table-column prop="model" label="所属模块" width="80"></el-table-column>
          <el-table-column prop="url" width="240" label="用例url"></el-table-column>
          <el-table-column prop="method" label="请求类型">
            <!--            <template slot-scope="scope">-->
            <el-tag v-for="item in canUseMethods" :key="item.label" :type="item.type" effect="dark">{{ item.label }}
            </el-tag>
            <!--            </template>-->
          </el-table-column>
          <el-table-column prop="params" width="300" label="请求参数"></el-table-column>
          <el-table-column prop="checkText" width="180" label="校验参数"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">测试</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div style="margin-top: 10px">
          <el-button @click="batchExecute">批量测试</el-button>
        </div>
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

    import {ListApicase, searchCase} from '../../api/api'

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

            // 批量执行
            batchExecute() {},
        }
    }
</script>

<style scoped>

</style>
