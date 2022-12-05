import Vue from "vue"
import Vuex from "vuex"
import loginApi from "@/api/login.js"
import {msg} from "@/common/js/utils.js"
Vue.use(Vuex)
let INFO = "info"
let TOKEN = "token"
let PHONE = 'phone'
const store = new Vuex.Store({
	state:{
		info:uni.getStorageSync(INFO) || {},
		token:uni.getStorageSync(TOKEN) || null,
		phone:uni.getStorageSync(PHONE) || null,
		userInfoObj:{},
	},
	getters:{
		getTokens(state){
			return !!state.token
		},
	},
	mutations:{
		init(state){
			state.token = uni.getStorageSync(TOKEN) || ""
			state.info = uni.getStorageSync(INFO) || {}
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
		},
		emitInfo(state,obj){
			console.log(obj);
			if(obj.avatar){
				state.info.avatar = obj.avatar
			}
			if(obj.nickname){
				state.info.nickname = obj.nickname
			}
			if(obj.sex){
				state.info.sex = obj.sex
			}
			console.log(state.info);
		}
	},
	actions:{
		async loginOut({commit}){
			try{
				const res = await loginApi.getLoginOut()
				if(res.statusCode!==200){
					msg(res.data.data)
					return false
				}else{
					msg('退出成功')
					uni.clearStorageSync()
					loginApi.getCoupon()
					return true
				}
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	modules:{},
})
export default store