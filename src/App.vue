<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
  }
  .topdiv {
    padding-top: 20px;
    padding-left: 20px;
  }
  .productdiv {
    height: 100%;
    padding: 20px 20px 0px 20px;
    /*overflow: scroll;*/
  }

  .tab {
    height: 100%;
  }
</style>
