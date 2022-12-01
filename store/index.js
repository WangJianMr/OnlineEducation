import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
let INFO = "info"
let TOKEN = "token"
const store = new Vuex.Store({
	state:{
		info:uni.getStorageSync(INFO) || {},
		token:uni.getStorageSync(TOKEN) || '',
	},
	getters:{
		getToken(state){
			return !!state.token
		},
	},
	mutations:{
		
	},
	actions:{},
	modules:{},
})
export default store