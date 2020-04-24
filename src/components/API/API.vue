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

          <el-form-item label="所属项目">
            <el-select v-model="apiFrom.project_id" filterable clearable placeholder="请选择所属项目" size="small"
                        @change="changeproject">
              <el-option v-for="item in BelongProjectList" :key="item.id" :label="item.project_name"
                         :value="item.id"></el-option>
            </el-select>

            <span style="padding-left: 10px;color: #606266">所属模块:</span>
            <el-select v-model="apiFrom.model" filterable clearable placeholder="请选择所属项目" size="small"
                       style="padding-left: 10px;">
              <el-option v-for="item in BelongModel" :key="item" :label="item"
                         :value="item">{{item}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-divider content-position="left" style="margin-top: 20px">请求设置</el-divider>

          <el-form-item label="请求地址" style="width: 100%">
            <el-input placeholder="请输入内容" v-model="apiFrom.url" class="input-with-select" size="small"
                      style="width: 88%">
              <el-select v-model="apiFrom.method" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="GET" value="1"></el-option>
                <el-option label="POST" value="2"></el-option>
                <el-option label="PUT" value="3"></el-option>
                <el-option label="DELETE" value="4"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="依赖用例" style="width: 100%">
            <el-autocomplete v-model="apiFrom.rely" :fetch-suggestions="querySearchRelyCase" placeholder="请输依赖用例"
                             @select="handleSelect" size="small" style="width: 88%"></el-autocomplete>
            <!--            <el-select v-model="apiFrom.rely" multiple filterable remote reserve-keyword placeholder="请输入关键词"-->
            <!--                       :remote-method="remoteMethod" :loading="loading">-->
            <!--              <el-option v-for="item in caselist" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
            <!--            </el-select>-->
          </el-form-item>


          <el-form-item label="参数类型">
            <el-radio-group v-model="apiFrom.type">
              <el-radio v-for="item in canUseMethods" :key="item.label" :label="item.label">{{ item.text }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="请求参数">
            <template>
              <div v-if="apiFrom.type === 2 ">
                <jsonEditor ref="editor" :value="paramsJson" :read-only="true"/>
              </div>

              <div class="de-input request request_params" v-else >
                <!--请求参数--->
                <div v-for="(item, index) in Request_data" :key="index"
                     style="margin: 5px 10px; padding-left: 10px">
                  <el-input v-model="item.key" placeholder="KEY" size="small" style="width: 28%"></el-input>
                  <el-input style="width: 30%" v-model="item.value" size="small" placeholder="VALUE"></el-input>
                  <el-input v-model="item.desc" placeholder="DESCRIPTION" size="small" style="width: 25%"></el-input>
                  <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949" ></el-switch>
                  <i @click="DelRequestParams(index)" class="el-icon-remove-outline addParams"></i>
                </div>
                <el-button @click="addRequestParams" type="primary" plain size="small"
                           style="width: 96%; margin: 10px 0px 0px 20px">新增请求参数
                </el-button>
              </div>
            </template>
          </el-form-item>

          <el-divider content-position="left">响应校验</el-divider>

          <!--校验类型-->

          <el-form-item label="校验类型">
            <el-radio-group v-model="apiFrom.checkType">
              <el-radio label="text_response">响应断言</el-radio>
              <el-radio label="json_response">json断言</el-radio>
            </el-radio-group>
          </el-form-item>


          <!--校验值-->
          <el-form-item label="校验类型" style="width: 88%">
            <template>
              <div style="width: 100%;position: relative;font-size: 14px;float: left"
                   v-if="apiFrom.checkType === 'text_response'">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入内容"
                          v-model="apiFrom.checkText"></el-input>
              </div>

              <div v-else class="de-input request request_params" id="json-overflow"
                   style="width: 100%">
                <!--jsonpath断言--->
                <div v-for="(item, index) in checkJsonData" :key="index"
                     style="margin: 5px 10px; width: 100%; padding-left: 10px">
                  <el-input v-model="item.key" placeholder="jsonpath表达式" size="small" style="width: 50%"></el-input>
                  <el-input style="width: 30%" v-model="item.value" size="small" placeholder="校验值"></el-input>
                  <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  <i @click="DelCheckJsonPath(index)" class="el-icon-remove-outline addParams"></i>
                </div>
                <el-button @click="AddCheckJsonPath" type="primary" plain size="small"
                           style="width: 94%; margin: 10px 0px 0px 20px;">新增JSON断言
                </el-button>
              </div>
            </template>
          </el-form-item>

        </div>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--debug区-->
    <div class="apiDebug">

      <!--调试区-->
      <div style="margin-top: 20px;margin-left: 10px">
        <p>调试域名:</p>
        <el-input v-model="domain" size="mini" style="width: 78%;height: 10px;margin-top: 12px;"></el-input>
        <el-button size="mini" type="primary" @click="Send">调试</el-button>
      </div>

      <!--请求头设置-->
      <el-button type="text" @click="dialogVisible = true" style="margin-left: 10px">请求头设置</el-button>
      <el-dialog title="请求头设置" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <span>请求头:</span>
        <el-input v-model="headerFilter" placeholder="请输入项目名称" size="small" style="width:30%"  @keyup.enter.native="filterHeader"></el-input>

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
      <div style="margin-top: 20px;margin-left: 10px;margin-right: 10px;height: 40%; ">
        <p>响应结果:</p>
        <div style="height:100%; width: 100%;margin-top: 5px;">
          <!--        <template style="height:200px; width: 96%;margin-top: 5px; overflow-y: auto">-->
          <json-view :data="json" theme="one-dark" style="height: 100%;overflow: auto"/>

          <!--        </template>-->
        </div>
      </div>

      <!--校验结果-->
      <div style="margin-top: 120px;margin-left: 10px;height:24%">
        <p>校验结果:</p>
        <div style="height: 96%;width: 96%;background-color: burlywood;margin-top: 10px"></div>
      </div>
    </div>
  </div>

</template>

<script>
    import {sourceprojectList, sendInterfaces, allModel, addApiCase, apicase_info, search, updateCase, filterHeader} from '../../api/api';
    // import jsonView from '@/components/json-view';
    import jsonView from 'vue-json-views';
    import VJsoneditor from 'v-jsoneditor/src/index'
    import jsonEditor from "../jsonEdit";
    import $axios from "../../api/ajaxRequest";


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
                    {headerSetKey: 'Content-Type', headersSetValue: 'application/json', headersStatus: true,}
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
                    rely: '',
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
                // Reparams: this.paramsJson,
                paramsJson: {},
                Request_data: [
                    {key: '', value: '', desc: '', initiate: true}
                ],

                checkJsonData: [{key: '', value: '', initiate: true}],

                caselist: [],
                list: [],
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
                    project_id: this.apiFrom.project_id,
                    model: this.apiFrom.model,
                    method: this.apiFrom.method,
                    url: this.apiFrom.url,
                    type: this.apiFrom.type,
                    checkType: this.apiFrom.checkType,
                    checkText: this.apiFrom.checkType === 'json_response' ? this.checkJsonData : this.apiFrom.checkText,
                    params: this.apiFrom.type === 2 ? JSON.parse(this.$refs.editor.getValue()) : this.Request_data
                };
                const id = this.$route.query.id;

                if (id) {
                    // 当有id时点击保存按钮为编辑

                    console.log(id);
                    // updateCase(id,obj).then(res =>{
                    //     this.$message.success("修改用例成功");
                    //     this.$router.push({name: 'APIlist'})
                    // })
                    $axios.put('updateCase/' + id + '/', obj).then(res =>{
                        this.$message.success("修改用例成功");
                        this.$router.push({name: 'APIlist'})
                    })


                } else {
                    addApiCase(obj).then(res => {
                        this.$message.success("添加用例成功");
                        this.$router.push({name: 'APIlist'})
                    })
                }

            },

            // 调试按钮事件
            Send() {
                const obj = {
                    url: this.domain + this.apiFrom.url,
                    method: this.apiFrom.method,
                    params: this.apiFrom.type === 2 ? JSON.parse(this.$refs.editor.getValue()) : this.Request_data,
                    headers: this.HeadersList,
                    type: this.apiFrom.type,
                    checkType: this.apiFrom.checkType,
                    checkText: this.apiFrom.checkType === 'json_response' ? this.checkJsonData : this.apiFrom.checkText,
                };
                console.log(obj, '222');
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
                        // this.apifFrom.checkText: this.apiFrom.checkType === 'json_response' ? this.checkJsonData : this.apiFrom.checkText,
                        if (res.data.data.checkType === 'json_response') {
                            this.checkJsonData = res.data.data.checkText;
                            console.log(this.checkJsonData)
                        }
                        if (res.data.data.type === 2){
                            this.paramsJson = res.data.data.params
                        }
                    })
                } else {
                    return
                }
            },

            // json编辑器
            onError() {
                console.log('error')
            },

            // 搜索用例
            querySearchRelyCase(queryString, callback) {
                if (queryString === '') {
                    console.log(111)
                } else {
                    // 调用接口
                    search(queryString).then(res => {
                        console.log(res.data.data, '22')
                        this.restaurants = []
                        res.data.data.results.forEach(item => {
                            this.restaurants.push({
                                id: item.id,
                                name: item.case_name,
                            })
                        });
                        console.log(queryString, '1111sss');
                        callback(this.restaurants)
                    })
                }
            },

            handleSelect(item) {
                console.log(item)
            },

            // 筛选请求头
            filterHeader() {
                filterHeader(this.headerFilter).then(res => {
                    // console.log(JSON.parse(res.data.data.results))
                    this.HeadersList = res.data.data.results[0].headers
                })
            }


        }
    }
</script>

<style scoped>

  .api-right {
    /*background-color: green;*/
    float: left;
    width: 72%;
    overflow: auto;
    height: 80vh;
  }

  .apiDebug {
    background-color: antiquewhite;
    float: left;
    width: 28%;
    height: 98%;
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
    /*margin-left: 10px;*/
    font-size: 28px;
    vertical-align: middle
  }

  .request {
    background-color: azure;
    min-height: 100px;
    max-height: 280px;
    /*height: 300px;*/
    width: 88%;
    /*margin-left: 10px;*/
    float: left;
    /*overflow: auto;*/
    overflow-y: auto
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
