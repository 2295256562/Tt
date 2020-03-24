<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'taskList'}">定时任务</el-breadcrumb-item>
        <el-breadcrumb-item>新建任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="width: 40%;position:absolute;  left:30%; top:20%;overflow-y: auto; height:550px">
      <el-form ref="form" :model="taskForm" label-width="80px">
        <el-form-item label="任务名称:">
          <el-input v-model="taskForm.name" placeholder="请输入任务名称"></el-input>
        </el-form-item>

        <el-form-item label="项目名称:">
          <el-select v-model="taskForm.project" placeholder="请选择项目" @change="changeEnv">
            <el-option v-for="item in projectList" :key="item.id" :label="item.project_name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务描述:">
          <el-input type="textarea" v-model="taskForm.desc"></el-input>
        </el-form-item>

        <el-form-item label="定时任务:">
          <el-radio-group v-model="taskForm.task" size="medium">
            <el-radio-button label="每天"></el-radio-button>
            <el-radio-button label="每周"></el-radio-button>
            <el-radio-button label="自定义"></el-radio-button>
          </el-radio-group>
          <div style="margin-top: 10px">
            <template>
              <el-time-picker value-format="HH:mm" format="HH:mm" v-if="taskForm.task === '每天'" v-model="taskForm.time"
                              placeholder="任意时间点"></el-time-picker>
              <div v-if="taskForm.task === '每周'" style="display: flex; width: 220px">
                <el-select v-model="taskForm.week" placeholder="请选择" style="float: left; width: 180px">
                  <el-option v-for="item in options" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-time-picker value-format="HH:mm" format="HH:mm" v-model="taskForm.time"
                                placeholder="任意时间点"></el-time-picker>
              </div>

              <el-input v-if="taskForm.task === '自定义'" v-model="taskForm.time" placeholder="* * * * *"
                        style="width: 220px"></el-input>

            </template>
          </div>
        </el-form-item>

        <el-form-item label="执行环境:">
          <el-radio-group v-model="taskForm.env" size="medium">
            <el-radio-button v-for="item in ENVList" :label="item.envAddres" :key="item.envName">{{ item.envName}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="用例设置:">
          <el-transfer :titles="['测试用例', '任务用例']" v-model="taskForm.caseList" :data="caseList"></el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTask">保存</el-button>
          <el-button @click="revert">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
    import {sourceprojectList, projectInfo, searchCase, addTimeTask} from '../../api/api'

    export default {

        // 初始化方法
        created() {
            this.SoureceProject();
        },
        data() {

            return {

                // 表单内容
                taskForm: {
                    name: '',
                    project: '',
                    desc: '',
                    task: '每天',
                    time: '',
                    env: '',
                    caseList: [],
                    week: ''
                },
                // 项目名称
                projectList: [],
                options: [
                    {value: '0', label: '星期天'},
                    {value: '1', label: '星期一'},
                    {value: '2', label: '星期二'},
                    {value: '3', label: '星期三'},
                    {value: '4', label: '星期四'},
                    {value: '5', label: '星期五'},
                    {value: '6', label: '星期六'},
                ],
                ENVList: [],
                caseList: [],
                // caseS: "",
            }
        },
        methods: {

            // 项目列表
            SoureceProject() {
                sourceprojectList().then(res => {
                    this.projectList = res.data.data;
                })
            },

            changeEnv(selVal) {
                // 根据项目id查询项目设置的环境
                projectInfo(selVal).then(res => {
                    this.ENVList = res.data.data.project_address
                });

                // 更加项目id查询当前项目的所有case
                const obj = {
                    project_id: selVal
                };
                searchCase(obj).then(res => {
                    res.data.data.results.forEach(item => {
                        this.caseList.push({
                            key: item.id,
                            label: item.case_name,
                        })
                    });
                });
            },

            addTask() {
                // console.log(this.taskForm.caseList);
                const arr = this.taskForm.caseList;
                let  str = [];
                str = arr.map(item => item).sort();
                console.log(str);

                const obj = {
                    name : this.taskForm.name,
                    project: this.taskForm.project,
                    desc: this.taskForm.desc,
                    task :this.taskForm.task,
                    time: this.taskForm.time,
                    env: this.taskForm.env,
                    caseList : str,
                    week: this.taskForm.week,
                    envname: this.ENVList
                }
                addTimeTask(obj).then(res =>{
                    // console.log(res.data.data )
                    if (res.data.code === '000000'){
                        this.$router.push({path: 'taskList'})
                        this.$message.success("任务添加成功")
                    }else {
                        this.$message.info(res.data.data)
                    }
                })
            },

            revert() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>


<style>
  .el-select {
    /*width: 100%;*/
  }

  .el-transfer__buttons {
    width: 60px;
  }

  .el-button + .el-button {
    /*padding-left: 0px;*/
  }

  .el-transfer__buttons > .el-button + .el-button {
    margin-left: 0;
  }
</style>
