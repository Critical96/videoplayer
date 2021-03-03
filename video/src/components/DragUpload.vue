<template>

	<div class="media-files media-files--help">
		
		<div class="media-files__title">{{ title }}</div>
		<!-- /.media-files__title -->

		<div class="drag-and-drop-upload">
			<div class="media-files__help-text">Перетащите видеофайл в данную область</div>
		</div>
		<!-- /.drag-and-drop-upload -->
	</div>
	<!-- /.media-files -->	
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
	name: 'DragUpload',
	data(){
		return {
			'title': 'Медиафайлы'
		}
	},
	computed: {
		...mapGetters([
			'videoDuration',
			'currentTimeVideo'
		]),
	},
	mounted() {
		let __this = this;
		let handleDrop = function(e) {
			

			if (e.preventDefault) {
				e.preventDefault();
			}
	
			let files = e.dataTransfer.files;
			
			for (let i = 0, f; f = files[i]; i++) {

					let reader = new FileReader();
					reader.readAsDataURL(f);
					reader.onload = function(e){

						let dropBlock = document.getElementsByClassName("drag-and-drop-upload");

						[].forEach.call(dropBlock, function(item){						
							
							axios.post('http://video.ru/api/video', {
								filename: f.name,
								file: e.target.result
							})
							.then(function (response) {
								__this.$store.dispatch('setVideoName', response.data.filename);
								__this.$store.dispatch('setVideoUrl', response.data.url);
								__this.$store.dispatch('setVideoDuration', response.data.metadata.duration);
								__this.$store.dispatch('setVideoTimeScale');
								__this.$store.dispatch('setStep', 1);

								let mediaHelpBlock = document.getElementsByClassName('media-files__help-text');

								[].forEach.call(mediaHelpBlock, function(mediaHelpText){
									mediaHelpText.style.display = "none";
									item.style.justifyContent = 'unset';
									item.style.alignItems = 'unset';
									let helpTimeLine = document.getElementsByClassName("timeline__item--help");
										[].forEach.call(helpTimeLine, function(helpText){
											helpText.style.display = 'block';
										});
								});

								let mediaBlock = document.getElementsByClassName('media-files');

								[].forEach.call(mediaBlock, function(item){
									item.classList.remove('media-files--help');
								});

								let previewFileTag = document.createElement("div");
								previewFileTag.style.backgroundImage = "url(" + response.data.intro + ")";
								
								previewFileTag.classList.add("file-img");
								item.appendChild(previewFileTag);
								
								let currentDroppable = null;

								let fileImages = document.getElementsByClassName("file-img");

								[].forEach.call(fileImages, function(item){

									item.onmousedown = function(event) {

										let shiftX = event.clientX - item.getBoundingClientRect().left;
										let shiftY = event.clientY - item.getBoundingClientRect().top;

										item.style.position = 'absolute';
										item.style.zIndex = 1000;

										moveAt(event.pageX, event.pageY);

										function moveAt(pageX, pageY) {

											item.style.left = pageX - shiftX + 'px';
											item.style.top = pageY - shiftY + 'px';

										}

										function onMouseMove(event) {

											moveAt(event.pageX, event.pageY);
											
										}

										document.addEventListener('mousemove', onMouseMove);

										item.onmouseup = function(event) {

											document.removeEventListener('mousemove', onMouseMove);
											item.onmouseup = null;
											item.style.position = 'unset';
											item.hidden = true;
											let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
											item.hidden = false;

											if (!elemBelow) return;

											let droppableBelow = elemBelow.closest('.timeline__item');

											if (currentDroppable != droppableBelow) {

												if (currentDroppable) {
													leaveDroppable(currentDroppable);
												}

												currentDroppable = droppableBelow;

												if (currentDroppable) {
													
													enterDroppable(currentDroppable);
												}

											}
										};

									};

									function enterDroppable(elem) {
										
										let videoBlockTimeLine = document.createElement("div");

										videoBlockTimeLine.classList.add('timeline__inner-item');

										videoBlockTimeLine.style.backgroundColor = '#374877';

										let previewFileTag = document.createElement("img");
										previewFileTag.src = response.data.intro;
										previewFileTag.classList.add("timeline__img");
										videoBlockTimeLine.appendChild(previewFileTag);

										let helpTimeLine = document.getElementsByClassName("timeline__item--help");
										[].forEach.call(helpTimeLine, function(helpText){
											helpText.remove();
											elem.style.justifyContent = 'unset';
											elem.style.alignItems = 'unset';
											__this.$store.dispatch('setStep', 2);
										});

										elem.appendChild(videoBlockTimeLine);
										let videoPlayer = document.getElementById("video-player");

										videoPlayer.addEventListener('timeupdate', (event) => {
											
											let timeLine = document.getElementsByClassName('timeline__timer');
											[].forEach.call(timeLine, function(item){

												item.innerHTML = videoPlayer.currentTime.toString().toHHMMSS() + " / " + __this.videoDuration.toString().toHHMMSS();

											});

										});
									
										

										var offset = [0,0];
										var divOverlay = document.getElementById("cursor-timeline");
										var isDown = false;

										divOverlay.addEventListener('mousedown', function(e) {
										isDown = true;
										offset = [
											divOverlay.offsetLeft - e.clientX
										];
										}, true);

										document.addEventListener('mouseup', function() {
										isDown = false;
										}, true);

										document.addEventListener('mousemove', function(e) {
											event.preventDefault();

											if (isDown) {
												
												divOverlay.style.left = (e.clientX + offset[0]) + 'px';

												if((e.clientX + offset[0]) < 0){
													divOverlay.style.left = 0 + 'px';
												}
												if((e.clientX + offset[0]) > 1800){
													divOverlay.style.left = 1800 + 'px';
												}
												
											}

										}, true);
									}

									function leaveDroppable(elem) {
										elem.style.background = '';
									}

									item.ondragstart = function() {
										return false;
									};

								});

							})
							.catch(function (error) {
								console.log(error);
							});
						});

					}

			}
			return false;
		};

		let handleDragOver = function(e) {

			if (e.preventDefault) {
				e.preventDefault();
			}

			e.dataTransfer.dropEffect = 'move';  

			return false;
		}

		let handleDragEnter = function(e) {

			this.classList.add('drag-and-drop-upload--over');

		};

		let handleDragLeave = function(e) {

			this.classList.remove('drag-and-drop-upload--over'); 

		};

		let handleDragEnd = function(e) {
	
			[].forEach.call(area, function (elem) {
				elem.classList.remove('drag-and-drop-upload--over');
			});

		};

		let area = document.getElementsByClassName('drag-and-drop-upload');

		[].forEach.call(area, function(elem) {

			elem.addEventListener('dragenter', handleDragEnter, false)
			elem.addEventListener('dragover', handleDragOver, false);
			elem.addEventListener('dragleave', handleDragLeave, false);
			elem.addEventListener('drop', handleDrop, false);
			elem.addEventListener('dragend', handleDragEnd, false);

		});

	},
	methods: {

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
	.media-files{
		width: 50%;
		margin-right: 35px;
		z-index: 100;
	}
	.media-files__help-text{
		font-size: 16px;
	}
	.media-files--help{
		border: 10px solid #48bd57;
		border-radius: 40px;
		padding: 10px 10px 10px 10px;
		margin: -20px;
		animation: .7s ease-in-out 0s infinite alternate help;
	}
	.media-files__title{
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.drag-and-drop-upload{
		width: 100%;
		height: 400px;
		padding: 30px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #E2E6F1;
		transition: all .3s;
		z-index: 1000;
		border-radius: 10px;
	}
	.drag-and-drop-upload--over{
		opacity: .8;
	}
	.file-img{
		background-image: url(http://video.ru/frames/test3.jpg);
		background-size: cover;
		width: 242px;
		height: 136px;
		border-radius: 6px;
		cursor: pointer;
	}
	.file-timeline{
		background-color: #43568B;
		height: 100%;
	}
	.timeline__inner-item{
		height: 100px;
		padding: 5px;
		position: relative;
		width: 100%;
	}
	.timeline__img{
		width: auto;
		height: 100%;
		border-radius: 3px;
	}
</style>
