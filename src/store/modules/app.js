import Vue from "vue";
import { ACTION_PERFORM, FAKE_LOADING_ACTION } from "@/store/actionTypes";
import { SET_ACTION_STATE, SET_LOADING_STATE } from "@/store/mutationTypes";

const state = {
  actionStates: {},
  loadingStates: new Proxy(
    {},
    {
      get(obj, prop) {
        return prop in obj ? obj[prop] : false;
      }
    }
  )
};

const getters = {
  getLoadingState(state) {
    return actionName => {
      return state.loadingStates[actionName];
    };
  }
};

const actions = {
  [ACTION_PERFORM]: async function() {
    return Promise.resolve();
  },
  [FAKE_LOADING_ACTION]: function({ commit }) {
    // put this in a util function
    commit(SET_LOADING_STATE, {
      name: FAKE_LOADING_ACTION,
      loading: true
    });
    setTimeout(() => {
      console.log("wew");
      commit(SET_LOADING_STATE, {
        name: FAKE_LOADING_ACTION,
        loading: false
      });
    }, 3000);
  }
};

const mutations = {
  [SET_ACTION_STATE]: function(state, { name, data }) {
    Vue.set(state.actionStates, name, data);
  },
  [SET_LOADING_STATE]: function(state, { name, loading }) {
    Vue.set(state.loadingStates, name, loading);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
