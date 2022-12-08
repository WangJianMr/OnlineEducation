<template>
	<view>
		商城
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseId:null,
			};
		},
		onLoad(options) {
			this.courseId = options.id
			console.log(this.courseId);
		}
	}
</script>

<style lang="scss">

</style>
