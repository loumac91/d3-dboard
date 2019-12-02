<template>
  <path ref="line" class="line" :style="style"></path>
</template>

<script>
import { line } from "d3-shape";
import { select } from "d3-selection";

export default {
  props: ["layout", "seriesData", "scale"],
  computed: {
    style() {
      return {
        fill: "none",
        stroke: this.scale.color(this.seriesData.id),
        strokeWidth: 8 // 2
      };
    },
    nonNullSeriesDataValues() {
      return this.seriesData.values.filter(function(d) {
        return typeof d.value !== typeof null;
      });
    }
  },
  watch: {
    // Changes to scale means we have to redraw the line
    scale: {
      deep: true,
      handler() {
        this.drawLine();
      }
    }
  },
  mounted: function() {
    this.drawLine();
  },
  methods: {
    drawLine: function() {
      // Line object
      const d3Line = line()
        .x(this.getXScale)
        .y(this.getYScale);

      // DOM node for line
      const $line = select(this.$refs.line);
      $line.data([this.nonNullSeriesDataValues]).attr("d", d3Line);
    },
    getXScale(d) {
      return this.scale.x(d.timestamp);
    },
    getYScale(d) {
      return this.scale.y(d.value);
    }
  }
};
</script>
