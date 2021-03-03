<template>

	<div class="video-player">
		<div class="video-player__title">{{ title }}</div>
		<!-- /.media-files__title -->

		<div class="video-player__player">
			<video width="450" id="video-player" class="video-player__video" :src="videoUrl"></video>
		
		</div>
		<!-- /.video-player__player -->
		
		<div class="video-player__nav">
			<div class="video-player__nav-back">
				<svg xmlns="http://www.w3.org/2000/svg" width="9.82" height="10.221" viewBox="0 0 9.82 10.221">
				<g id="Group_3" data-name="Group 3" transform="translate(3079.086 64.221) rotate(180)">
					<path id="play-solid" d="M8.472,4.319,1.445.164A.953.953,0,0,0,0,.989V9.3a.957.957,0,0,0,1.445.824L8.472,5.968A.957.957,0,0,0,8.472,4.319Z" transform="translate(3069.266 53.967)" fill="#212121"/>
					<rect id="Rectangle_4" data-name="Rectangle 4" width="1" height="10" rx="0.5" transform="translate(3078.086 54)" fill="#212121"/>
				</g>
				</svg>
			</div>
			<div class="video-player__nav-play" @click="videoPlayerPlay" v-if="!playStatus">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 19.837 22.672">
				<path id="play-solid" d="M18.792,9.539,3.206.324A2.114,2.114,0,0,0,0,2.153V20.578a2.124,2.124,0,0,0,3.206,1.829L18.792,13.2A2.123,2.123,0,0,0,18.792,9.539Z" transform="translate(0 -0.033)" fill="#212121"/>
				</svg>
			</div>
			<div class="video-player__nav-pause" @click="videoPlayerPause" v-if="playStatus">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 22.46 22.46">
					<path id="pausenew" d="M7.219,63.217H2.406A2.407,2.407,0,0,1,0,60.81V43.163a2.407,2.407,0,0,1,2.406-2.406H7.219a2.407,2.407,0,0,1,2.406,2.406V60.81A2.407,2.407,0,0,1,7.219,63.217ZM22.46,60.81V43.163a2.407,2.407,0,0,0-2.406-2.406H15.241a2.407,2.407,0,0,0-2.406,2.406V60.81a2.407,2.407,0,0,0,2.406,2.406h4.813A2.407,2.407,0,0,0,22.46,60.81Z" transform="translate(0 -40.757)" fill="#212121"/>
				</svg>
			</div>
			<div class="video-player__nav-forward">
				<svg xmlns="http://www.w3.org/2000/svg" width="9.82" height="10.221" viewBox="0 0 9.82 10.221">
				<g id="Group_1" data-name="Group 1" transform="translate(-3069.266 -54)">
					<path id="play-solid" d="M8.472,4.319,1.445.164A.953.953,0,0,0,0,.989V9.3a.957.957,0,0,0,1.445.824L8.472,5.968A.957.957,0,0,0,8.472,4.319Z" transform="translate(3069.266 53.967)" fill="#212121"/>
					<rect id="Rectangle_4" data-name="Rectangle 4" width="1" height="10" rx="0.5" transform="translate(3078.086 54)" fill="#212121"/>
				</g>
				</svg>
			</div>
		</div>
		<!-- /.video-player__nav -->
	</div>
	
</template>

<script>
import axios from 'axios'
import { mapGetters} from 'vuex'

export default {
  name: 'VideoPlayer',
  data(){
		return {
			'title': 'Просмотр видео',
			'videoPlay': false
		}
  },
  computed: {
	...mapGetters([
	  	'videoUrl',
		'videoDuration',
		'currentTimeVideo'
	]),
	playStatus: {
		get: function () {
			return this.videoPlay;
		},
		set: function (newValue) {
			this.videoPlay = newValue;
		}
	}
  },
  methods: {
	  
	videoPlayerPlay(){
		let __this = this;
		let videoPlayer = document.getElementById("video-player");
		videoPlayer.play();
		this.playStatus = true;

		let cursor = document.getElementById("cursor-timeline");

		videoPlayer.addEventListener('timeupdate', (event) => {
			let currentPositionCursor = videoPlayer.currentTime / __this.videoDuration * 1800;

			cursor.style.left = currentPositionCursor + 'px';
		});

		

		videoPlayer.addEventListener('ended', (event) => {
			this.playStatus = false;
		});
	},
	videoPlayerPause(){
		let videoPlayer = document.getElementById("video-player");
		videoPlayer.pause();
		this.playStatus = false;
	}
	
  }
}
</script>

<style>
	.video-player{
		width: 50%;
		margin-left: 35px;
	}
	.video-player__title{
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.video-player__player{
		background-color: #212121;
		border-radius: 10px;
		width: 100%;
		height: 400px;
	}
	.video-player__video{
		width: 100%;
		height: 100%;
	}
	.video-player__nav{
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.video-player__nav-play, .video-player__nav-pause{
		margin: 0 20px;
		cursor: pointer;
	}
</style>
