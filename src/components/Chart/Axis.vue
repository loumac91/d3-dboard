<template>
  <g ref="axis" :class="[classList]" :style="style"></g>
</template>

<script>
import { select } from "d3-selection";
import { axisTop, axisRight, axisBottom, axisLeft } from "d3-axis";
import { timeFormat } from "d3-time-format";

export default {
  props: ["axis", "layout", "scale"],
  data: function() {
    return {
      classList: ["axis"].concat(this.getAxisClasses())
    };
  },
  computed: {
    style: function() {
      return {
        transform: this.getAxisTransform()
      };
    }
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler: function(val, oldVal) {
        this.drawAxis();
      }
    }
  },
  mounted: function() {
    this.drawAxis();
  },
  methods: {
    // Return a class list containg the appropriate labels for axes
    getAxisClasses: function() {
      var axis = {
        top: "x",
        bottom: "x",
        left: "y",
        right: "y"
      };
      return [this.axis, axis[this.axis]];
    },

    // Draw axis
    drawAxis: function() {
      var $axis = select(this.$refs.axis);
      var scale = this.scale;
      var axisGenerator = {
        top: axisTop(scale.x).tickFormat(timeFormat("%b %d")),
        right: axisRight(scale.y),
        bottom: axisBottom(scale.x).tickFormat(timeFormat("%b %d")),
        left: axisLeft(scale.y)
      };

      $axis.call(axisGenerator[this.axis]);
    },

    // Return necessary axis transformation for proper positioning
    getAxisTransform: function() {
      var axisOffset = {
        top: { x: 0, y: 0 },
        right: { x: this.layout.width, y: 0 },
        bottom: { x: 0, y: this.layout.height },
        left: { x: 0, y: 0 }
      };

      return (
        "translate(" +
        axisOffset[this.axis].x +
        "px, " +
        axisOffset[this.axis].y +
        "px)"
      );
    }
  }
};
</script>
