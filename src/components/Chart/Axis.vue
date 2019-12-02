<template>
  <g ref="axis" :class="['axis', axisClasses]" :style="axisTransform"></g>
</template>

<script>
import { select } from "d3-selection";
import { axisTop, axisRight, axisBottom, axisLeft } from "d3-axis";
import { timeFormat } from "d3-time-format";

export default {
  props: {
    axis: {
      type: String,
      required: true
    },
    layout: {
      type: Object,
      required: true
    },
    scale: {
      type: Object,
      required: true
    }
  },
  computed: {
    axisClasses() {
      // Return a class list containg the appropriate labels for axes
      const axis = {
        top: "x",
        bottom: "x",
        left: "y",
        right: "y"
      };

      return [this.axis, axis[this.axis]];
    },
    axisTransform() {
      const axisOffset = {
        top: { x: 0, y: 0 },
        right: { x: this.layout.width, y: 0 },
        bottom: { x: 0, y: this.layout.height },
        left: { x: 0, y: 0 }
      };

      return {
        transform: `translate(${axisOffset[this.axis].x}px, ${axisOffset[this.axis].y}px)`
      };
    }
    // axisGenerator() {
    //   return {
    //     top: axisTop(this.scale.x).tickFormat(timeFormat("%b %d")),
    //     right: axisRight(this.scale.y),
    //     bottom: axisBottom(this.scale.x).tickFormat(timeFormat("%b %d")),
    //     left: axisLeft(this.scale.y)
    //   };
    // }
    // axis() {
    // needs to be broken down further i.e. into each child node
    // }
  },
  watch: {
    scale: {
      deep: true,
      // eslint-disable-next-line
      handler(val, oldVal) {
        this.drawAxis();
      }
    }
  },
  mounted() {
    this.drawAxis();
  },
  methods: {
    drawAxis() {
      const $axis = select(this.$refs.axis);
      const scale = this.scale;
      const axisGenerator = {
        top: axisTop(scale.x).tickFormat(timeFormat("%b %d")),
        right: axisRight(scale.y),
        bottom: axisBottom(scale.x).tickFormat(timeFormat("%b %d")),
        left: axisLeft(scale.y)
      };

      $axis.call(axisGenerator[this.axis]);
    }
  }
};
</script>
