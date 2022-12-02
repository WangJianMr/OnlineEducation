import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
let INFO = "info"
let TOKEN = "token"
let PHONE = 'phone'
const store = new Vuex.Store({
	state:{
		info:uni.getStorageSync(INFO) || {},
		token:uni.getStorageSync(TOKEN) || '',
		phone:uni.getStorageSync(PHONE) || null,
		userInfoObj:{},
	},
	getters:{
		getTokens(state){
			return !!state.token
		},
	},
	mutations:{
		init(){
		},
		registerOk(state,obj){
			state.userInfoObj = obj
			if(obj){
				uni.setStorageSync(INFO,obj) 
			}
			if(obj.token){
				uni.setStorageSync(TOKEN,obj.token) 
			}
			if(obj.phone){
				uni.setStorageSync(PHONE,obj.phone) 
			}
		},
		setPhone(state,option){
			state.info.phone = option
			state.phone = option
			uni.setStorageSync(INFO,state.info) 
			uni.setStorageSync(PHONE,state.phone) 
			
		}
	},
	actions:{
	},
	modules:{},
})
export default store