import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		//用户id
		_id: '',
		isPrompt: true
	},
	mutations: {
		//接受传递的用户信息保存到userInfo中
		set_user_info(state, payload) {
			state.userInfo = payload
			// console.log('payload', payload);
		},
		//传入用户_id
		set_user_id(state, payload) {
			state._id = payload
		},
		//退出登录清除userInfo数据
		delete_user_info(state) {
			state.userInfo = null
			// console.log('退出2');
		}
	}
})
