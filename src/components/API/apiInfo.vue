<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left:16px;margin-top:16px;margin-right:16px;">
    <el-tab-pane label="预览" name="first">
      <template slot-scope="scope">
        <div style="display:flex">
          <div class="head" style="float:left"></div>
          <div style="margin-left:6px;margin-top:6px;font-size:18px">基本信息</div>
        </div>

        <div class="info">
          <div>接口名称：{{apiName}}</div>
          <div>请求方法：{{apiMethod}}</div>
          <div>接口路径：{{apiAddr}}</div>
          <div>tag：{{apiTag}}</div>
          <div>创建时间：{{apiTime}}</div>
          <div>创建人员：{{apiUser}}</div>
        </div>

        <div style="display:flex;margin-top:30px">
          <div class="head" style="float:left"></div>
          <div style="margin-left:6px;margin-top:6px;font-size:18px">请求信息</div>
        </div>

      </template>
    </el-tab-pane>
    <el-tab-pane label="编辑" name="second">
      <template slot-scope="scope">
        11
      </template>
    </el-tab-pane>
    <el-tab-pane label="运行" name="third">
      <template slot-scope="scope">
        <!-- // 地址 -->
        <el-input placeholder="请输入内容" v-model="api" class="input-with-select input-w">
          <!-- // 请求方式 -->
          <el-select v-model="method" style="width: 100px" slot="prepend">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
            <el-option label="PUT" value="put"></el-option>
            <el-option label="DELETE" value="delete"></el-option>
          </el-select>
          <el-select v-model="address" style="width: 260px;margin-left:18px;border:1px solid #DCDFE6;border-right: 0;border-bottom:0" slot="prepend">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
          </el-select>
        </el-input>
        <el-button type="primary">发送</el-button>
        <el-button type="primary" style="margin-left:0">保存</el-button>

        <!-- 请求配置组件 -->
        <el-collapse v-model="activeNames" @change="handleChange" style="margin-top:10px">
          <!-- 请求头 -->
          <el-collapse-item name="1">
            <template slot="title">
              <span class="marginleft">Headers</i></i></span><i class="header-icon el-icon-info"></i>
            </template>
            <div v-for="(item, index) in HeadersList" :key="index" style="padding-left: 10px;padding-top:8px" class="HeaderInput">
              <el-input v-model="item.key" placeholder="参数类型" size="small" style="width: 26%"></el-input>
              =
              <el-input style="width: 30%" v-model="item.value" size="small" placeholder="参数值"></el-input>
              <el-switch v-model="item.initiate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              <i class="el-icon-circle-plus-outline i_style" @click="addHeadersHandler"></i>
            </div>
          </el-collapse-item>
          <!-- 请求参数 -->
          <el-collapse-item name="2">
            <template slot="title">
              <span class="marginleft">Param</span>
            </template>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { Getapi } from '../../api/api';
export default {
  data() {
    return {
      // 默认选中
      activeName: "first",
      // 拿到query id请求数据
      id: this.$route.query.id,
      apiName: "",
      apiMethod: "",
      apiAddr: "",
      apiTag: "",
      apiTime: "",
      apiUser: "",
      method: "get",
      address: "",
      api: "",
      HeadersList: [{ key: '', value: '', initiate: true }],
      activeNames: ['1']
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 获取接口数据
    GetApiData() {
      Getapi(this.id).then(res => {
        // console.log(res.data.data, "123")
        const data = res.data.data
        this.apiName = data.api_name;
        this.apiMethod = data.method;
        this.apiAddr = data.api;
        this.apiTag = data.tag
        this.apiTime = data.create_time;
        this.apiUser = data.create_user
      })
    },

    handleChange(val) {
      console.log(val);
    },
    // 新增请求头
    addHeadersHandler() {
      this.HeadersList.push(
        { key: '', value: '', initiate: true }
      );
    },
  },

  created() {
    this.GetApiData();
  },
}
</script>

<style>
.info {
  display: grid;
  grid-template-columns: 46% 46%;
  grid-template-rows: 60px 60px;
  margin-left: 40px;
  margin-top: 20px;
  font-size: 16px;
}
.head {
  border: #1e90ff 2px solid;
  height: 40px;
  width: 2px;
}
.input-w {
  width: 250px;
}
.el-input__inner {
  width: 250px;
}

.el-collapse-item__header {
  background-color: #f5f5f5;
  margin-top: 8px;
}

.HeaderInput > .el-input > .el-input__inner {
  width: 100%;
}
.van-collapse-item {
  border-radius: 8px;
  overflow: hidden;
}
.marginleft {
  margin-left: 10px;
}
.i_style {
  padding-top: 10px;
  line-height: 20px;
  align-items: center;
  position: relative;
  height: 20px;
  vertical-align: sub;
  font-size: 20px;
}
</style>