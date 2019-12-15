<template>
  <div id="grid-container">
    <div ref="header" class="main-header">
      <LoadingIndicator />
      <Chart
        v-if="chartData"
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
      <div v-if="isFakeActionLoading" class="overviewcard">
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
    <footer class="footer">
      <div class="footer__copyright">&copy; 2019 JE</div>
      <div class="footer__signature">Footer Placeholder</div>
    </footer>
  </div>
</template>

<script>
import Chart from "./components/Chart/Chart.vue";
import LoadingIndicator from "./components/LoadingIndicator.vue";

import { baseData } from "./baseData";
import { utcParse } from "d3-time-format";

export default {
  name: "App",
  components: {
    Chart,
    LoadingIndicator
  },
  data() {
    return {
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
      const cData = baseData.data.flipbooks.rawData;

      const columns = ["Timestamp", "Previous", "Current"];
      const offset = 1;

      const chartData = columns.slice(offset).map((id, index) => {
        return {
          id: id,
          values: cData.map(d => {
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

      return chartData.slice(0, 1);
    },
    isFakeActionLoading() {
      return this.$store.getters["getLoadingState"]("FAKE_LOADING_ACTION");
    }
  },
  mounted() {
    this.$store.dispatch("FAKE_LOADING_ACTION");
  }
};
</script>
