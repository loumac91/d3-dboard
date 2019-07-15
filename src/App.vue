<template>
  <div id="grid-container">
    <header class="header"></header>
    <main class="main">
      <!-- <DivContainer class="main-header">
        <BarChart :data="values" :padding="3" colour="orange" />
      </DivContainer> -->
      <div class="main-header">
        <Chart
          v-if="this.chartData"
          :layout="layout"
          :chart-data="chartData"
          :axes="axes"
        />
      </div>
      <div class="main-overview">
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
      </div>
      <div class="main-cards">
        <div class="card">Card</div>
        <div class="card">Card</div>
        <div class="card">Card</div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer__copyright">&copy; 2019 JE</div>
      <div class="footer__signature">Footer Placeholder</div>
    </footer>
  </div>
</template>

<script>
// import BarChart from "./components/BarChart.vue";
// import DivContainer from "./components/DivContainer.vue";
import Chart from "./components/Chart/Chart.vue";

import { baseData } from "./baseData";
import { utcParse } from "d3-time-format";

export default {
  name: "App",
  components: {
    // BarChart,
    // DivContainer,
    Chart
  },
  data() {
    return {
      // values: [
      //   {
      //     v: 10
      //   },
      //   {
      //     v: 20
      //   },
      //   {
      //     v: 30
      //   }
      // ],
      layout: {
        width: 800,
        height: 250,
        marginTop: 45,
        marginRight: 35,
        marginBottom: 50,
        marginLeft: 50
      },
      axes: ["left", "bottom"]
    };
  },
  computed: {
    chartData() {
      // https://codepen.io/terrymun/pen/gmBdKq
      var cData = baseData.data.flipbooks.rawData;

      var columns = ["Timestamp", "Previous", "Current"],
        offset = 1;
      return columns.slice(offset).map(function(id, index) {
        return {
          id: id,
          values: cData.map(function(d) {
            return {
              timestamp: utcParse("%Y-%m-%dT%H:%M:%S")(d[0]).setHours(
                0,
                0,
                0,
                0
              ),
              value: d[index + offset]
            };
          })
        };
      });
    }
  }
};
</script>
