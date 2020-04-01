<template>
  <div style="height: 85%">
    <!--面包屑-->
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item>测试报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">
      <!--筛选项-->
      <div style="width: 100%; height: 60px; ">
        <el-input v-model="TaskNo" size="small" style="width: 180px" placeholder="任务编号"
                  @keyup.enter.native="search"></el-input>
        <el-input v-model="Operator" size="small" style="width: 180px" placeholder="执行人员"
                  @keyup.enter.native="search"></el-input>
        <el-input v-model="TaskEnv" size="small" style="width: 180px" placeholder="任务环境"
                  @keyup.enter.native="search"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="clearBtn">清空</el-button>
      </div>

      <!--表格-->
      <div class="tab">
        <!-- 表格 -->
        <el-table :data="reportData"  border style="width: 100%;height: 90%" header-align="center">
          <el-table-column prop="R_Number" label="任务编号" width="300" align="center"></el-table-column>
          <el-table-column prop="R_project" label="所属项目" align="center" width="220"></el-table-column>
          <el-table-column prop="R_Env" label="执行环境" align="center"></el-table-column>
          <el-table-column prop="R_Type" label="任务类型" align="center" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.R_Type===1" type="success">即时任务</el-tag>
              <el-tag v-else-if="scope.row.R_Type===2" type="warning">定时任务</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_user" label="执行人员" align="center"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center" width="200"></el-table-column>
          <el-table-column prop="R_Status" label="任务状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.R_Status===1" effect="dark" type="info">未开始</el-tag>
              <el-tag v-else-if="scope.row.R_Status===2" effect="dark" type="">进行中</el-tag>
              <el-tag v-else-if="scope.row.R_Status===3" effect="dark" type="success">已完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="测试报告" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">点击查看报告</el-button>
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
    import {reportlist} from '../../api/api'

    export default {

        created() {
            this.ListRep()
        },

        data() {
            return {
                TaskNo: "",   //任务编号
                Operator: "",  // 执行人员
                TaskEnv: "",   //执行环境

                reportData: [],   // 表格数据
                handlepage: 1,
                total: 0,
            }
        },

        methods: {

            // 搜索接口
            search() {
            },

            // 清空事件
            clearBtn() {
                this.TaskNo = null;
                this.Operator = null;
                this.TaskEnv = null;
            },

            // 点击报告详情
            handleClick(row) {
                this.$router.push({
                    name: 'info',
                    query: {id: row.id}
                })
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.ListRep()
            },

            // 报告列表
            ListRep() {
                reportlist(this.handlepage).then(res => {
                    this.reportData = res.data.data.results;
                    this.total = res.data.data.count;
                })
            },

        }
    }
</script>

<style scoped>

</style>
