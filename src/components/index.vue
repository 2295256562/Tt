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
        </div>

      </div>

      <!--定时任务总数-->
      <div class="data-div">
        <div class="data-text">定时任务总数</div>
        <div>
          <i class="iconfont icon-dingshirenwu size"></i>
        </div>

      </div>

      <!--即时任务-->
      <div class="data-div">
        <div class="data-text">即时任务</div>
        <div>
          <i class="iconfont icon-renwu size"></i>
        </div>

      </div>

    </div>
    <div class="report" id="c1"></div>
    <div></div>
  </div>
</template>

<script>
import G2 from '@antv/g2';
  export default {
    data() {
      return {
        caseNumber: 11
      }
    },
    mounted() {
      this.drawCart()
    },
    methods: {
      drawCart() {
        const data = [
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
          { year: '1996', value: 6 },
          { year: '1997', value: 7 },
          { year: '1998', value: 9 },
          { year: '1999', value: 13 }
        ];
        const chart = new G2.Chart({
          container: 'c1',
          forceFit: true,
          height: 500
        });
        chart.source(data);
        chart.scale('value', {
          min: 0
        });
        chart.scale('year', {
          range: [ 0, 1 ]
        });
        chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        });
        chart.line().position('year*value');
        chart.point().position('year*value')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1
          });
        chart.render();
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
