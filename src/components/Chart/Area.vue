<template>
  <path ref="area" class="area" :style="style"></path>
</template>

<script>
import { area } from "d3-shape";
import { select } from "d3-selection";

export default {
  props: ["layout", "seriesData", "scale"],
  computed: {
    style: function() {
      return {
        fill: this.scale.color(this.seriesData.id),
        fillOpacity: 0.25
      };
    }
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler: function(val, oldVal) {
        this.drawArea();
      }
    }
  },
  mounted: function() {
    this.drawArea();
  },
  methods: {
    drawArea: function() {
      // Get scale
      var scale = this.scale;

      // Area object
      var d3Area = area()
        .x(function(d) {
          return scale.x(d.timestamp);
        })
        .y0(scale.y(0))
        .y1(function(d) {
          return scale.y(d.value);
        });

      // DOM node for area
      var $area = select(this.$refs.area);

      $area
        .datum(
          this.seriesData.values.filter(function(d) {
            return typeof d.value !== typeof null;
          })
        )
        .attr("d", d3Area);
    }
  }
};
</script>
