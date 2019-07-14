<template>
  <div ref="test" :onresize="this.right">
    <slot />
  </div>
</template>

<script>
// https://forum.vuejs.org/t/how-to-watch-the-height-change-dom-of-an-element-in-vuejs/21290/14
export default {
  name: "DivContainer",
  mounted() {
    this.$refs.test.addEventListener("onresize", () => {
      this.console.log("resizeed");
    });
  },
  // computed: {
  //   width() {
  //     debugger;
  //     console.log("wtest", this.$refs.test);
  //     return this.$el.clientWidth;
  //   },
  //   height() {
  //     console.log("htest", this.$refs.test);
  //     return this.$el.clientHeight;
  //   }
  // },
  methods: {
    right() {
      debugger;
      return "";
    }
  }
};
</script>
