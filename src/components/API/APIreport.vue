<template>
  <div>
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
      <div>
        <!-- 表格 -->
        <el-table :data="reportData" height="500" border style="width: 100%;" header-align="center">
          <el-table-column prop="TaskNo" label="任务编号" width="300" align="center"></el-table-column>
          <el-table-column prop="TaskEnv" label="执行环境" align="center"></el-table-column>
          <el-table-column prop="create_user" label="执行人员" align="center"></el-table-column>
          <el-table-column prop="create_time" label="执行时间" align="center"></el-table-column>
          <el-table-column prop="TaskState" label="任务状态" align="center"></el-table-column>
          <el-table-column label="测试报告" width="140">
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
    export default {
        data() {
            return {
                TaskNo: "",   //任务编号
                Operator: "",  // 执行人员
                TaskEnv: "",   //执行环境

                reportData: [],   // 表格数据
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

            // 点击查看时间
            handleClick() {
            },

        }
    }
</script>

<style scoped>

</style>
