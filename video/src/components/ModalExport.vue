<template>

	<div class="modal-export">

		<div class="modal-export__modal">
			<div class="modal-export__title">Экспорт видео</div>
			<div class="modal-export__text">
				<div class="modal-export__text-text">Ширина</div>
				<input type="text" @input="setResizeWidth">
			</div>
			<div class="modal-export__text">
				<div class="modal-export__text-text">Высота</div>
				<input type="text" @input="setResizeHeight">
			</div>
			<div class="modal-export__text-text">Разрешение видео</div>
			<div class="modal-export__dropdown" @click="dropDownToggle">
				
				<div class="modal-export__dropdown-current">{{ videoformate.default }}</div>
				<div class="modal-export__dropdown-list">
					<div class="modal-export__dropdown-list-item" v-for="item in videoformate.list" @click="dropDownClickItem($event, 'setVideoformate')"> {{ item }}</div>
				</div>
			</div>
			<div class="modal-export__text-text">Поворот видео</div>
			<div class="modal-export__dropdown" @click="dropDownToggle">
				<div class="modal-export__dropdown-current">{{ rotate.default }}</div>
				<div class="modal-export__dropdown-list">
					<div class="modal-export__dropdown-list-item" v-for="item in rotate.list" @click="dropDownClickItem($event, 'setRotate')"> {{ item }}</div>
				</div>
			</div>
			<button class="modal-button-send" @click="sendExport">Экспорт</button>
			
		</div>
		<div 
			class="modal-export__bg"
			@click="closeModalExport"
			></div>
	</div>
	<!-- /.modal-export -->
	
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
	name: 'ModalExport',
	data: function () {
		return {
			
		}
	},
	computed:{
		...mapGetters([
			'splitTime',
			'videoName',
			'videoformate',
			'rotate',
			'resizeWidth',
			'resizeHeight'
		]),
	},
	methods: {
		setResizeWidth(e){

			this.$store.dispatch('setResizeWidth', e.target.value);

		},
		setResizeHeight(e){

			this.$store.dispatch('setResizeHeight', e.target.value);

		},
		closeModalExport() {
			this.$store.dispatch('setModalExport', false);

			
		},
		dropDownToggle(e){
			let __this = e.currentTarget.querySelector(".modal-export__dropdown-list");
			__this.style.display = (__this.style.display == 'block') ? 'none' : 'block';
	
		},
		dropDownClickItem(e, action){
			this.$store.dispatch(action, e.currentTarget.innerHTML);
		},
		sendExport(){
			axios.post('http://video.ru/api/video/execute', {
				filename: this.videoName,
				clip: {
					start: this.splitTime.start,
					end: this.splitTime.end
				},
				transcode:{
					to: this.videoformate.default
				},
				resize:{
					width: this.resizeWidth,
					height: this.resizeHeight
				},
				rotate:{
					angle: this.rotate.default
				}
			})
			.then(function (response) {
				console.log(response);
				let linkDownload = document.createElement("a");
				linkDownload.classList.add('modal-link-download');
				linkDownload.href = response.data.downloadLink;
				linkDownload.text = 'Скачать видео';
				let modalWindow = document.getElementsByClassName('modal-export__modal');

				[].forEach.call(modalWindow, function(item){
					item.appendChild(linkDownload);
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>

<style>
	.modal-export{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		outline: 0;
		z-index: 100;
	}
	.modal-export__modal{
		display: flex;
		flex-direction: column;
		margin: 100px auto;
		max-width: 700px;
		background-color: #E2E6F1;
		z-index: 101;
		position: relative;
		padding: 40px;
	}
	.modal-export__bg{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		outline: 0;
		z-index: 100;
		background-color: #000;
		opacity: .5;
	}
	.modal-export__title{
		font-size: 26px;
		font-weight: 600;
	}
	.modal-export__dropdown{
		max-width: 200px;
		position: relative;
	}
	.modal-export__dropdown-current{
		font-size: 14px;
		padding: 10px;
		background-color: #fff;
		border-bottom: 1px solid #DCDCDC;
	}
	.modal-export__dropdown-list{
		position: absolute;
		width: 100%;
		z-index: 100;
		background-color: #fff;
		display: none;
	}
	.modal-export__dropdown-list-item{
		font-size: 14px;
		padding: 10px;
	}
	.modal-button-send{
		margin-top: 20px;
		background-color: #374877;
		color: #fff;
		border:none;
		padding: 10px 20px;
		border-radius: 4px;
		font-weight: 600;
		font-family: 'Montserrat';
		align-self: baseline;
	}
	.modal-export__text input{
		height: 39px;
		border:none;
	}
	.modal-export__text-text{
		margin-top: 20px;
	}
	.modal-link-download{
		font-size: 14px;
		margin-top:20px;
		text-decoration: none;
		color: #374877;
	}
</style>