const state = {
  videoName: "",
  videoUrl: "",
  videoDuration: "0",
  videoTimeScale: [],
  currentTimeVideo: "0"
}

const getters = {
	videoName: (state) => {
		return state.videoName;
	},
	videoUrl: (state) => {
		return state.videoUrl;
	},
	videoDuration: (state) => {
		return state.videoDuration;
	},
	videoTimeScale: (state) => {
		return state.videoTimeScale;
	},
	currentTimeVideo: (state) => {
		return state.currentTimeVideo;
	}
}

const actions = {
	setVideoName: ({commit, state}, newValue) => {
		commit('SET_VIDEO_NAME', newValue);
		return state.videoName;
	},
	setVideoUrl: ({commit, state}, newValue) => {
		commit('SET_VIDEO_URL', newValue);
		return state.videoUrl;
	},
	setVideoDuration: ({commit, state}, newValue) => {
		commit('SET_VIDEO_DURATION', newValue);
		return state.videoDuration;
	},
	setVideoTimeScale: ({commit, state}) => {

		commit('SET_VIDEO_TIME_SCALE');
		return state.videoTimeScale;
	},
	setCurrentTimeVideo: ({commit, state}, newValue) => {

		commit('SET_CURRENT_TIME_VIDEO', newValue);
		return state.currentTimeVideo;
	}
}

const mutations = {
	SET_VIDEO_NAME(state, value){
		state.videoName = value;
	},
	SET_VIDEO_URL(state, value){
		state.videoUrl = value;
	},
	SET_VIDEO_DURATION(state, value){
		state.videoDuration = value;
	},
	SET_VIDEO_TIME_SCALE(state, value){	

		let dt = state.videoDuration / 7;

		let currentTime = 0, arrScale = [];

		while(state.videoDuration > currentTime){
		
			arrScale.push(new String(currentTime).substring(0,3));
			currentTime += dt;

		}

		state.videoTimeScale = arrScale;
	},
	SET_CURRENT_TIME_VIDEO(state, value){
		state.currentTimeVideo = value;
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}