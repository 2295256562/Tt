<template>
  <div style="height: 100%">
    <div class="indexpage">
      <!--用例总数-->
      <div class="data-div" style="margin-left: 20px">
        <div class="data-text">用例总数</div>
        <div>
          <i class="iconfont icon-test-case-group-copy size"></i>
          <span>{{ caseNumber }}</span>
        </div>
      </div>

      <!--项目总数-->
      <div class="data-div">
        <div class="data-text">项目总数</div>
        <div>
          <i class="iconfont icon-xiangmu2 size"></i>
          <span>{{project}}</span>
        </div>

      </div>

      <!--定时任务总数-->
      <div class="data-div">
        <div class="data-text">定时任务总数</div>
        <div>
          <i class="iconfont icon-dingshirenwu size"></i>
          <span>{{TimerTask}}</span>
        </div>

      </div>

      <!--即时任务-->
      <div class="data-div">
        <div class="data-text">以构建次数</div>
        <div>
          <i class="iconfont icon-renwu size"></i>
        </div>

      </div>

    </div>
    <div class="report" id="c1"></div>
  </div>
</template>

<script>
    import G2 from '@antv/g2';
    import {Datareport} from '../api/api'

    export default {
        created() {
            this.DataReport()
        },
        data() {
            return {
                caseNumber: 0,
                project: 0,
                TimerTask: 0,
                data: []
            }
        },
        mounted() {
            console.log(this.data)

        },
        methods: {
            drawCart() {
                const data = this.data
                const chart = new G2.Chart({
                    container: 'c1',
                    forceFit: true,
                    height: 700,
                    width: 88
                });
                chart.source(data);
                chart.scale({
                    count: {
                        min: 0,
                        max:100,
                        // tickInterval: 5,

                    },
                });
                chart.axis("name", {
                  create_time: {
                    rotate: Math.PI / 3,
                    textAlign: "start",
                    textBaseline: "middle"
                  }
                });
                chart.tooltip({
                    showCrosshairs: true, // 展示 Tooltip 辅助线
                    shared: true,
                });
                chart.line().position('create_time*count').label('count');
                chart.point().position('create_time*count')
                chart.render();
            },

            DataReport() {
                Datareport().then(res => {
                    this.caseNumber = res.data.data.CASESUM;
                    this.project = res.data.data.PROJECTSUM;
                    this.TimerTask = res.data.data.TimerTask;
                    this.data = res.data.data.RECENTLYADDCASE
                    this.drawCart()
                })
            }
        }
    }
</script>

<style scoped>
  .indexpage {
    display: flex;
  }

  .data-div {
    width: 23%;
    height: 100px;
    background-color: #92FFF9;
    margin-right: 20px;
    margin-top: 20px;
    float: left;
  }

  .data-text {
    padding: 10px 20px;
    font-size: 16px;
    color: #9999FF;
  }

  .size {
    font-size: 24px;
    padding: 10px 20px;
  }

  .report {
    margin: 20px;
    width: auto;
    height: 78%;
    /*background-color: #999999;*/
    /*border: 0.5px solid #666666;*/
  }
</style>
