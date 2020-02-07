<template>
  <div class="api-list">
    <!--列表区-->
    <div class="api-left">
      <div style="text-align: center;align-items: center; margin: 10px">
        <el-input placeholder="请输入筛选条件" v-model="modeldata"></el-input>
        <el-tree class="filter-tree" :data="modeldatas" :props="defaultProps" default-expand-all
                 :filter-node-method="filterNode" ref="tree" style="padding-top: 10px">
        </el-tree>
      </div>
    </div>

    <!--表单区-->
    <div class="api-right">

      <el-form ref="form" :model="apiFrom" label-width="80px">
        <div class="details">
          <el-divider content-position="left">基本信息</el-divider>
          <div class="de-input">
            <span>用例名称:</span>
            <el-input v-model="apiFrom.case_name" size="small" placeholder="请输入用例名称"></el-input>
          </div>

          <el-divider content-position="left">请求设置</el-divider>

          <div class="de-input">
            <span>请求路径:</span>
            <el-input placeholder="请输入内容" v-model="apiFrom.api_url" class="input-with-select" size="small">
              <el-select v-model="apiFrom.api_method" slot="prepend" placeholder="请选择" style="width: 100px;">
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
              <el-radio-group v-model="apiFrom.method_type">
                <el-radio v-for="item in canUseMethods" :key="item.label" :label="item.label">{{ item.text }}</el-radio>
              </el-radio-group>
            </template>
          </div>

          <div class="de-input" style="display: flex">
            <span>请求参数:</span>
            <div class="request" id="request-overflow">
              <div class="request_params" style="margin: 10px">
                <!--请求参数--->
                <div v-for="(item, index) in Request_data" :key="index" style="margin: 5px 10px">
                  <el-input v-model="item.key" placeholder="KEY" size="small"></el-input>
                  <el-input style="width: 30%" v-model="item.value" size="small" placeholder="VALUE"></el-input>
                  <el-input v-model="item.desc" placeholder="DESCRIPTION" size="small"></el-input>
                  <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  <i @click="DelRequestParams(item.$index)" class="el-icon-remove-outline addParams"></i>
                </div>
                <el-button @click="addRequestParams" type="primary" plain size="small"
                           style="width: 94%; margin: 10px 0px 0px 10px">ADD
                </el-button>
              </div>
            </div>
          </div>

          <el-divider content-position="left">响应校验</el-divider>

          <!--校验类型-->
          <div class="de-input">
            <!--校验类型-->
            <div>
              <span>校验类型:</span>
              <template>
                <el-radio-group v-model="apiFrom.aver">
                  <el-radio label="text_response">响应断言</el-radio>
                  <el-radio label="json_response">json断言</el-radio>
                </el-radio-group>
              </template>
            </div>
            <!--校验值-->
            <div class="de-input" style="margin-top: 10px;display: flex">
              <span>检验值:</span>
              <div style="width: 80%;padding-left: 22px;position: relative;font-size: 14px;float: left">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入内容"
                          v-model="apiFrom.averText"></el-input>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>

    <!--debug区-->
    <div class="apiDebug">

      <!--调试区-->
      <div style="margin-top: 20px;margin-left: 10px">
        <p>调试域名:</p>
        <el-input v-model="sendTest" size="mini" style="width: 70%;height: 10px;margin-top: 12px;"></el-input>
        <el-button size="mini" type="primary">调试</el-button>
      </div>

      <!--请求头设置-->
      <el-button type="text" @click="dialogVisible = true" style="margin-left: 10px">请求头设置</el-button>
      <el-dialog title="请求头设置" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>请求头:</span>
        <el-input v-model="headerFilter" placeholder="请输入筛选条件" style="width:30%"></el-input>

        <div class="headerSet" id="headersID">
          <div v-for="(item, index) in HeadersList" :key="index" style="margin-top: 10px">
            <!--key-->
            <el-select v-model="item.headerSetKey" filterable allow-create default-first-option
                       placeholder="key"
                       size="mini" style="width: 45%">
              <el-option v-for="item in headersListkey" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>

            <!--value-->
            <el-input v-model="item.headersSetValue" placeholder="value" size="mini" style="width: 45%"></el-input>

            <!--是否启用-->
            <el-switch v-model="item.headersStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
          <div>
            <!--新增按钮 -->
            <el-button size="mini" type="primary" style="width:100%;margin-top: 10px" @click="addHeaders">ADD HEADER
            </el-button>
          </div>

        </div>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!--响应结果-->
      <div style="margin-top: 20px;margin-left: 10px;height: 45%">
        <p>响应结果:</p>
        <div style="height:90%; width: 96%;background-color: cadetblue;margin-top: 5px"></div>
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
  export default {
    data() {
      return {
        modeldata: '',
        defaultProps: '',
        sendTest: '',

        modeldatas: [{
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        Request_data: [
          {key: '', value: '', desc: '', initiate: true}
        ],
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
          api_method: '1',
          api_url: '',
          method_type: 1,
          aver: 'text_response',
          averText: '',
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      canUseMethods() {
        const {api_method} = this.apiFrom;
        const GET = '1';
        const POST = '2';
        if (api_method === GET) {
          return [{text: 'params', label: 1}]
        }
        if (api_method === POST) {
          return [{text: 'x-www-form-urlencoded', label: 1}, {text: 'json', label: 2}, {text: 'form-data', label: 3}]
        }
        return []
      },

    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
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
        this.Request_data.splice(index, 1);
        if (this.Request_data.length === 0) {
          this.Request_data.push({key: '', value: '', desc: '', initiate: true})
        }
      },

      //div滚动条保持在最底部
      HoldBot(elementid) {
        const DIV = document.getElementById(elementid);
        DIV.scrollTop = DIV.scrollHeight;
        // console.log(DIV.scrollHeight, 'height')
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
      }
    }
  }
</script>

<style scoped>
  .api-list {
    /*background-color: aqua;*/
    height: 100%;
    display: flex;
  }

  .api-left {
    /*height: auto;*/
    width: 12%;
    float: left;
    border-right: 0.5px solid #f3f6f8;
  }

  .api-right {
    /*background-color: green;*/
    float: left;
    width: 66%;
    overflow: auto;
  }

  .apiDebug {
    background-color: antiquewhite;
    float: left;
    width: 22%;
    height: 100%;
  }

  .api-right > .el-form> .details {
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 80px;

  }

  .api-right >.el-form> .details > .de-input {
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
    min-height: auto;
    max-height: 300px;
    /*height: 300px;*/
    width: 80%;
    margin-left: 10px;
    float: left;
    /*overflow: auto;*/
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
