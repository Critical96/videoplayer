<template>

	<div class="timeline" :class="{ 'timeline--help' : step == 1}">
		<div class="timeline__buttons">
			<!-- <div class="timeline__button">Undo</div>
			<div class="timeline__button">Redo</div> -->
			<div class="timeline__button" @click="videoSplit">Обрезка</div>
			<!-- <div class="timeline__button">Delete</div>
			<div class="timeline__button">Copy</div>
			<div class="timeline__button">Paste</div> -->
			<div class="timeline__timer"> {{currentTimeVideoFormated}} / {{ videoDurationFormated }}</div>
		</div>
		<div id="timeline" class="timeline__time" @click="clickTimeLine($event, this)">
			<div id="cursor-timeline" class="timeline__cursor">
				<svg xmlns="http://www.w3.org/2000/svg" width="9.103" height="14.862" viewBox="0 0 9.103 14.862">
					<path id="Path_1" data-name="Path 1" d="M3.774,18.924a.862.862,0,0,1-.862-.862V11.579a.847.847,0,0,1,0-.4v-.014h0A.876.876,0,0,1,3,10.951L6.69,4.5a.862.862,0,0,1,1.5,0l3.688,6.454a.876.876,0,0,1,.087.212h0v.013a.847.847,0,0,1,0,.4v6.482a.862.862,0,0,1-.862.862Z" transform="translate(11.991 18.924) rotate(180)" fill="#262626"/>
				</svg>
			</div>
			<div v-for="n in 7" class="timeline__cell">
				<div class="timeline__number">{{ videoTimeScale[n-1] }}</div>
				<div class="timeline__line-short"></div>
			</div>
			
		</div>

		<div class="timeline__item">
			<div class="timeline__item--help">
				Перетащите медиафайл в данную область
			</div>
		</div>
	</div>
	<!-- /.timeline -->
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'TimeLine',
  computed: {
	...mapGetters([
		'videoDuration',
		'videoTimeScale',
		'currentTimeVideo',
		'step'
	]),
	videoDurationFormated () {
		return this.videoDuration.toHHMMSS();
	},
	currentTimeVideoFormated(){
		return this.currentTimeVideo.toString().toHHMMSS();
	}
  },
  methods: {

	  clickTimeLine(e){

		let divOverlay = document.getElementById("cursor-timeline");
		let timeLine = document.getElementById("timeline");
	
		let currentTime = (e.clientX - timeLine.offsetLeft) / 1800 * this.videoDuration;
		this.$store.dispatch('setCurrentTimeVideo', currentTime);
		let videoPlayer = document.getElementById("video-player");
		videoPlayer.currentTime = currentTime;
		divOverlay.style.left = e.clientX - timeLine.offsetLeft + 'px';
	  },
	  videoSplit(e){

		let currentPositionCursor = this.currentTimeVideo / this.videoDuration * 1800;
		let splitMark = document.createElement('div');
		splitMark.classList.add("timeline__split-mark");
		splitMark.style.left = currentPositionCursor + 'px';

		this.$store.dispatch('setSplitTime', this.currentTimeVideo);

		let innerItem = document.getElementsByClassName("timeline__inner-item");

		[].forEach.call(innerItem, function(item){

			
			item.appendChild(splitMark);
			let splitMarkDiv = document.getElementsByClassName("timeline__split-mark");
			[].forEach.call(splitMarkDiv, function(item,number,collection){
				
				if(collection.length > 2){
					collection[0].remove();
				}
	
			});
		});

	  }

  }
}
</script>

<style>
	@keyframes help { 
		0%{
			border: 10px solid #48bd57;
		} 
		35%{
			border: 10px solid #48bd57;
		}
		100%{
			border: 10px solid #fff;
		} 
	}
	.timeline{
		margin: -10px;
		padding: 10px;
		border-radius: 40px;
	}
	.timeline--help{
		animation: .7s ease-in-out 0s infinite alternate help;
	}
	.timeline__buttons{
		display: flex;
		align-items: center;
	}
	.timeline__button{
		cursor: pointer;
		width: 76px;
		background-color: #E2E6F1;
		border-radius: 3px;
		height: 32px;
		font-size: 13px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20px;
	}
	.timeline__button:last-child{
		margin-right: 0;
	}
	.timeline__timer{
		margin-left: 100px;
		font-size: 10px;
		color: #212121;
		font-weight: 600;
	}
	.timeline__time{
		margin-top: 8px;
		border-top:1px solid #DCDCDC;
		border-bottom:1px solid #DCDCDC;
		height: 30px;
		display: flex;
		align-items: flex-end;
		position: relative;
	}
	.timeline__cursor{
		position: absolute;
		height: 200px;
		background-color: #262626;
		width: 1px;
		top: 90%;
		z-index: 100;
	}
	.timeline__number{
		margin-left: 3px;
		font-weight: 600;
	}
	.timeline__cursor svg{
		position: relative;
		left: -4px;
		top: -8px;
	}
	.timeline__cell{
		display: flex;
		align-items: flex-end;
		height: 22px;
		width: calc(100% / 7 + 1px);
		border-left: 1px solid #DCDCDC;
		border-right: 1px solid #DCDCDC;
		position: relative;
		margin-left: -1px;
	}
	.timeline__cell:first-child{
		margin-left: unset;
	}
	.timeline__line-short{
		position: absolute;
		left: 50%;
		width: 1px;
		height: 11px;
		background: #DCDCDC;
	}
	.timeline__item{
		margin-top: 30px;
		background-color: #E2E6F1;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.timeline__split-mark{
		position: absolute;
		height: 100px;
		width: 3px;
		top: 0;
		margin-left: -1px;
		background-color: #1b2b56;
	}
	.timeline__item--help{
		display: none;
		font-size: 16px;
	}
</style>
