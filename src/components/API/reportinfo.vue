<template>
  <div style="height: 100%">
    <div class="topdiv" style="background-color: whitesmoke">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'APIreport' }">测试报告</el-breadcrumb-item>
        <el-breadcrumb-item>测试详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="header">
      <div style="width: 60%" class="mar">
        <div>任务编号: {{TaskNo}}</div>
        <div>开始时间: {{R_StartTime}}</div>
        <div>结束时间: {{R_EndTime}}</div>
        <div>用例统计: {{R_CaseSum}}<span style="font-size: 16px">总数</span> {{R_CasePass}}<span
          style="color: #52c41a;font-size: 16px">成功</span> {{R_CaseFail}}<span
          style="color: red;font-size: 16px">失败</span></div>
      </div>
    </div>


    <div class="content">
      <div class="taskResult">
        <div style="height: 20px;padding-left: 40px;line-height: 40px;">任务结果</div>
        <el-divider></el-divider>
        <div style="overflow-y: auto; height: 62vh;">
          <el-table :data="tableData" style="width: 100%" size="small" :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div style="padding: 6px">
                  <el-tag type="danger" v-if="props.row.case_method === '2'">POST</el-tag>
                  <el-tag type="success" v-if="props.row.case_method === '1'">GET</el-tag>
                  <span style="padding-left: 4px">{{ props.row.case_url }}</span>
                </div>

                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 400px">
                  <el-tab-pane label="请求参数" name="first">
                    <div style="display: flex">
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; float: left">
                        <div style="border-bottom: Window solid 1px; height: 36px;text-align: center;    line-height: 36px">
                          请求Headers
                        </div>
                        <json-view :data="props.row.case_headers" style="height: 100%;overflow: auto"/>
                      </div>
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; margin-left: 10%">
                        <div style="border-bottom: Window solid 1px; height: 36px;text-align: center;    line-height: 36px">
                          请求参数
                        </div>
                        <json-view :data="props.row.case_params" style="height: 100%;overflow: auto"/>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="返回参数" name="second">
                    <div style="display: flex">
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; float: left">
                        <div style="border-bottom: Window solid 1px; height: 36px;text-align: center;line-height: 36px">
                          实际返回
                        </div>
                        <json-view :data="props.row.case_response" style="height: 100%;overflow: auto"/>
                      </div>
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; margin-left: 10%">
                        <div style="border-bottom: Window solid 1px; height: 36px;text-align: center;line-height: 36px">
                          请求参数
                        </div>
                        <json-view :data="props.row.case_params" style="height: 100%;overflow: auto"/>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="执行日志" name="third">角色管理</el-tab-pane>
                </el-tabs>
              </template>
              <!--              <template slot-scope="props">-->
              <!--                <el-form label-position="left" inline class="demo-table-expand">-->
              <!--                  <el-form-item label="用例名称">-->
              <!--                    <span>{{ props.row.case_name }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="用例url">-->
              <!--                    <span>{{ props.row.url }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="请求方式">-->
              <!--                    <span>{{ props.row.method }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="店铺 ID">-->
              <!--                    <span>{{ props.row.shopId }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="商品分类">-->
              <!--                    <span>{{ props.row.category }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="店铺地址">-->
              <!--                    <span>{{ props.row.address }}</span>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="商品描述">-->
              <!--                    <span>{{ props.row.desc }}</span>-->
              <!--                  </el-form-item>-->
              <!--                </el-form>-->
              <!--              </template>-->
            </el-table-column>
            <el-table-column label="" prop="case_name" size="small"></el-table-column>
          </el-table>
        </div>

      </div>
      <div class="taskchart"></div>
    </div>
  </div>
</template>

<script>
    import {reportinfo, listAPiInter, caseReport} from '../../api/api'
    import jsonEditor from "../jsonEdit";
    import jsonView from 'vue-json-views';

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
                R_CasePass: '',
                R_CaseFail: '',

                reportID: "",
                tableData: [],
                activeName: 'first',
                resultSample: ""
            }
        },

        components: {
            jsonEditor,
            jsonView
        },
        methods: {

            // 报告详情
            async Reportinfo() {
                this.id = this.$route.query.id;
                const res = await reportinfo(this.id)
                this.TaskNo = res.data.data.R_Number;
                this.R_StartTime = res.data.data.R_StartTime;
                this.R_EndTime = res.data.data.R_EndTime;
                this.R_CaseSum = res.data.data.R_CaseSum;
                this.R_CasePass = res.data.data.R_CasePass;
                this.R_CaseFail = res.data.data.R_CaseFail;
                this.GetCaseListInfo()
            },

            // 获取用例详情
            GetCaseListInfo() {
                const ids = this.TaskNo;
                caseReport(ids).then(res => {
                    this.tableData = res.data.data.results;
                })
            },

            // 根据状态展示不同底纹
            tableRowClassName({row, rowIndex}) {
                // console.log(row)
                if (row.case_stauts === "失败") {
                    return 'error-row';
                } else if (row.case_stauts === "成功") {
                    return 'success-row';
                }
                return '';
            },

            handleClick() {
            },

        },

        computed: {
            resultSampleJson: function () {
                console.log(row.case_headers, 11111,)
                try {
                    let objs = JSON.parse(this.tableData[0].case_headers);
                    return JSON.stringify(objs, null, 4);
                } catch (error) {
                    return this.resultSample;
                }

            }

        },
    }
</script>

<style scoped>
  .header {
    /*width: 100%;*/
    height: 100px;
    padding-left: 20px;
    padding-top: 20px;
    background-color: whitesmoke;
    /*border: red 0.5px solid;*/
  }

  .content {
    height: 82%;
    background-color: #DCDCDC;
    display: flex;
  }

  .taskResult {
    float: left;
    width: 50%;
    height: 94%;
    margin: 20px;
    background-color: #FFFFFF;
  }

  .taskchart {
    flex: 1;
    margin: 20px;
    width: auto;
    height: auto;
    background-color: #FFFFFF;
  }


</style>
<style>
  .content {
    background-color: red;
  }

  .header > .mar div {
    padding-top: 10px;
  }

  .el-table .error-row {
    background: red;
  }

  .el-table .success-row {
    background: #3CB371;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 52%;
  }

  .el-table__expanded-cell[class*=cell] {
    /* padding: 20px 50px; */
    padding: 6px;
  }
</style>
