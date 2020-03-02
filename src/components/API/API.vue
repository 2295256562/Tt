<template>
  <div>
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item>用例详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--表单区-->
    <div class="api-right">

      <el-form ref="form" :model="apiFrom" :rules="rules" label-width="80px">
        <div class="details">
          <el-divider content-position="left">基本信息</el-divider>

          <el-form-item label="用例名称" prop="case_name">
            <el-input v-model="apiFrom.case_name" size="small" placeholder="请输入用例名称" style="width: 88%"></el-input>
          </el-form-item>

          <div class="de-input">
            <span>所属项目:</span>
            <el-select v-model="apiFrom.project_id" filterable clearable placeholder="请选择所属项目" size="small"
                       style="padding-left: 10px;" @change="changeproject">
              <el-option v-for="item in BelongProjectList" :key="item.id" :label="item.project_name"
                         :value="item.id"></el-option>
            </el-select>

            <span style="padding-left: 10px">所属模块:</span>
            <el-select v-model="apiFrom.model" filterable clearable placeholder="请选择所属项目" size="small"
                       style="padding-left: 10px;">
              <el-option v-for="item in BelongModel" :key="item" :label="item"
                         :value="item">{{item}}
              </el-option>
            </el-select>
          </div>

          <el-divider content-position="left">请求设置</el-divider>

          <div class="de-input">
            <span>请求路径:</span>
            <el-input placeholder="请输入内容" v-model="apiFrom.url" class="input-with-select" size="small">
              <el-select v-model="apiFrom.method" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="GET" value="1"></el-option>
                <el-option label="POST" value="2"></el-option>
                <el-option label="PUT" value="3"></el-option>
                <el-option label="DELETE" value="4"></el-option>
              </el-select>
            </el-input>
          </div>


          <div class="de-input">
            <span>参数类型:</span>
            <template>
              <el-radio-group v-model="apiFrom.type">
                <el-radio v-for="item in canUseMethods" :key="item.label" :label="item.label">{{ item.text }}</el-radio>
              </el-radio-group>
            </template>
          </div>

          <div class="de-input" style="display: flex">
            <span>请求参数:</span>
            <div class="request" id="request-overflow">
              <template>
                <div v-if="apiFrom.type === 2 ">
                  <jsonEditor :value="paramsJson" :read-only="true"/>
                </div>

                <div class="request_params" v-else style="margin: 10px">
                  <!--请求参数--->
                  <div v-for="(item, index) in Request_data" :key="index" style="margin: 5px 10px">
                    <el-input v-model="item.key" placeholder="KEY" size="small"></el-input>
                    <el-input style="width: 30%" v-model="item.value" size="small" placeholder="VALUE"></el-input>
                    <el-input v-model="item.desc" placeholder="DESCRIPTION" size="small"></el-input>
                    <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    <i @click="DelRequestParams(item.$index)" class="el-icon-remove-outline addParams"></i>
                  </div>
                  <el-button @click="addRequestParams" type="primary" plain size="small"
                             style="width: 94%; margin: 10px 0px 0px 10px">新增请求参数
                  </el-button>
                </div>
              </template>
            </div>
          </div>

          <el-divider content-position="left">响应校验</el-divider>

          <!--校验类型-->
          <div class="de-input">
            <!--校验类型-->
            <div>
              <span>校验类型:</span>
              <template>
                <el-radio-group v-model="apiFrom.checkType">
                  <el-radio label="text_response">响应断言</el-radio>
                  <el-radio label="json_response">json断言</el-radio>
                </el-radio-group>
              </template>
            </div>
            <!--校验值-->
            <div class="de-input" style="margin-top: 10px;display: flex">
              <span>检验值:</span>
              <div style="width: 80%;padding-left: 22px;position: relative;font-size: 14px;float: left"
                   v-if="apiFrom.checkType === 'text_response'">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入内容"
                          v-model="apiFrom.checkText"></el-input>
              </div>

              <div v-else class="de-input request request_params" id="json-overflow" style="margin: 10px 0px 10px 20px">
                <!--jsonpath断言--->
                <div v-for="(item, index) in checkJsonData" :key="index"
                     style="margin: 5px 10px; width: 100%; padding-left: 10px">
                  <el-input v-model="item.key" placeholder="jsonpath表达式" size="small" style="width: 50%"></el-input>
                  <el-input style="width: 30%" v-model="item.value" size="small" placeholder="校验值"></el-input>
                  <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  <i @click="DelCheckJsonPath(item.$index)" class="el-icon-remove-outline addParams"></i>
                </div>
                <el-button @click="AddCheckJsonPath" type="primary" plain size="small"
                           style="width: 94%; margin: 10px 0px 0px 20px;">新增JSON断言
                </el-button>
              </div>
            </div>
          </div>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>

        </div>
      </el-form>
    </div>

    <!--debug区-->
    <div class="apiDebug">

      <!--调试区-->
      <div style="margin-top: 20px;margin-left: 10px">
        <p>调试域名:</p>
        <el-input v-model="domain" size="mini" style="width: 70%;height: 10px;margin-top: 12px;"></el-input>
        <el-button size="mini" type="primary" @click="Send">调试</el-button>
      </div>

      <!--请求头设置-->
      <el-button type="text" @click="dialogVisible = true" style="margin-left: 10px">请求头设置</el-button>
      <el-dialog title="请求头设置" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <span>请求头:</span>
        <el-input v-model="headerFilter" placeholder="请输入筛选条件" style="width:30%"></el-input>

        <div class="headerSet" id="headersID">
          <div v-for="(item, index) in HeadersList" :key="index" style="margin-top: 10px">
            <!--key-->
            <el-select v-model="item.headerSetKey" filterable allow-create default-first-option
                       placeholder="key"
                       size="mini" style="width: 45%">
              <el-option v-for="item in headersListkey" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>

            <!--value-->
            <el-input v-model="item.headersSetValue" placeholder="value" size="mini" style="width: 45%"></el-input>

            <!--是否启用-->
            <el-switch v-model="item.headersStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
          <div>
            <!--新增按钮 -->
            <el-button size="mini" type="primary" style="width:100%;margin-top: 10px" @click="addHeaders">新增请求头
            </el-button>
          </div>

        </div>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!--响应结果-->
      <div style="margin-top: 20px;margin-left: 10px;height: 40%">
        <p>响应结果:</p>
        <div style="height:220px; width: 96%;margin-top: 5px; background-color: #9999FF">
          <template style="height:200px; width: 96%;margin-top: 5px; overflow-y: auto">
            <json-view :data="json" :font-size="12"/>
          </template>
        </div>
      </div>

      <!--校验结果-->
      <div style="margin-top: 20px;margin-left: 10px">
        <p>校验结果:</p>
        <div style="height: 180px;width: 96%;background-color: burlywood;margin-top: 10px"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import {sourceprojectList, sendInterfaces, allModel, addApiCase, apicase_info} from '../../api/api';
    // import jsonView from '@/components/json-view';
    import jsonView from 'vue-json-views';
    import VJsoneditor from 'v-jsoneditor/src/index'
    import jsonEditor from "../jsonEdit";


    export default {

        // 初始化方法
        created() {
            this.sourceProjects();
            this.GetCaseInfo();
        },

        data() {
            return {
                modeldata: '',
                defaultProps: '',
                domain: '',

                dialogVisible: false,
                headerFilter: '',
                HeadersList: [
                    {headerSetKey: '', headersSetValue: '', headersStatus: true,}
                ],
                headersListkey: [
                    {value: 'Accept', lable: 'Accept'},
                    {value: 'Referer', lable: 'Referer'},
                    {value: 'Cache-Control', lable: 'Cache-Control'},
                    {value: 'User-Agent', lable: 'User-Agent'},
                    {value: 'Host', lable: 'Host'},
                    {value: 'Content-Type', lable: 'Content-Type'}
                ],
                apiFrom: {
                    case_name: '',
                    project_id: '',
                    model: '',
                    method: '1',
                    url: '',
                    type: 1,
                    checkType: 'text_response',
                    checkText: '',
                    params: this.Request_data,
                },
                rules: {
                    case_name: [{required: true, message: '请输入用例名称', trigger: 'change'}],
                },
                BelongProjectList: [],   // 所属项目
                BelongModel: [], // 所属模块
                json: {},
                Reparams: this.paramsJson,
                paramsJson: {},
                Request_data: [
                    {key: '', value: '', desc: '', initiate: true}
                ],
                checkJsonData: [{key: '', value: '', initiate: true}]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },

        components: {
            jsonView,
            VJsoneditor,
            jsonEditor
        },

        computed: {
            canUseMethods() {
                const {method} = this.apiFrom;
                const GET = '1';
                const POST = '2';
                const PUT = '3';
                const DELETE = '4';

                if (method === GET) {
                    return [{text: 'params', label: 1}]
                }
                if (method === POST) {
                    return [{text: 'x-www-form-urlencoded', label: 1}, {text: 'json', label: 2}, {
                        text: 'form-data',
                        label: 3
                    }]
                }

                if (method === PUT) {
                    return [{text: 'params', label: 1}, {text: 'json', label: 2}]
                }

                if (method === DELETE) {
                    return [{text: 'params', label: 1}, {text: 'json', label: 2}]
                }
                return []
            },

        },
        methods: {

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            // 所属项目
            sourceProjects() {
                sourceprojectList().then(res => {
                    // console.log(res.data.data);
                    this.BelongProjectList = res.data.data;
                    // console.log(this.belongProjectlist, '2222')
                })
            },

            // 新增请求参数
            addRequestParams() {
                this.Request_data.push(
                    {key: '', value: '', desc: '', initiate: true}
                );
                this.$nextTick(() => {
                    this.HoldBot('request-overflow')
                })
            },

            // 删除请求参数
            DelRequestParams(index) {
                console.log(index)
                this.Request_data.splice(index, 1);
                if (this.Request_data.length === 0) {
                    this.Request_data.push({key: '', value: '', desc: '', initiate: true})
                }
            },

            // 新增json断言
            AddCheckJsonPath() {
                this.checkJsonData.push(
                    {key: '', value: '', initiate: true}
                );
                this.$nextTick(() => {
                    this.HoldBot('json-overflow')
                })
            },

            // 删除json断言
            DelCheckJsonPath(index) {
                this.checkJsonData.splice(index, 1);
                if (this.checkJsonData.length === 0) {
                    this.checkJsonData.push({key: '', value: '', initiate: true})
                }
            },

            //div滚动条保持在最底部
            HoldBot(elementid) {
                const DIV = document.getElementById(elementid);
                DIV.scrollTop = DIV.scrollHeight;
            },

            //请求头设置
            open_headers() {

            },

            //关闭请求头弹窗设置
            handleClose(done) {
                this.$confirm('确认关闭? ').then(_ => {
                    done();
                    this.HeadersList = [
                        {headerSetKey: '', headersSetValue: '', headersStatus: true,}
                    ]
                }).catch(_ => {
                })
            },

            //新增headers参数
            addHeaders() {
                this.HeadersList.push(
                    {headerSetKey: '', headersSetValue: '', headersStatus: true}
                );
                this.$nextTick(() => {
                    this.HoldBot('headersID')
                })
            },

            // 创建事件
            onSubmit() {
                const obj = {
                    case_name: this.apiFrom.case_name,
                    project_id: this.apiFrom.belongProject,
                    model: this.apiFrom.belongModel,
                    method: this.apiFrom.api_method,
                    url: this.apiFrom.api_url,
                    type: this.apiFrom.parameter_type,
                    checkType: this.apiFrom.aver,
                    checkText: this.apiFrom.averText,
                    params: this.Request_data,
                };
                addApiCase(obj).then(res => {

                })
            },

            // 调试按钮事件
            Send() {
                const obj = {
                    url: this.domain + this.apiFrom.api_url,
                    method: this.apiFrom.api_method,
                    params: this.Request_data,
                    headers: this.HeadersList,
                    type: this.apiFrom.parameter_type,
                };
                console.log(obj, '222')
                sendInterfaces(obj).then(res => {
                    this.json = res.data.data
                })
            },

            // 下拉框change事件
            changeproject(selVal) {
                //1.拿到所属项目选择的id,获取当前项目的所有模块赋值给所属模块下拉框
                if (selVal !== null) {
                    allModel(selVal).then(res => {
                        this.belongModel = null;
                        this.BelongModel = res.data.data[0].model_name.split(',')
                    })
                }
            },

            // 返回按钮
            back() {
                this.$router.go(-1)
            },

            // 获取用例详情
            GetCaseInfo() {
                if (this.$route.query.id) {
                    apicase_info(this.$route.query.id).then(res => {
                        console.log(res.data.data);
                        this.apiFrom = res.data.data;
                        this.Request_data = res.data.data.params;
                    })
                } else {
                    return
                }
            },

            // json编辑器
            onError() {
                console.log('error')
            }
        }
    }
</script>

<style scoped>

  .api-right {
    /*background-color: green;*/
    float: left;
    width: 78%;
    overflow: auto;
    height: 80vh;
  }

  .apiDebug {
    background-color: antiquewhite;
    float: left;
    width: 22%;
    height: 100%;
  }

  .api-right > .el-form > .details {
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 20px;

  }

  .api-right > .el-form > .details > .de-input {
    margin-bottom: 16px;
    margin-left: 10px;
  }

  .api-right > .el-form > .details > .de-input > .el-input {
    position: relative;
    font-size: 14px;
    /*display: inline-block;*/
    width: 80%;
    padding-left: 10px;
  }

  .api-right > .el-select {
    width: 100px;
  }

  .el-radio-group {
    padding-left: 10px;
  }

  .api-right > .el-form > .details > .de-input > .request > .request_params .el-input {
    width: 25%;
    /*margin-left: 5px;*/
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  .addParams {
    display: inline-block;
    margin-left: 10px;
    font-size: 28px;
    vertical-align: middle
  }

  .request {
    background-color: azure;
    min-height: 100px;
    max-height: 280px;
    /*height: 300px;*/
    width: 80%;
    margin-left: 10px;
    float: left;
    /*overflow: auto;*/
    overflow-y:auto
  }

  .aver-div {
    height: 200px;
    background-color: beige;
  }

  .headerSet {
    max-height: 400px;
    min-height: 100px;
    margin-top: 10px;
    overflow: auto;
    align-items: center;
    /*text-align: center;*/
  }

  .addheaders {
    border: 1px;
  }
</style>
