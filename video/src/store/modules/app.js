const state = {
  modalExport: false,
  splitTime: {
	  start:0,
	  end:0
  },
  videoformate:{
	  default: 'mp4',
	  list: ['mp4','webm','wmv','gif']	  
  },
  rotate:{
	  default: 0,
	  list: [90,180,270]
  },
  resizeWidth: 0,
  resizeHeight: 0,
  step: 0
}

// getters
const getters = {
	modalExport: (state) => {
		return state.modalExport;
	},
	splitTime: (state) => {
		return state.splitTime;
	},
	videoformate: (state) => {
		return state.videoformate;
	},
	rotate: (state) => {
		return state.rotate;
	},
	resizeWidth: (state) => {
		return state.resizeWidth;
	},
	resizeHeight: (state) => {
		return state.resizeHeight;
	},
	step: (state) => {
		return state.step;
	}	
}

// actions
const actions = {
	setModalExport: ({commit, state}, newValue) => {
		commit('SET_MODAL_EXPORT', newValue);
		return state.modalExport;
	},
	setSplitTime: ({commit, state}, newValue) => {
		commit('SET_SPLIT_TIME', newValue);
		return state.splitTime;
	},
	setVideoformate: ({commit, state}, newValue) => {
		commit('SET_VIDEOFORMATE', newValue);
		return state.videoformate;
	},
	setRotate: ({commit, state}, newValue) => {
		commit('SET_ROTATE', newValue);
		return state.rotate;
	},
	setResizeWidth: ({commit, state}, newValue) => {
		commit('SET_RESIZE_WIDTH', newValue);
		return state.resizeWidth;
	},
	setResizeHeight: ({commit, state}, newValue) => {
		commit('SET_RESIZE_HEIGHT', newValue);
		return state.resizeHeight;
	},
	setStep: ({commit, state}, newValue) => {
		commit('SET_STEP', newValue);
		return state.step;
	}
}

// mutations
const mutations = {
	SET_MODAL_EXPORT(state, value){
		state.modalExport = value;
	},
	SET_SPLIT_TIME(state, value){

		state.splitTime.start = value;

		if(state.splitTime.start > state.splitTime.end){
			let temp = state.splitTime.start;
			state.splitTime.start = state.splitTime.end;
			state.splitTime.end = temp;
		}
	},
	SET_VIDEOFORMATE(state, value){
		state.videoformate.default = value;
	},
	SET_ROTATE(state, value){
		state.rotate.default = value;
	},
	SET_RESIZE_WIDTH(state, value){
		state.resizeWidth = value;
	},
	SET_RESIZE_HEIGHT(state, value){
		state.resizeHeight = value;
	},
	SET_STEP(state, value){
		state.step = value;
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}