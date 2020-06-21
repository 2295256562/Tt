<template>
  <div style="margin: 10px">
    <span style="font-size: 20px;margin-bottom: 10px;">全部接口共{{1}}个</span>
    <el-button type="primary" @click="addHandler" style="margin-left: 80%" size="medium">添加接口</el-button>
    <el-table :data="tableData" style="width: 90%">
      <el-table-column prop="api_name" label="接口名称" ></el-table-column>
      <el-table-column prop="api" label="接口地址"></el-table-column>
      <el-table-column prop="tag" label="接口分组"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {tablist} from '../../api/api'
  export default {
    data() {
      return {
        tableData: [],
        project:[]
      }
    },
    watch: {
      '$route': {
        handler: function (newVal, oldVal) {
          console.log(newVal.query.object, typeof newVal.query.object, newVal, 'xxxx')
          this.project = newVal.query.project.split(',')
          console.log(this.project, 'query')
        },
        immediate: true
      }
    },

    methods:{
      // 添加接口
      addHandler(){

      },
      // 获取数据接口
      Getlist(){
        tablist().then( res => {
        console.log(res.data.data)
      })
      }
    },
    created(){
      
      this.Getlist();
    }
  }
</script>

<style scoped>

</style>
