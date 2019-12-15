<template>
  <svg :view-box.camel="viewBox">
    <g class="d3__stage" :style="stageStyle">
      <Axis
        v-for="axis in uniqueAxis"
        :key="axis"
        :axis="axis"
        :layout="layout"
        :scale="scale"
      ></Axis>
      <Series
        v-for="seriesData in chartData"
        :key="seriesData.id"
        :series-data="seriesData"
        :layout="layout"
        :scale="scale"
      ></Series>
    </g>
  </svg>
</template>

<script>
import Axis from "./Axis.vue";
import Series from "./Series.vue";
import _ from "lodash";

import { scaleTime, scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
import { max, min } from "d3-array";

export default {
  components: {
    Axis,
    Series
  },
  props: {
    axes: {
      type: Array,
      required: true
    },
    layout: {
      type: Object,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      scale: {
        x: this.getScaleX(),
        y: this.getScaleY(),
        color: scaleOrdinal()
          .range(["#159078", "#999999"])
          .domain(["Current", "Previous"])
      }
    };
  },
  computed: {
    viewBox() {
      const outerWidth =
        this.layout.width + this.layout.marginLeft + this.layout.marginRight;

      const outerHeight =
        this.layout.height + this.layout.marginTop + this.layout.marginBottom;

      return `0 0 ${outerWidth} ${outerHeight}`;
    },
    stageStyle() {
      return {
        transform: `translate(${this.layout.marginLeft}px, ${this.layout.marginTop}px)`
      };
    },
    uniqueAxis() {
      // Creates a duplicate-free version of an array, using SameValueZero for equality comparisons,
      // in which only the first occurrence of each element is kept. The order of result values is
      // determined by the order they occur in the array.
      return _.uniq(this.axes);
    }
  },
  watch: {
    layout: {
      deep: true,
      // eslint-disable-next-line
      handler(val, oldVal) {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
      }
    }
  },
  methods: {
    getScaleX() {
      // https://www.d3-graph-gallery.com/graph/custom_axis.html
      const test = scaleBand()
        .range([0, this.layout.width])
        .domain([
          min(this.chartData, d => {
            return min(d.values, e => {
              return e.timestamp;
            });
          }),
          max(this.chartData, d => {
            return max(d.values, e => {
              return e.timestamp;
            });
          })
        ]);
      console.log(test.bandwidth());

      return scaleTime()
        .range([0, this.layout.width])
        .domain([
          min(this.chartData, d => {
            return min(d.values, e => {
              return e.timestamp;
            });
          }),
          max(this.chartData, d => {
            return max(d.values, e => {
              return e.timestamp;
            });
          })
        ]);
    },
    getScaleY() {
      return scaleLinear()
        .range([this.layout.height, 0])
        .domain([
          0,
          max(this.chartData, d => {
            return max(d.values, e => {
              return e.value;
            });
          })
        ]);
    }
  }
};
</script>
