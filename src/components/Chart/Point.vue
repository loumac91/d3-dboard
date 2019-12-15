<template>
  <circle
    :class="['point', cssClass]"
    :cx="cx"
    :cy="cy"
    :r="r"
    :style="style"
    @click="handleClick"
  ></circle>
</template>

<script>
// v-on="this.$listeners"
export default {
  props: {
    layout: {
      type: Object,
      required: true
    },
    pointData: {
      type: Object,
      required: true
    },
    scale: {
      type: Object,
      required: true
    },
    seriesId: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    style() {
      return {
        // fill: this.selected ? "#ff0000" : "#fff",
        stroke: this.scale.color(this.seriesId),
        strokeWidth: 1
      };
    },
    r() {
      return this.selected ? 5 : 3;
    },
    cx() {
      return this.scale.x(this.pointData.timestamp);
    },
    cy() {
      return this.scale.y(this.pointData.value);
    },
    cssClass() {
      return {
        "is-active": this.selected
      };
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style scoped lang="scss">
.point {
  fill: #fff;

  &.is-active {
    fill: red;
  }

  &:hover {
    // pointer-events: all;
    fill: blue;
    box-shadow: red 0 8px blue;
  }
}

.point--selected {
  fill: blue;
}
</style>
