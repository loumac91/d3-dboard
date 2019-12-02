<template>
  <g class="points">
    <Point
      v-for="(pointData, index) in filteredData"
      :key="index"
      :series-id="seriesData.id"
      :point-data="pointData.value"
      :layout="layout"
      :scale="scale"
      :selected="pointData.selected"
      @click="handleClick(pointData, index)"
    />
  </g>
</template>

<script>
import Point from "./Point.vue";

export default {
  components: {
    Point
  },
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
    }
  },
  data() {
    return {
      filteredData: this.getFilteredSeriesData()
    };
  },
  computed: {
    nonNullSeriesValues() {
      const filtered = this.seriesData.values.filter(
        v => typeof v.value !== typeof null
      );
      return filtered.map((e, i) => {
        return { selected: i === filtered.length - 1, value: e };
      });
    }
  },
  methods: {
    getFilteredSeriesData() {
      const filtered = this.seriesData.values.filter(
        v => typeof v.value !== typeof null
      );
      return filtered.map((e, i) => {
        return { selected: i === filtered.length - 1, value: e };
      });
    },
    handleClick(pointData, index) {
      this.$set(this.filteredData[index], "selected", true);
    }
  }
};
</script>
