import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo: {},
        communicationInfo: {},
    },
    mutations: {
        setCommunicationInfo(state, info) {
            state.communicationInfo = info
        },
        setUserInfo(state, info) {
            state.userInfo = info
        },
    },
    actions: {},
    getters: {},
    modules: {}
})


export default store