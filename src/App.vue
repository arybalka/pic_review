<template>
	<div id="app">
		<ReviewablePicture
				src="./pictures/02_vegas_0034.jpg"
				:image-width="1200"
				:image-height="1000"
		/>
	</div>
</template>

<script>
	import ReviewablePicture from './components/ReviewablePicture';

	export default {
		name: 'App',
		components: {
			ReviewablePicture,
		},
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
