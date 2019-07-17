<template>
  <path ref="line" class="line" :style="style"></path>
</template>

<script>
import { line } from "d3-shape";
import { select } from "d3-selection";

export default {
  props: ["layout", "seriesData", "scale"],
  computed: {
    style: function() {
      return {
        fill: "none",
        stroke: this.scale.color(this.seriesData.id),
        strokeWidth: 2
      };
    }
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler: function(val, oldVal) {
        this.drawLine();
      }
    }
  },
  mounted: function() {
    this.drawLine();
  },
  methods: {
    drawLine: function() {
      // Get scale
      var scale = this.scale;
      debugger;
      // Line object
      var d3Line = line()
        .x(function(d) {
          return scale.x(d.timestamp);
        })
        .y(function(d) {
          return scale.y(d.value);
        });

      // DOM node for line
      var $line = select(this.$refs.line);
      $line
        .data([
          this.seriesData.values.filter(function(d) {
            return typeof d.value !== typeof null;
          })
        ])
        .attr("d", d3Line);
    }
  }
};
</script>
