import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    userInfo:{},
    schoolInfo:{}
}
const mutations={
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    updateSchoolInfo (state, schoolInfo) {
      state.schoolInfo = schoolInfo
    },
}
export default new Vuex.Store({
    state,
    mutations
});