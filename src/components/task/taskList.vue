<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>定时任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">
      <!--筛选项-->
      <!--      <div style="width: 100%; height: 60px; ">-->
      <!--        <el-input v-model="TaskNo" size="small" style="width: 180px" placeholder="任务编号"-->
      <!--                  @keyup.enter.native="search"></el-input>-->
      <!--        <el-input v-model="Operator" size="small" style="width: 180px" placeholder="执行人员"-->
      <!--                  @keyup.enter.native="search"></el-input>-->
      <!--        <el-input v-model="TaskEnv" size="small" style="width: 180px" placeholder="任务环境"-->
      <!--                  @keyup.enter.native="search"></el-input>-->
      <!--        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>-->
      <!--        <el-button type="primary" size="small" icon="el-icon-delete" @click="clearBtn">清空</el-button>-->
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addTask">新增任务</el-button>
      <!--      </div>-->

      <!--表格-->
      <div style="padding-top: 20px" class="tab">
        <!-- 表格 -->
        <el-table :data="taskData"  border style="width: 100%;height: 90%" header-align="center" >
          <el-table-column prop="name" label="任务名称" width="300" align="center"></el-table-column>
          <el-table-column prop="task" label="任务类型" align="center" width="220"></el-table-column>
          <el-table-column prop="args" label="任务参数" width="400" align="center" :show-overflow-tooltip="true"></el-table-column>
<!--          <el-table-column prop="R_Type" label="任务类型" align="center" width="120">-->
<!--            <template slot-scope="scope">-->
<!--              <el-tag v-if="scope.row.R_Type===1" type="success">即时任务</el-tag>-->
<!--              <el-tag v-else-if="scope.row.R_Type===2" type="warning">定时任务</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column prop="description" label="任务描述" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="date_changed" label="创建时间" align="center" width="200"></el-table-column>
<!--          <el-table-column prop="R_Status" label="任务状态" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              <el-tag v-if="scope.row.R_Status===1" effect="dark" type="info">未开始</el-tag>-->
<!--              <el-tag v-else-if="scope.row.R_Status===2" effect="dark" type="">进行中</el-tag>-->
<!--              <el-tag v-else-if="scope.row.R_Status===3" effect="dark" type="success">已完成</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="测试报告" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
    import {TimeTaskList} from '../../api/api'

    export default {

        created() {
            this.TaskList()
        },
        data() {
            return {
                taskData: [],
                handlepage: 1,
                total: 0,
            }
        },

        methods: {
            // 跳转新增任务页
            addTask() {
                this.$router.push({path: 'addTask'})
            },

            // 分页角标
            handleCurrentChange(val) {
                this.handlepage = val;
                this.TaskList()
            },

            // 任务列表
            TaskList() {
                TimeTaskList(this.handlepage).then(res => {
                    // console.log(res.data)
                    this.taskData = res.data.data.results
                })
            },

            // 编辑事件
            handleClick() {},
        }
    }
</script>

<style scoped>

</style>
