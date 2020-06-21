<template>
  <div style="height: 92%">
    <div class="topdiv">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>接口测试</el-breadcrumb-item>
        <el-breadcrumb-item>接口管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="productdiv" style="display: flex">
      <el-tabs v-model="activeLeft" type="card" @tab-click="handleClick" style="border: 2px solid #E4E7ED;height: 96%;width:300px">

          <el-tab-pane label="接口列表" name="first" style="height: 30%;">
            <div style="overflow-y: scroll; height: 70vh;width: 100%; ">

              <!-- 搜索 -->
              <div>
                <el-input v-model="input" placeholder="请输入内容" style="width:60%;padding:6px" size="small"></el-input>
                <el-button type="primary" size="small">添加分类</el-button>
              </div>

              <!-- 树状列表 -->
              <el-tree :data="list" icon-class="iconfont icon-wenjian"
                     @node-click="handleNodeClick">
              </el-tree>
            </div>
          </el-tab-pane>

        <el-tab-pane label="测试集合" name="second">

        </el-tab-pane>
      </el-tabs>

      <!-- 右侧区域 -->
      <div style="flex:1;border: 2px solid #E4E7ED;margin-left:10px;height:96%">
        <el-tabs v-model="activeRight" @tab-click="handleClick">
          <el-tab-pane label="预览" name="one">
            <div class="container">
              <div>接口名称：{{showData.api_name}}</div>
              <div>请求方式：
                <template  >
                <el-tag v-if="showData.method==='get'" size="small"  type="success">GET</el-tag>
                <el-tag v-else-if="showData.method==='post'" size="small" >POST</el-tag>
                <el-tag v-else-if="showData.method==='put'"  size="small" type="warning">PUT</el-tag>
                <el-tag v-else-if="showData.method==='delete'"  type="danger" size="small" >DELETE</el-tag>
            </template>
              </div>
              <div>接口路径：{{showData.api}}</div>
              <div>接口标签：{{showData.tag}}</div>
              <div>创建时间：{{showData.create_time}}</div>
              <div>创建用户：{{showData.create_user}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="编辑" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="运行" name="third">角色管理</el-tab-pane>
          <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>


  </div>
</template>

<script>
    import {API} from '../../api/api'
    import {handleList} from '../../api/apoijs'

    export default {
        created() {
            this.GETapi()
        },
        data() {
            return {
                list: [],
                activeLeft: 'first',
                activeRight:'one',
                showData:[],
                input:''
            }
        },

        methods: {
            GETapi() {
                API().then(res => {
                    console.log((res.data.data));
                    this.handleList(res.data.data)
                })
            },
            handleList(data) {
                this.list = data.map(it => {
                    let obj = {};
                    for (let key in it) {
                        obj.label = key.split(`['`)[1].split(`']`)[0];
                        obj.children = it[key].map(item => {
                            return {
                                label: item.api_name,
                                data: item,
                                children: null
                            }
                        })
                    }
                    return obj
                });
                console.log(this.list, '000000')
            },
            handleClick() {
                console.log(111)
            },
            handleNodeClick(e) {
                console.log(e)
                this.showData = e.data
            }
        }
    }
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 50px 50px 50px;
  padding: 6%;
}
</style>

<style>
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    /*border: 1px solid #E4E7ED;*/
    /*border-bottom: none;*/
    /*border-radius: 4px 4px 0 0;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    border: 0;
  }

  .el-tabs__item {
    padding: 0 46px !important
  }

  .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  /*.el-tree .el-icon-caret-right:before {*/
  /*  background: url("../../assets/img/文件夹.png") no-repeat 0 3px;*/
  /*  content: '';*/
  /*  display: block;*/
  /*  width: 18px;*/
  /*  height: 18px;*/
  /*  font-size: 18px;*/
  /*  background-size: 18px;*/
  /*}*/

  .el-tree-node__content>.el-tree-node__expand-icon {
        font-size: 22px
  }
</style>
