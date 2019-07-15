<template>
  <g class="d3__series">
    <Area :layout="layout" :series-data="this.seriesData" :scale="this.scale" />
    <Line :layout="layout" :series-data="this.seriesData" :scale="this.scale" />
    <Scatter
      :layout="layout"
      :series-data="this.seriesData"
      :scale="this.scale"
    />
  </g>
</template>

<script>
import Area from "./Area.vue";
import Line from "./Line.vue";
import Scatter from "./Scatter.vue";

export default {
  components: {
    Area,
    Line,
    Scatter
  },
  props: ["layout", "seriesData", "scale"]
};
</script>
