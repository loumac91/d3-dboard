<template>
  <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
    <g class="d3__stage" :style="stageStyle">
      <Axis
        v-for="axis in uniqueAxes"
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

import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { utcParse } from "d3-time-format";
import { extent, max } from "d3-array";

export default {
  components: {
    Axis,
    Series
  },
  props: ["axes", "layout", "chartData"],
  data: function() {
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
    // SVG viewbox
    viewBox: function() {
      var outerWidth =
          this.layout.width + this.layout.marginLeft + this.layout.marginRight,
        outerHeight =
          this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return "0 0 " + outerWidth + " " + outerHeight;
    },

    // Stage
    stageStyle: function() {
      return {
        transform:
          "translate(" +
          this.layout.marginLeft +
          "px," +
          this.layout.marginTop +
          "px)"
      };
    },

    uniqueAxes: function() {
      // Creates a duplicate-free version of an array, using SameValueZero for equality comparisons,
      // in which only the first occurrence of each element is kept. The order of result values is
      // determined by the order they occur in the array.
      return _.uniq(this.axes);
    }
  },
  watch: {
    // Watch for layout changes
    layout: {
      deep: true,
      handler: function(val, oldVal) {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
      }
    }
  },
  mounted() {
    debugger;
    this;
  },
  methods: {
    // Get x-axis scale
    getScaleX: function() {
      return scaleTime()
        .range([0, this.layout.width])
        .domain(
          extent(this.chartData, function(d) {
            debugger;
            return utcParse("%Y-%m-%dT%H:%M:%S")(d[0]).setHours(0, 0, 0, 0);
          })
        );
    },

    // Get y-axis scale
    getScaleY: function() {
      return scaleLinear()
        .range([this.layout.height, 0])
        .domain([
          0,
          max(this.chartData, function(d) {
            return max(d.values, function(e) {
              return e.value;
            });
          })
        ]);
    }
  }
};
</script>
