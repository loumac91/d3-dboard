<template>
  <path :id="id" ref="path" class="line" :style="style" :d="d">
    <!-- eslint-disable -->
      <animate
        :attr="`xlink:href: ${id}`"
        attributeName="stroke-dashoffset"
        :from="this.totalLength"
        to="0"
        :dur="`${animationDuration}s`"
        repeatCount="1"
        fill="freeze"
      ></animate>      
    <!-- eslint-enable -->
  </path>
</template>

<script>
// curve interpolation comparison here - https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
import { line, curveMonotoneX } from "d3-shape";
import nanoid from "nanoid";

//https://css-tricks.com/almanac/properties/s/stroke-dashoffset/
//https://css-tricks.com/guide-svg-animations-smil/
//https://github.com/vuejs/vue/issues/648

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
    },
    animationDuration: {
      type: String,
      required: false,
      default: "0.75"
    }
  },
  data() {
    return {
      style: null,
      id: `line-${nanoid()}`,
      totalLength: null
    };
  },
  computed: {
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
  },
  mounted() {
    this.setStyle();
  },
  methods: {
    setStyle() {
      this.totalLength = this.$refs.path.getTotalLength();
      this.style = {
        stroke: this.scale.color(this.seriesData.id),
        "stroke-dasharray": `${this.totalLength} ${this.totalLength}`,
        "stroke-dashoffset": this.totalLength
      };
    }
  }
};
</script>

<style scoped lang="scss">
.line {
  fill: none;
  stroke-width: 2;
  stroke-miterlimit: 10;
}
</style>
