<template>
  <div ref="test">
    <slot />
  </div>
</template>

<script>
import Vue from "vue";

// https://forum.vuejs.org/t/how-to-watch-the-height-change-dom-of-an-element-in-vuejs/21290/14
export default {
  name: "DivContainer",
  mounted() {
    debugger;
    // this.$refs.test.addEventListener("onresize", () => {
    //   this.console.log("resizeed");
    // });
    this.setWidth(this.$refs.test);
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
    setWidth(el) {
      Vue.set(el, "clientWidth");
    }
  }
};
</script>
