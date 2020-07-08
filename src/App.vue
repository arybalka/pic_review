<template>
	<div id="app">
		<template v-if="image_url">
			<ReviewablePicture
					:src="image_url"
					:saved_pins="pins"
					:image-width="1200"
					:image-height="1000"
					@save="saveProject"
			/>
		</template>
	</div>
</template>

<script>
	import ReviewablePicture from './components/ReviewablePicture';
	import axios from 'axios';

	export default {
		name: 'App',
		components: {
			ReviewablePicture,
		},

		data() {
			return {
				api_entry_point: null,
				project_id: null,
				image_url: null,
				pins: [],
			};
		},

		mounted() {
			this.api_entry_point = window.globs.api_entry_point;
			this.project_id = window.globs.project_id;

			axios.get(this.api_entry_point + '?project_id=' + this.project_id, {
				crossdomain: true,
			}).then(response => {
				this.image_url = response.data.image_url;
				this.pins = response.data.pins;
			});
		},
		methods: {
			saveProject(payload) {
				console.log("saveProject", payload);

				axios.put(this.api_entry_point + '?project_id=' + this.project_id, payload);
			}
		}
	};
</script>

<style lang="less">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
