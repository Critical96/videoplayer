import Vue from 'vue'
import Vuex from 'vuex'
import videoplayer from './modules/videoplayer'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		videoplayer
	}
})