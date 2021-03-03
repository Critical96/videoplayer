<template>

	<div>
		<input type="file" @change="loadFile">
	</div>
	
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'FileReader',
  methods: {
	 ...mapActions([
      'setVideoUrl'
    ]),
	loadFile(f){
		let file = f.target.files[0];
		let reader = new FileReader();
		let __this = this;
		reader.readAsDataURL(file);
	
		reader.onloadend = () => {

			axios.post('http://video.ru/api/video', {
				name: file.name,
				file: reader.result
			})
			.then(function (response) {
				
				__this.$store.dispatch('setVideoUrl', response.data.url);
				console.log(response.data.url);
			})
			.catch(function (error) {
				console.log(error);
			});

	}

  }
}
}
</script>

<style>

</style>
