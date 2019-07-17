<template>
  <g class="d3__series">
    <Area :layout="layout" :series-data="seriesData" :scale="scale" />
    <ChartLine :layout="layout" :series-data="seriesData" :scale="scale" />
    <Scatter :layout="layout" :series-data="seriesData" :scale="scale" />
  </g>
</template>

<script>
import Area from "./Area.vue";
import ChartLine from "./ChartLine.vue";
import Scatter from "./Scatter.vue";

export default {
  components: {
    Area,
    ChartLine,
    Scatter
  },
  props: ["layout", "seriesData", "scale"]
};
</script>
