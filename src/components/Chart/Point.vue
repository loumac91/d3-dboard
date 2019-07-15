<template>
  <circle ref="point" class="point" :style="style"></circle>
</template>

<script>
import { select } from "d3-selection";

export default {
  props: ["layout", "pointData", "scale", "seriesId"],
  computed: {
    style: function() {
      return {
        fill: "#fff",
        stroke: this.scale.color(this.seriesId),
        strokeWidth: 2
      };
    }
  },
  watch: {
    scale: {
      deep: true,
      handler: function(val, oldVal) {
        this.drawPoint();
      }
    }
  },
  mounted: function() {
    this.drawPoint();
  },
  methods: {
    drawPoint: function() {
      // Get scales
      var scale = this.scale;

      // DOM node for points
      var $point = select(this.$refs.point);
      $point
        .datum(this.pointData)
        .attr("cx", function(d) {
          return scale.x(d.timestamp);
        })
        .attr("cy", function(d) {
          return scale.y(d.value);
        })
        .attr("r", 5);
    }
  }
};
</script>
