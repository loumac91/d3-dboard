<template>
  <g class="points">
    <Point
      v-for="pointData in seriesData.values"
      v-if="typeof pointData.value !== typeof null"
      :series-id="seriesData.id"
      :point-data="pointData"
      :layout="layout"
      :scale="scale"
    />
  </g>
</template>

<script>
import Point from "./Point.vue";

export default {
  components: {
    Point
  },
  props: ["layout", "seriesData", "scale"],
  watch: {
    scale: {
      deep: true,
      handler: function() {} // Has to be included for nested components watch to fire properly
    }
  }
};
</script>
