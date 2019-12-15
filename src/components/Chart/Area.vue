<template>
  <path ref="area" class="area" :style="style" :d="d">
    <animate attribute-name="stroke-dashoffset" to="0" dur="0.75s" />
  </path>
</template>

<script>
import { area, curveMonotoneX } from "d3-shape";

export default {
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
  data() {
    return {
      style: null
    };
  },
  computed: {
    d() {
      const computedArea = area()
        .curve(curveMonotoneX)
        .x(d => this.scale.x(d.timestamp))
        .y0(this.scale.y(0))
        .y1(d => this.scale.y(d.value));

      return computedArea(this.areaDatum);
    },
    areaDatum() {
      return this.seriesData.values.filter(d => {
        return typeof d.value !== typeof null;
      });
    }
  },
  mounted() {
    this.setStyle();
  },
  methods: {
    setStyle() {
      const totalLength = this.$refs.area.getTotalLength();
      console.log(totalLength);
      this.style = {
        fill: this.scale.color(this.seriesData.id),
        "stroke-dashoffset": `${totalLength}`,
        "stroke-dasharray": `${totalLength} ${totalLength}`
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.area {
  fill-opacity: 0.3;
  // animation: dash $chart-animation-time linear forwards;
}

// @keyframes dash {
//   to {
//     stroke-dashoffset: 0;
//   }
// }
</style>
