<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>模块列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">
      <div style="width: 100%; height: 60px">
        <el-input v-model="caseNo" size="small" style="width: 180px" placeholder="用例编号"></el-input>
        <el-input v-model="caseName" size="small" style="width: 180px" placeholder="用例名称"></el-input>
        <el-input v-model="caseUrl" size="small" style="width: 180px" placeholder="用例url"></el-input>
        <el-select v-model="belongProject" filterable placeholder="所属项目" size="small">
          <el-option v-for="item in belongProjectlist" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchModel">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" @click="clearModelBtn">清空</el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addCase">新增
        </el-button>
      </div>

      <div>
        <!--表格-->
        <el-table :data="apicaseData" height="500" border style="width: 100%" size="small">
          <el-table-column type="selection" size="small" width="55"></el-table-column>
          <el-table-column fixed prop="project_name" label="所属项目" width="80" size="small"></el-table-column>
          <el-table-column prop="model" label="所属模块" width="80"></el-table-column>
          <el-table-column prop="case_name" width="150" label="用例名称"></el-table-column>
          <el-table-column prop="url" width="240" label="用例url"></el-table-column>
          <el-table-column prop="method" width="180" label="请求类型"></el-table-column>
          <el-table-column prop="params" width="300" label="请求参数"></el-table-column>
          <el-table-column prop="checkText" width="180" label="校验参数"></el-table-column>

<!--          <el-table-column prop="address" width="180" label="地址"></el-table-column>-->
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">测试</el-button>
              <el-button type="text" size="small">编辑</el-button>
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

    import {sourceprojectList, ListApicase} from '../../api/api'

    export default {
        created() {
            this.ListApicases();
        },

        data() {
            return {
                apicaseData: [],
                caseNo: '',
                caseName: '',
                caseUrl: '',
                belongProject: '',
                belongProjectlist: [],
                handlepage: 1,
                total: 0,
            }
        },

        methods: {
            addCase() {
                this.$router.push({name: 'APITest'});
            },

            //  sourceProjects() {
            //     sourceprojectList().then(res => {
            //         console.log(res.data.data);
            //         BelongProjectList = res.data.data;
            //         // console.log(this.belongProjectlist, '2222')
            //     })
            // },
            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.ListApicases()
            },

            ListApicases() {
                ListApicase(this.handlepage).then( res=>{
                    this.apicaseData = res.data.data.results;
                    this.total = res.data.data.count
                })
            }
        }
    }
</script>

<style scoped>

</style>
