<template>
  <div style="height: 85%">
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>定时任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="productdiv">

      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addTask">新增任务</el-button>

      <!--表格-->
      <div style="padding-top: 20px" class="tab">
        <!-- 表格 -->
        <el-table :data="taskData" border style="width: 100%;height: 90%" header-align="center">
          <el-table-column prop="name" label="任务名称" width="300" align="center"></el-table-column>
          <el-table-column prop="task" label="任务类型" align="center" width="220"></el-table-column>
          <el-table-column prop="args" label="任务参数" width="400" align="center"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="description" label="任务描述" align="center"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="date_changed" label="创建时间" align="center" width="200"></el-table-column>
          <el-table-column label="测试报告" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="EditClick(scope.row)" type="text" size="small">编辑</el-button>
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
            EditClick(row) {
                this.$router.push({
                    path: 'addTask',
                    query: {
                        id: row.id
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
