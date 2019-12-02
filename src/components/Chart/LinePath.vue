<template>
  <path class="line" :style="style" :d="d"></path>
</template>

<script>
// curve interpolation comparison here - https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
import { line, curveMonotoneX } from "d3-shape";

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
  computed: {
    style() {
      return {
        fill: "none",
        stroke: this.scale.color(this.seriesData.id),
        strokeWidth: 1
      };
    },
    d() {
      const computedLine = line()
        .curve(curveMonotoneX)
        .x(d => this.scale.x(d.timestamp))
        .y(d => this.scale.y(d.value));

      return computedLine(this.lineData);
    },
    lineData() {
      return this.seriesData.values.filter(d => {
        return typeof d.value !== typeof null;
      });
    }
  }
};
</script>
