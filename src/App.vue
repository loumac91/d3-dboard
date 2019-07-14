<template>
  <div id="grid-container">
    <header class="header"></header>
    <main class="main">
      <!-- <div class="main-header"> -->
      <DivContainer class="main-header">
        <BarChart :data="values" :padding="3" colour="orange" />
      </DivContainer>
      <!-- </div> -->
      <div class="main-overview">
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
        <div class="overviewcard">
          <div class="overviewcard__icon">Overview</div>
          <div class="overviewcard__info">Card</div>
        </div>
      </div>
      <div class="main-cards">
        <div class="card">Card</div>
        <div class="card">Card</div>
        <div class="card">Card</div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer__copyright">&copy; 2019 JE</div>
      <div class="footer__signature">Footer Placeholder</div>
    </footer>
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import DivContainer from "./components/DivContainer.vue";

export default {
  name: "App",
  components: {
    BarChart,
    DivContainer
  },
  data() {
    return {
      values: [
        {
          v: 10
        },
        {
          v: 20
        },
        {
          v: 30
        }
      ]
    };
  }
};
</script>
