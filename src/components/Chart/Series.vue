<template>
  <g class="d3__series">
    <Area :layout="layout" :series-data="seriesData" :scale="scale" />
    <LinePath :layout="layout" :series-data="seriesData" :scale="scale" />
    <Scatter :layout="layout" :series-data="seriesData" :scale="scale" />
  </g>
</template>

<script>
import Area from "./Area.vue";
import LinePath from "./LinePath.vue";
import Scatter from "./Scatter.vue";

export default {
  components: {
    Area,
    LinePath,
    Scatter
  },
  props: {
    layout: {
      type: Object,
      required: true
    },
    seriesData: {
      type: Object,
      required: true
    },
    scale: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.scale.x.bandwidth());
  }
};
</script>

<style>
.left-to-right-enter-active {
  /* transition-property: opacity; */
  transition: all 2.3s ease;
}

.left-to-right-enter {
  opacity: 0;
}
</style>
