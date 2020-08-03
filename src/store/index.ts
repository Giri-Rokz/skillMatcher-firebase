import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import storeData from '@/store/modules/storedata';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {storeData},
  plugins: [createPersistedState()]
});
