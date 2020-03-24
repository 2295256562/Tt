<template>
  <el-container>
    <!--左侧导航栏-->
    <el-aside width="210px" class="left_tab">
      <!--导航菜单-->
      <div class="left_c">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
                 background-color="#001529" text-color="white"
                 style="font-size: 14px;font-family: 'Arial Normal', 'Arial';" @select="routeTo"
                 @open="handleOpen" @close="handleClose">

          <el-menu-item index="/index"><i class="iconfont icon-kanban mar"></i><span slot="title">项目数据</span></el-menu-item>

          <!--项目管理-->
          <el-submenu index="/product">
            <template slot="title"><i class="iconfont icon-xiangmu mar"></i><span>项目管理</span></template>
            <el-menu-item index="/product/project" class="iconfont icon-xiangmumingcheng mar_item">项目列表</el-menu-item>
            <el-menu-item index="/product/model" class="iconfont icon-mokuai mar_item">模块列表</el-menu-item>
          </el-submenu>

          <!--接口自动化-->
          <el-submenu index="/api">
            <template slot="title"><i class="iconfont icon-icon-menu-m0640 mar"></i><span> 接口测试</span></template>
            <el-menu-item index="/api/Headers" class="iconfont icon-zhenduan mar_item">请求头管理</el-menu-item>
            <el-menu-item index="/api/APIlist" class="iconfont icon-yongliceshi mar_item">接口用例</el-menu-item>
            <el-menu-item index="/api/APIreport" class="iconfont icon-baogao mar_item">用例报告</el-menu-item>
          </el-submenu>

          <!--app测试-->
          <el-submenu index="/APP">
            <template slot="title"><i class="iconfont icon-AppTest mar"></i><span> APP测试</span></template>
            <el-menu-item index="/APP/PhoneCloud" class="iconfont icon-yunzhenji mar_item">云测真机</el-menu-item>
            <el-submenu index="3-2">
              <template slot="title"><i class="iconfont icon-xiangmu mar_item"></i><span>monkey测试</span></template>
              <el-menu-item index="3-2-1">随机测试</el-menu-item>
              <el-menu-item index="3-2-2">测试报告</el-menu-item>
            </el-submenu>
            <el-submenu index="3-3">
              <template slot="title"><i class="iconfont icon-xingnengceshi mar_item"></i><span>APP性能</span></template>
              <el-menu-item index="3-3-1">性能测试</el-menu-item>
              <el-menu-item index="3-3-2">性能报告</el-menu-item>
            </el-submenu>
            <el-menu-item index="3-4" class="iconfont icon-yiliaohangyedeICON- mar_item">专项测试</el-menu-item>
          </el-submenu>

          <!--任务管理-->
          <el-submenu index="/task">
            <template slot="title"><i class="iconfont icon-renwuguanli mar"></i><span>任务管理</span></template>
            <el-menu-item index="/task/Tasklist" class="iconfont icon-dingshirenwu1 mar_item">定时任务</el-menu-item>
<!--            <el-menu-item index="/api/APIlist" class="iconfont icon-yongliceshi mar_item">接口用例</el-menu-item>-->
<!--            <el-menu-item index="/api/APIreport" class="iconfont icon-baogao mar_item">用例报告</el-menu-item>-->
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>

    <el-container>
      <!--顶部导航-->
      <el-header class="top_header">
        <div class="user_tab">
          <div class="user_info">
            <!--用户信息-->
            <div class="a">
              <el-menu class="el-menu-demo" mode="horizontal" background-color="rgba(55, 61, 65, 1)" menu-trigger="click">
                <el-submenu index="2">
                  <template slot="title"> admin</template>
                  <el-menu-item index="2-1" >修改密码</el-menu-item>
                  <el-menu-item >基本信息</el-menu-item>
                </el-submenu>
                <el-menu-item class="el-icon-message-solid"></el-menu-item>
                <el-menu-item class="iconfont icon-signOut" @click="logout"></el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
      </el-header>

      <!--内容区-->
      <el-main class="main">
        <div class="content">
          <router-view/>
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      routeTo(key, path) {
        if (this.$route.path === key)
          return;
        this.$router.push({path: key})
      },
      handleOpen (){},
      handleClose(){},


      // 退出登陆
      logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // localStorage.removeItem('user');
        this.$router.push({ name:'LoginPage' })
      }
    }
  }
</script>

<style scoped>

  .left_tab {
    background-color: rgba(0, 21, 41, 1);
    height: 100vh;
  }

  .left_c {
    background-color: darkred;
    margin-top: 60px;
  }

  .top_header {
    background-color: bisque;
    padding: 0;
    background-color: rgba(55, 61, 65, 1);
  }

  .main {
    background: #f3f6f8;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    /*overflow: auto;*/
  }

  .content {
    background-color: white;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    overflow: auto;
  }

  .user_tab {
    right: 0px;
    top: 0px;
    text-align: center;
    color: #666666;
    /*line-height: normal;*/
    font-size: 14px;
    font-family: 'Arial Normal', 'Arial';
    position: absolute;
    background-color: rgba(55, 61, 65, 1);
  }

  .user_info {
    /*width: 520px;*/
    height: 60px;
    position: relative;
    /*left: 0px;*/
    top: 0px;
    right: 60px;
    background-color: rgba(55, 61, 65, 1);
  }

  .user_icon {
    border-width: 0px;
    position: absolute;
    left: 120px;
    top: 0px;
    width: 120px;
    height: 60px;
    color: #999999;
    line-height: 12px;
    background-color: green;
  }

  .el-menu {
    border-right-width: 0;
  }


  .mar {
    margin-right: 10px
  }

  .mar_item {
    margin-left: 6px;
  }
</style>
<style>
  /*.el-menu--horizontal > .el-submenu > .el-menu-item {*/
  /*  height: 60px;*/
  /*  width: 60px;*/
  /*  line-height: 60px;*/
  /*  border-bottom: 2px solid transparent;*/
  /*  color: #fff;*/
  /*  font-size: 20px;*/
  /*}*/
  /*.a .el-menu--horizontal {*/
  /*  width: 60px;*/
  /*  overflow: hidden;*/
  /*}*/

</style>
