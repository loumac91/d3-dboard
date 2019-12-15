import Vue from "vue";
import { FETCH_CHART_DATA } from "@/store/actionTypes";
import { SET_CHART_DATA } from "@/store/mutationTypes";

const state = {
  chartData: {}
};

const getters = {
  getChartData(state) {
    return type => {
      state.chartData[type];
    };
  }
};

const actions = {
  [FETCH_CHART_DATA]: async function() {
    return Promise.resolve();
  }
};

const mutations = {
  [SET_CHART_DATA]: function(state, { type, data }) {
    Vue.set(state.chartData, type, data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
