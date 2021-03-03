<template>
  <div id="app">

    <div class="main-wrapper">

		<section class="top-line">

			<div class="buttons">

				<ActionButton 
					button-text="Новый проект"
					button-type="light"
				></ActionButton>
				<ActionButton 
					button-text="Экспорт"
					button-type="dark"
					@click.native="showModalExport"
				></ActionButton>

			</div>
			<!-- /.buttons -->
			
		</section>
		<!-- /.top-line -->		

		<section class="middle">

			<DragUpload></DragUpload>
			<VideoPlayer></VideoPlayer>

		</section>
		<!-- /.middle -->

		<section class="bottom">
			<TimeLine></TimeLine>
		</section>
		<!-- /.bottom -->

    </div>
    <!-- /.main-wrapper -->

	<div class="copyright">
			© Разработано студентами ВолГУ, ИМИТ, группы ИВТм-181 Нугмановым И.Е. и Ехмановым В.В.
	</div>
	<!-- /.copyright -->

	<ModalExport 
		v-if="modalExport"
	></ModalExport>

  </div>
  <!-- /#app -->

</template>

<script>
  import VideoPlayer from "./VideoPlayer";
  import DragUpload from "./DragUpload";
  import ActionButton from "./ActionButton";
  import ModalExport from "./ModalExport";
  import TimeLine from "./TimeLine";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'app',
    data() {
      return {

      }
	},
	computed:{
		...mapGetters([
			'modalExport'
		])
	},
    components: {
      FileReader,
      VideoPlayer,
      DragUpload,
	  ActionButton,
	  TimeLine,
	  ModalExport,
    },
    methods: {
		...mapActions([
			'setModalExport'
		]),
		showModalExport(){
			this.$store.dispatch('setModalExport', true);
		}
	},
	beforeCreate(){
		
		String.prototype.toHHMMSS = function () {
			var sec_num = parseInt(this, 10);
			var hours   = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);

			if (hours   < 10) {hours   = "0"+hours;}
			if (minutes < 10) {minutes = "0"+minutes;}
			if (seconds < 10) {seconds = "0"+seconds;}
			return hours + ':' + minutes + ':' + seconds;
		}
	}
  }
</script>

<style>
	html{
		font-family: 'Montserrat';
		font-size: 10px;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}
	body{
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}
	* {
		box-sizing: border-box;
	}
	#app{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.main-wrapper{
		max-width: 1800px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.top-line{
		margin-top: 30px;
	}
	.buttons{
		display: flex;
	}
	.buttons .button{
		margin-right: 15px;
	}
	.buttons .button:last-child{
		margin-right: 0;
	}
	.middle{
		margin-top: 35px;
		display: flex;
	}
	.copyright{
		margin-top: auto;
		border-top: 1px solid #dcdcdc;
		padding: 20px;
		text-align: center;
		width: 100%;
		font-size: 12px;
	}
</style>
