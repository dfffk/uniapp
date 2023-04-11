<template>
	<view>
		<view class="header">
			<top-bar></top-bar>
			<view class="show">
				<view class="back-search">
					<view class="icon-back" @click="backTo"><u-icon name="arrow-left" color="#fff7e9" size="36rpx"></u-icon></view>
					支付完成
				</view>
				<image src="../../static/imgs/payComplete/wancheng.png" class="img"></image>
				<view class="header-done">
					<view class="pay-done">支付成功</view>
					<view class="price">已支付{{ price }}元</view>
				</view>
				<view class="pay-icon"><image src="../../static/imgs/payComplete/wanchengtupian@3x.png" class="icon"></image></view>
			</view>
		</view>
		<view class="container">
			<view class="text">立即分享 领取豪礼</view>
			<button class="btn-top">立即分享</button>
			<button class="btn-bottom" @click="backHome">返回首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			price: 45
		};
	},
	methods: {
		//返回上一级
		backTo() {
			uni.navigateBack();
		},
		//返回首页
		backHome() {
			uni.switchTab({
				url: '/pages/home/home'
			});
		}
	},
	onLoad(option) {
		// console.log(option);
		this.price = option.money;
		// console.log(this.price);
	}
};
</script>

<style lang="scss">
.header {
	background-image: url('/static/imgs/payComplete/di.png');
	background-size: 100% 100%;
	.show {
		height: 536rpx;
		.img {
			display: block;
			margin: 40rpx 0 28rpx 328rpx;
			width: 96rpx;
			height: 96rpx;
		}
	}
}
.back-search {
	font-weight: 550;
	font-size: 36rpx;
	color: #fff7e9;
	line-height: 36rpx;
	margin-top: 24rpx;
	display: flex;
	justify-content: space-between;
	width: 450rpx;
}

.icon-back {
	padding-left: 35rpx;
	box-sizing: border-box;
	width: 90rpx;
	line-height: 50rpx;
}
.header-done {
	margin: 0 auto;
	margin-bottom: 16rpx;
	.pay-done {
		font-size: 36rpx;
		text-align: center;
		color: #fff;
		line-height: 36rpx;
	}
	.price {
		text-align: center;
		font-size: 32rpx;
		color: #ffc37e;
		margin-top: 16rpx;
		line-height: 32rpx;
	}
}
.pay-icon {
	background-image: url('../../static/imgs/payComplete/zhingjia.png');
	width: 314rpx;
	height: 314rpx;
	margin: 0 auto;
	background-size: 100% 100%;
	.icon {
		width: 250rpx;
		height: 250rpx;
		margin: 32rpx;
	}
}
.container {
	margin-top: 158rpx;
	.text {
		text-align: center;
		font-size: 40rpx;
		color: #5f5f5f;
		line-height: 40rpx;
	}
	.btn-top {
		margin: 48rpx auto;
		width: 542rpx;
		height: 90rpx;
		color: #fff;
		background-color: #ffa923;
		line-height: 90rpx;
		font-size: 36rpx;
		text-align: center;
		border-radius: 86rpx;
	}
	.btn-bottom {
		width: 542rpx;
		height: 90rpx;
		margin: 0 auto;
		color: #ffa923;
		background-color: #fff;
		line-height: 90rpx;
		font-size: 36rpx;
		text-align: center;
		border-radius: 86rpx;
		border: 2rpx solid #ffa923;
	}
}
</style>
