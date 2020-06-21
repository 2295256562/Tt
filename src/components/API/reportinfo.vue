<template>
  <div style="height: 100%">
    <div class="topdiv" style="background-color: whitesmoke">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'APIreport' }">测试报告</el-breadcrumb-item>
        <el-breadcrumb-item>测试详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header" style="display: flex">
      <div style="width: 60%; float: left" class="mar">
        <div>任务编号: {{TaskNo}}</div>
        <div>开始时间: {{R_StartTime}}</div>
        <div>结束时间: {{R_EndTime}}</div>
        <div>用例统计: {{R_CaseSum}}<span style="font-size: 16px">总数</span> {{R_CasePass}}<span
          style="color: #52c41a;font-size: 16px">成功</span> {{R_CaseFail}}<span
          style="color: red;font-size: 16px">失败</span></div>
      </div>
      <div class="report" id="c2"></div>

    </div>

    <div class="content">
      <div class="taskResult">
        <div style="height: 20px;padding-left: 40px;line-height: 40px;">任务结果</div>
        <el-divider></el-divider>
        <div style="overflow-y: auto; height: 540px;">
          <el-table :data="tableData" style="width: 100%" size="small" :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div style="padding: 6px">
                  <el-tag type="danger" v-if="props.row.case_method === '2'">POST</el-tag>
                  <el-tag type="success" v-if="props.row.case_method === '1'">GET</el-tag>
                  <span style="padding-left: 4px">{{ props.row.case_url }}</span>
                </div>

                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick"
                         style="height: 400px;overflow:auto">
                  <el-tab-pane label="请求参数" name="first">
                    <div style="display: flex">
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; float: left">
                        <div
                          style="border-bottom: Window solid 1px; height: 36px;text-align: center;    line-height: 36px">
                          请求Headers
                        </div>
                        <json-view :data="props.row.case_headers" style="height: 100%;overflow: auto"/>
                      </div>
                      <div style=" width: 46%; height: 328px; border: Window 1px solid; margin-left: 10%">
                        <div
                          style="border-bottom: Window solid 1px; height: 36px;text-align: center;    line-height: 36px">
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
                          预期结果
                        </div>
                        <json-view :data="props.row.case_expect" style="height: 100%;overflow: auto"/>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="执行日志" name="third">
                    <div class="text-wrapper" style="color:red,font-size:18px">
                      <div v-for="(item, index) in props.row.case_log">{{item}}</div>

                    </div>
                  </el-tab-pane>
                </el-tabs>
              </template>
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
    import {reportinfo, caseReport} from '../../api/api'
    import jsonEditor from "../jsonEdit";
    import jsonView from 'vue-json-views';
    import {Chart} from '@antv/g2';


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

        mounted() {
            this.draw()
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
                this.draw()
            },

            // 获取用例详情
            GetCaseListInfo() {
                const ids = this.TaskNo;
                caseReport(ids).then(res => {
                    this.tableData = res.data.data.results.map(it => {
                        it.case_log = it.case_log.split('</br>')
                        return it
                    });
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

            draw() {
                const data = [
                    {item: '事例一', count: 40, percent: 0.4},
                    {item: '事例二', count: 21, percent: 0.21},
                    {item: '事例三', count: 17, percent: 0.17},
                    {item: '事例四', count: 13, percent: 0.13},
                    {item: '事例五', count: 9, percent: 0.09},
                ];
                const chart = new Chart({
                    container: 'c2',
                    autoFit: true,
                    height: 80,
                    width:80
                });
                chart.data(data);

                chart.coordinate('theta', {
                    radius: 0.75,
                    innerRadius: 0.6,
                });

                // 辅助文本
                chart
                    .interval()
                    .adjust('stack')
                    .position('percent')
                    .color('item');

                chart.interaction('element-active');

                chart.render();

            },

        },

        computed: {
            // resultSampleJson: function () {
            //     console.log(row.case_headers, 11111,)
            //     try {
            //         let objs = JSON.parse(this.tableData[0].case_headers);
            //         return JSON.stringify(objs, null, 4);
            //     } catch (error) {
            //         return this.resultSample;
            //     }
            //
            // },


        },
    }
</script>

<style scoped>
  .header {
    height: 18%;
    padding-left: 20px;
    padding-top: 20px;
    background-color: beige;
    /*border: red 0.5px solid;*/
  }

  .content {
    height: 76%;
    background-color: #dcdcdc;
    display: flex;
  }

  .taskResult {
    float: left;
    width: 50%;
    height: 94%;
    margin: 20px;
    background-color: #ffffff;
  }

  .taskchart {
    flex: 1;
    margin: 20px;
    width: auto;
    height: auto;
    background-color: #ffffff;
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
    background: #3cb371;
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

  .el-table__expanded-cell[class*='cell'] {
    /* padding: 20px 50px; */
    padding: 6px;
  }

  .text-wrapper {
    white-space: pre-wrap;
  }
</style>
