<template>
  <div class="api-list">
    <div class="api-left">111</div>
    <div class="api-right">22</div>
  </div>
</template>

<script>
  export default {
    name: "API"
  }
</script>

<style scoped>
  .api-list {
    background-color: aqua;
    height: 100%;
  }
  .api-left {
    background-color: darkred;
    height: 100%;
    width: 200px;
    float: left;
  }
  .api-right {
    background-color: green;
  }
</style>
