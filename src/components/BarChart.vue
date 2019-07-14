<template>
  <svg class="bar-chart">
    <rect
      v-for="d in layout"
      :key="d.key"
      class="bar"
      :x="d.x"
      :y="d.y"
      :width="d.width"
      :height="d.height"
      :fill="colour"
    />
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    padding: {
      type: Number,
      default: 1
    },
    colour: {
      type: String,
      default: "gray"
    }
  },
  data() {
    return {
      width: 200,
      height: 200
    };
  },
  computed: {
    layout() {
      this.x.domain([0, this.data.length]).range([0, this.width]);
      this.y
        .domain([
          0,
          d3.max(this.data, function(d) {
            return d.v;
          })
        ])
        .range([0, this.height]);
      return this.data.map(
        (function(_this) {
          return function(d, i) {
            return {
              v: d.v,
              x: _this.x(i),
              y: _this.y.range()[1] - _this.y(d.v),
              width: Math.max(1, _this.x(1) - _this.x(0) - _this.padding),
              height: _this.y(d.v),
              key: i
            };
          };
        })(this)
      );
    }
  },
  created() {
    this.x = d3.scaleLinear();
    return (this.y = d3.scaleLinear());
  },
  mounted() {
    this.width = this.$el.clientWidth;
    return (this.height = this.$el.clientHeight);
  }
};
</script>

<style>
.bar-chart {
  flex-grow: 1;
  margin: 6px;
}
</style>
