<template>
  <div class="flex-row page">
    <div class="page_left">
      <div class="tab flex-row">
        <div class="tab_btn" v-for="item in tabs" :key="item.title" @click="acticeTab = item.title" :class="{is_active: acticeTab === item.title}">
          {{ item.title }}
        </div>
      </div>
      <div class="flex-row search">
        <a-input placeholder="搜索接口" class="mr20"/>
        <a-button type="primary" >添加分类</a-button>
      </div>
      <div class="contain">
        <a-tree :show-icon="true" @select="onSelect" :defaultSelectedKeys="['0']"	>
          <a-tree-node v-for="(item, idx) in list" :key="idx + ''">
            <a-icon slot="icon" type="folder"/>
            <span slot="title">{{ item.key }}</span>s
            <a-tree-node v-for="(it, val) in item.data" :key="idx + ',' + val" :title="it.key">
              <a-icon slot="icon" type="folder-open"/>
              <a-tree-node v-for="(res, index) in it.data" :key="idx + ',' + val + ',' + index">
                <span slot="title"> <a-tag color="green">{{ res.method }}</a-tag>{{ res.api_name }}</span>
              </a-tree-node>
            </a-tree-node>
          </a-tree-node>
        </a-tree>
      </div>
    </div>
    <div class="page_right">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {API} from '../../api/api'
  import {Button, Input, Tree, Icon, Tag} from 'ant-design-vue'

  Vue.use(Button);
  Vue.use(Input);
  Vue.use(Tree);
  Vue.use(Icon);
  Vue.use(Tag);
  export default {
    data() {
      return {
        tabs: [
          {
            title: '接口列表'
          },
          {
            title: '测试集合'
          }
        ],
        acticeTab: '接口列表',
        list: [],
        responseData:[]
      }
    },
    methods: {
      onSelect(e) {
        if (!e[0]) return
        let key = ''
        let obj = null
        const arr = e[0].split(',')
        arr.forEach(it => {
          if (!obj) {
            obj = this.list[it]
          } else {
            obj = obj.data[it]
          }
          key += obj.key + ','
        })
        console.log(key, 'key', obj.id)
        if (obj.id) {
          console.log('跳转详情页', obj.id)
          this.$router.push({name:"apiInfo",query:{
            id:obj.id
          }})
        } else {
          console.log('跳转列表页')
          this.$router.push({name:"list",
          query:{
            project: key
          }})
        }
      },
      initData() {
        this.list = this.responseData.map(it => {
          let obj = {}
          for (let key in it) {
            obj.key = key
            if (it[key] instanceof Array) {
              it[key] = it[key].map(item => {
                let newObj = {}
                for (let val in item) {
                  newObj.key = val
                  newObj.data = item[val]
                }
                return newObj
              })
            }
            obj.data = it[key]
          }
          return obj
        })
        console.log(this.list, '=======')
      },
      initArray(obj1) {
        let obj = {}
        for (let key in obj1) {
          obj.key = key
          obj.data = obj1[key]
        }
        return obj
      },

      // 获取接口分类列表
      getList(){
        API().then(res => {
          console.log(res.data.data)
          this.responseData = res.data.data;
          this.initData();})
      },
    },
    created() {
      this.getList();
      
    }
  }
</script>
<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .page {
    justify-content: center;
    align-items: flex-start;
    padding: 32px;
    height: 600px;
  }

  .page_left {
    width: 280px;
    /*height: 100%;*/
    background: #fff;
    border: 1px solid #EBEEF5;
  }

  .page_right {
    flex: 1;
    margin-left: 20px;
    background: #fff;
    height: 80vh;
    border: 1px solid #EBEEF5;
  }

  .tab {
    width: 100%;
  }

  .tab_btn {
    flex: 1;
    color: #333;
    font-size: 17px;
    text-align: center;
    padding: 14px;
    cursor: pointer;
  }

  .tab_btn:hover {
    opacity: 0.8;
  }

  .is_active {
    background: #c8c8c8;
  }

  .search {
    width: 100%;
    padding: 15px 20px;
    background: #c8c8c8;
  }

  .mr20 {
    margin-right: 20px;
  }

  .ant-tree li {
    text-align: left;
  }
</style>
