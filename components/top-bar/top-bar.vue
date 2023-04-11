<template>
	<view>
		<!-- 适配不同机型的顶部样式 -->
		<view :style="{ height: statusBarHeight + 'px' }" class="top-bar"></view>
	</view>
</template>

<script>
export default {
	name: 'top-bar',
	data() {
		return {
			//用于储存手机状态栏高度
			statusBarHeight: 0
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				this.statusBarHeight = res.statusBarHeight;
			},
			fail() {
				// console.log(111111111);
			}
		});
	}
};
</script>

<style>
.top-bar {
	width: 100vw;
}
</style>
