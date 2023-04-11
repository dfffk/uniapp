<template>
	<view>
		<view class="header">
			<top-bar></top-bar>
			<view class="title">VIP会员</view>
			<scroll-view class="list" scroll-x>
				<view class="one">推荐</view>
				<view>免费体验</view>
				<view>小白入门</view>
				<view>快手菜</view>
				<view>家常菜</view>
				<view>面食</view>
				<view>川翔菜</view>
				<view>凉菜</view>
			</scroll-view>
		</view>
		<view class="container" :style="{ marginTop: statusBarHeight + 200 + 'rpx' }">
			<template v-if="userInfo">
				<template v-if="userInfo.vip">
					<view class="card" @click="gotoMyvip">
						<image class="img1" src="../../static/imgs/vip/juxing98@2x.png"></image>
						<view class="card-img">会员</view>
						<view class="card-top">
							<image :src="userInfo.avatarUrl" class="avatar"></image>
							<view class="card-name">
								<view class="welcome">欢迎您，{{ userInfo.nickName }}</view>
								<view class="open-vip">您已是vip，可以畅学明初独家菜谱</view>
							</view>
						</view>
						<view class="card-bottom">
							<view>
								<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
								<text>名厨课程</text>
							</view>
							<view>
								<image src="../../static/imgs/vip/mengbanzu255@3x.png" mode=""></image>
								<text>无广告打扰</text>
							</view>
							<view>
								<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
								<text>身份标识</text>
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="card" @click="gotoMyvip">
						<image class="img1" src="../../static/imgs/vip/juxing98@2x.png"></image>
						<view class="card-img">开通</view>
						<view class="card-top">
							<image :src="userInfo.avatarUrl" class="avatar"></image>
							<view class="card-name">
								<view class="welcome">欢迎您，{{ userInfo.nickName }}</view>
								<view class="open-vip">8元开通VIP，畅学明初独家菜谱</view>
							</view>
						</view>
						<view class="card-bottom">
							<view>
								<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
								<text>名厨课程</text>
							</view>
							<view>
								<image src="../../static/imgs/vip/mengbanzu255@3x.png" mode=""></image>
								<text>无广告打扰</text>
							</view>
							<view>
								<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
								<text>身份标识</text>
							</view>
						</view>
					</view>
				</template>
			</template>
			<template v-else>
				<view class="card" @click="gotoMyvip">
					<image class="img1" src="../../static/imgs/vip/juxing98@2x.png"></image>
					<view class="card-img">开通</view>
					<view class="card-top">
						<image src="../../static/imgs/vip/zu431@3x.png" class="avatar"></image>
						<view class="card-name">
							<view class="welcome">欢迎您，新朋友</view>
							<view class="open-vip">8元开通VIP，畅学明初独家菜谱</view>
						</view>
					</view>
					<view class="card-bottom">
						<view>
							<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
							<text>名厨课程</text>
						</view>
						<view>
							<image src="../../static/imgs/vip/mengbanzu255@3x.png" mode=""></image>
							<text>无广告打扰</text>
						</view>
						<view>
							<image src="../../static/imgs/vip/mengbanzu254@3x.png" mode=""></image>
							<text>身份标识</text>
						</view>
					</view>
				</view>
			</template>
			<template v-if="userInfo">
				<template v-if="userInfo.vip">
					<view class="newVedio">
						<view class="title">VIP最新推荐</view>
						<scroll-view scroll-x class="newScroll">
							<view class="new-item1" v-for="item in newVedio" :key="item._id" @click="gotoDetail(item._id)">
								<view class="absolute"></view>
								<video :src="item.vid" class="new-img"></video>
								<view class="new-name">{{ item.name }}</view>
								<view class="good">
									<view class="pageview">
										{{ item.pageview.toFixed(2) }}万
										<u-icon name="eye" color="#aaa" size="24rpx"></u-icon>
									</view>
									<view class="collections" @click="gotoDetail(item._id)">
										{{ item.collections.toFixed(1) }}万
										<u-icon name="star" color="#aaa" size="24rpx"></u-icon>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</template>
				<template v-else></template>
			</template>
			<template v-else></template>
			<view class="newVedio">
				<view class="title">限时免费体验</view>
				<scroll-view scroll-x class="newScroll">
					<view class="new-item1" v-for="item in freeVedio" :key="item._id" @click="gotoDetail(item._id)">
						<view class="absolute"></view>
						<video :src="item.vid" class="new-img"></video>
						<view class="new-name">{{ item.name }}</view>
						<view class="good">
							<view class="pageview">
								{{ item.pageview.toFixed(2) }}万
								<u-icon name="eye" color="#aaa" size="24rpx"></u-icon>
							</view>
							<view class="collections" @click="gotoDetail(item._id)">
								{{ item.collections.toFixed(1) }}万
								<u-icon name="star" color="#aaa" size="24rpx"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="guess-you-like">
				<view class="title">猜你喜欢</view>
				<view class="youLike">
					<view class="new-item" v-for="item in likeGoods" :key="item._id" @click="gotoDetail(item._id)">
						<image :src="item.coverpic" class="new-img"></image>
						<view class="new-name">{{ item.name }}</view>
						<view class="good">
							<view class="pageview">
								{{ item.pageview.toFixed(2) }}万
								<u-icon name="eye" color="#aaa" size="24rpx"></u-icon>
							</view>
							<view class="collections" @click="gotoDetail(item._id)">
								{{ item.collections.toFixed(1) }}万
								<u-icon name="star" color="#aaa" size="24rpx"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			//vip视频
			newVedio: [],
			//限时免费
			freeVedio: [],
			//猜你喜欢
			likeGoods: []
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				//状态栏高度转化为rpx
				this.statusBarHeight = (750 / res.windowWidth) * res.statusBarHeight;
			},
			fail() {
				// console.log(111111111);
			}
		});
		this.getNewVedio();
		this.getFree();
		this.getLike();
	},
	onShow() {
		// console.log('userInfo', this.userInfo);
		//获取vip视频
		// console.log('newVedio', this.newVedio);
		// this.getNewVedio();
		// this.getFree();
		// this.getLike();
		// console.log(111111);
		// console.log(this.userInfo);
	},
	methods: {
		//跳转到详情页
		gotoDetail(id) {
			this.getRecord(id);
			uni.navigateTo({
				url: '/pages/detail/detail?_id=' + id
			});
		},
		//添加浏览
		async getRecord(id) {
			if (this.$store.state._id) {
				const res = await this.$api.collectionLike.myRecordApi({
					user_id: this.$store.state._id,
					menu_id: id
				});
			}
		},
		//跳转到我的vip页面
		gotoMyvip() {
			uni.navigateTo({
				url: '/pages/myVip/myVip'
			});
		},
		//获取vip视频
		async getNewVedio(data) {
			const res = await this.$api.vip.getNewVedioApi(data);
			// console.log('vedio', res);
			if (res.meta.status == 200) {
				this.newVedio = res.menus;
			}
		},
		//获取显示免费体验
		async getFree(data) {
			const res = await this.$api.vip.getFreeApi(data);
			// console.log('free', res);
			if (res.meta.status == 200) {
				this.freeVedio = res.menus;
			}
		},
		//获取喜欢
		async getLike(data) {
			const res = await this.$api.vip.getLikeApi(data);
			// console.log(res);
			if (res.meta.status == 200) {
				this.likeGoods = res.menus;
			}
		}
	},
	computed: {
		//用户信息
		userInfo() {
			return this.$store.state.userInfo;
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	background-image: url('../../static/imgs/vip/ditu.png');
	background-size: 100% 100%;
	padding-bottom: 36rpx;
	position: fixed;
	top: 0;
	z-index: 1000;
	.title {
		color: #fff;
		font-size: 36rpx;
		text-align: center;
		line-height: 36rpx;
		margin: 24rpx 0 50rpx 0;
	}
	.list {
		white-space: nowrap;
		width: calc(100vw - 32rpx);
		view {
			font-size: 24rpx;
			flex-shrink: 0;
			margin-left: 86rpx;
			color: #fff;
			line-height: 36rpx;
			display: inline-block;
		}
		.one {
			font-size: 36rpx;
			margin: 0;
			margin-left: 32rpx;
		}
	}
}
.container {
	padding-left: 30rpx;
	.card {
		width: 686rpx;
		height: 324rpx;
		margin-right: 34rpx;
		position: relative;
		.img1 {
			width: 100%;
			height: 100%;
		}
		.card-img {
			background-image: url('../../static/imgs/vip/juxing221@3x.png');
			background-size: 100% 100%;
			width: 108rpx;
			height: 34rpx;
			line-height: 34rpx;
			font-size: 24rpx;
			text-align: center;
			color: #8a5736;
			position: absolute;
			z-index: 100;
			top: 52rpx;
			right: 32rpx;
		}
	}
}
.card-top {
	position: absolute;
	top: 32rpx;
	left: 32rpx;
	height: 128rpx;
	width: 622rpx;
	display: flex;
	z-index: 101;
	.avatar {
		width: 128rpx;
		height: 128rpx;
		display: block;
		margin-right: 18rpx;
		border-radius: 50%;
	}
	.card-name {
		.welcome {
			font-size: 26rpx;
			margin: 20rpx 0 26rpx 0;
			color: #939393;
			line-height: 26rpx;
		}
		.open-vip {
			font-size: 28rpx;
			color: #e6e6e6;
			line-height: 28rpx;
		}
	}
}
.card-bottom {
	width: 100%;
	height: 96rpx;
	background-image: url('../../static/imgs/vip/juxing238@3x.png');
	background-size: 100% 100%;
	position: absolute;
	z-index: 101;
	bottom: 0;
	display: flex;
	padding: 0 32rpx;
	box-sizing: border-box;
	justify-content: space-between;
	view {
		margin-top: 8rpx;
		image {
			width: 42rpx;
			height: 42rpx;
			display: block;
			margin: 0 auto;
		}
		text {
			display: block;
			line-height: 22rpx;
			font-size: 22rpx;
			margin-top: 14rpx;
			color: #eabfa2;
			text-align: center;
			font-weight: 300;
		}
	}
}
.newVedio {
	width: 100%;
	margin-top: 44rpx;
	.title {
		font-size: 40rpx;
		line-height: 40rpx;
		color: #303030;
		margin-bottom: 28rpx;
		font-weight: 600;
		letter-spacing: 1rpx;
	}
	.newScroll {
		width: 100%;
		white-space: nowrap;
	}
}
.new-item1 {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 12rpx;
	display: inline-block;
	.new-img {
		width: 314rpx;
		height: 220rpx;
		display: block;
	}
	.new-name {
		font-size: 25rpx;
		height: 25rpx;
		margin: 18rpx 0 10rpx 0;
	}
	.good {
		font-size: 16rpx;
		line-height: 22rpx;
		height: 22rpx;
		width: 232rpx;
		display: flex;
		justify-content: space-between;
		color: #aaa;
		.pageview {
			display: flex;
			justify-content: space-between;
			width: 130rpx;
		}
		.collections {
			display: flex;
			.u-icon {
				margin-left: 12rpx;
			}
		}
	}
}
.guess-you-like {
	width: 100%;
	margin-top: 44rpx;
	.title {
		font-size: 40rpx;
		line-height: 40rpx;
		color: #303030;
		margin-bottom: 28rpx;
		font-weight: 600;
		letter-spacing: 1rpx;
	}
}
.youLike {
	margin-right: 32rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.new-item {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex-shrink: 0;
	margin-bottom: 38rpx;
	.new-img {
		width: 334rpx;
		height: 248rpx;
		display: block;
	}
	.new-name {
		font-size: 25rpx;
		height: 25rpx;
		margin: 18rpx 0 10rpx 0;
	}
	.good {
		font-size: 16rpx;
		line-height: 22rpx;
		height: 22rpx;
		width: 232rpx;
		display: flex;
		justify-content: space-between;
		color: #aaa;
		.pageview {
			display: flex;
			justify-content: space-between;
			width: 130rpx;
		}
		.collections {
			display: flex;
			.u-icon {
				margin-left: 12rpx;
			}
		}
	}
}
.absolute {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2000;
}
</style>
