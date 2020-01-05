<template>
    <div class="cloud">
        <div class="cloud-filter">
            <div class="filter">
                <!-- 手机品牌 -->
            <div class="filter">
                <div class="filter_left">手机品牌：</div>
                <div class="filter_right">
                <el-checkbox-group v-model="phonebrand" size="medium">
                    <el-checkbox-button v-for="brand in brands" :label="brand" :key="brand">{{brand}}</el-checkbox-button>
                </el-checkbox-group>
                </div>
            </div>
                <!-- 操作系统 -->
            <div class="filter">
                <div class="filter_left">操作系統：</div>
                <div class="filter_right">
                <el-checkbox-group v-model="phoneos" size="medium">
                    <el-checkbox-button v-for="androidos in android" :label="androidos" :key="androidos">{{androidos}}</el-checkbox-button>
                </el-checkbox-group>
                <el-checkbox-group v-model="phoneos" size="medium" style="padding-top:10px">
                    <el-checkbox-button v-for="iosos in ios" :label="iosos" :key="iosos">{{iosos}}</el-checkbox-button>
                </el-checkbox-group>
                </div>
            </div>
                <!-- 分辨率 -->
            <div class="filter">
                <div class="filter_left" style="letter-spacing: 6px;">分辨率：</div>
                <div class="filter_right">
                <el-checkbox-group v-model="phoneResolu" size="medium">
                    <el-checkbox-button v-for="ResolutionL in ResolutionLs" :label="ResolutionL" :key="ResolutionL">{{ResolutionL}}</el-checkbox-button>
                </el-checkbox-group>
                </div>
            </div>
            
            </div>
        </div>

        <div class="cloud-list">

        </div>
    </div>
  
</template>

<script>
const phonebrands = ["全部", "iphone", "小米", "华为", "vivo", "oppo"];
const phoneAnos = ["全部Android", "Android 10", "Android 9", "Android 8.1", "Android 8.0", "Android 7.1", 'Android 7.0', 'Android 6.0', 'Android 5.1'];
const phoneIos = ["全部Ios", "iOS 13.3", "iOS 13.1.3", "iOS 13.0", "iOS 12.4", "iOS 12.3.1", "iOS 12.3", "iOS 12.2", "iOS 12.1"]
const phoneResolution = ["全部", "1080x1920", "1080x2160", "1080x2220", "1080x2232", "1080x2240", "1080x2244", "1080x2248", "1080x2280", "1080x2310"];

export default {
  data() {
    return {
      phonebrand: ["全部"],
      phoneos: ['全部Android', "全部Ios"],
      phoneResolu: ["全部"],
      brands: phonebrands,
      android: phoneAnos,
      ios: phoneIos,
      ResolutionLs: phoneResolution,
    };
  }
};
</script>

<style>

.cloud {
    height: 100vh;
}

.cloud-filter {
  /* display: flex; */
  height: 26vh;
  background-color: bisque;
  position: absolute;
  width: 100%;
  overflow:hidden
}

.cloud-list {
    height: auto;
    background-color: aquamarine;
}

.filter {
    /* float: left; */
    padding: 5px;
}

.filter_left {
  /* float: left; */
  padding: 10px;
  width: 86px;
  font-size: 14px
}

.filter_right {
    float: left;
    padding: 0,10px,0,0;
}
</style>