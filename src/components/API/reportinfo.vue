<template>
  <div style="background-color: #999999">
    <div class="topdiv" style="background-color: whitesmoke">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'APIreport' }">测试报告</el-breadcrumb-item>
        <el-breadcrumb-item>测试详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <div class="header">
        <div style="width: 60%" class="mar">
          <div>任务编号: {{TaskNo}}</div>
          <div>开始时间: {{R_StartTime}}</div>
          <div>结束时间: {{R_EndTime}}</div>
          <div>用例统计: {{R_CaseSum}}<span style="font-size: 16px">总数</span>     {{R_CasePass}}<span style="color: #52c41a;font-size: 16px">成功</span>    {{R_CaseFail}}<span style="color: red;font-size: 16px">失败</span></div>
        </div>
      </div>
      <div class="content">
<!--        <div style="margin:10px ;float: left; width: 50%;height: 500px;background-color: whitesmoke">-->
      </div>
    </div>
  </div>
</template>

<script>
    import {reportinfo} from '../../api/api'

    export default {

        created() {
            this.Reportinfo()
        },
        data() {
            return {
                id: null,
                TaskNo: '',
                R_StartTime: '',
                R_EndTime: '',
                R_CaseSum: '',
                R_CasePass:'',
                R_CaseFail:''
            }
        },

        methods: {

            // 报告详情
            Reportinfo() {
                this.id = this.$route.query.id;
                // console.log(this.id)
                reportinfo(this.id).then(res => {
                    // console.log(res.data.data)
                    this.TaskNo = res.data.data.R_Number;
                    this.R_StartTime = res.data.data.R_StartTime;
                    this.R_EndTime = res.data.data.R_EndTime;
                    this.R_CaseSum = res.data.data.R_CaseSum;
                    this.R_CasePass = res.data.data.R_CasePass;
                    this.R_CaseFail = res.data.data.R_CaseFail;
                })
            },
        }
    }
</script>

<style scoped>
  .header {
    /*width: 100%;*/
    height: 160px;
    padding-left: 20px;
    padding-top: 20px;
    background-color: whitesmoke;
    /*border: red 0.5px solid;*/
  }

  .content {
    height: 475px;
    background-color: #999999;
    display: flex;
  }


</style>
<style>
  .content {
    background-color: red;
  }
  .header >.mar div {
    padding-top: 10px;
  }
</style>
