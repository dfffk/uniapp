<template>
	<view>
		<view class="home-bar">
			<!-- 占位盒子 -->
			<top-bar></top-bar>
			<view class="bar-header-write">
				<view class="top">小白菜谱大全</view>
				<view class="bottom">小白学做菜必备烹饪助手</view>
				<view class="search" @click="gotoSearch">
					<image src="../../static/imgs/home/mengbanzu2.png" class="icon"></image>
					<text class="text">共有857142道菜</text>
				</view>
			</view>
		</view>
		<view class="container">
			<swiper :indicator-dots="true" indicator-color="#e8e8e8" :autoplay="true" :interval="2000" :circular="true" indicator-active-color="#d86f32" class="swiper">
				<swiper-item v-for="item in swiper" :key="item._id"><image :src="item.image_src" class="img"></image></swiper-item>
			</swiper>
			<view class="home-classify">
				<view class="item-classify" v-for="item in classify" :key="item._id" @click="toSearchOrClassify(item.name)">
					<image :src="item.image_src" class="item-img"></image>
					<view class="item-text">{{ item.name }}</view>
				</view>
			</view>
			<view class="floor">
				<swiper :indicator-dots="true" indicator-color="#e8e8e8" :autoplay="true" :interval="2000" :circular="true" indicator-active-color="#d86f32" class="swiper-floor">
					<swiper-item>
						<view class="swiper-title" v-if="floorData.length">{{ Remove_quotation_marks(floorData[0].floor_title) }}</view>
						<image :src="floorData[0].floor_imgs[0]" class="img"></image>
					</swiper-item>
					<swiper-item>
						<view class="swiper-title" v-if="floorData.length">{{ Remove_quotation_marks(floorData[0].floor_title) }}</view>
						<image :src="floorData[0].floor_imgs[1]" class="img"></image>
					</swiper-item>
				</swiper>
				<view class="floor-right">
					<view>
						<text class="ringht-title" v-if="floorData.length">{{ Remove_quotation_marks(floorData[1].floor_title) }}</text>
						<image :src="floorData[1].floor_imgs" mode=""></image>
					</view>
					<view>
						<text class="ringht-title" v-if="floorData.length">{{ Remove_quotation_marks(floorData[2].floor_title) }}</text>
						<image :src="floorData[2].floor_imgs" mode=""></image>
					</view>
				</view>
			</view>
			<view class="recommendShops">
				<view class="item-shop" v-for="item in recommendShops" :key="item._id" @click="gotoDetail(item._id)">
					<image :src="item.coverpic" class="shop-img"></image>
					<view class="text">{{ item.name }}</view>
					<view class="good">
						<view class="pageview">
							{{ item.pageview.toFixed(2) }}万
							<u-icon name="eye" color="#aaa" size="24rpx"></u-icon>
						</view>
						<view class="collections">
							{{ item.collections.toFixed(1) }}万
							<u-icon name="star" color="#aaa" size="24rpx"></u-icon>
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
			swiper: [],
			classify: [],
			floorData: [],
			recommendShops: []
		};
	},
	methods: {
		//点击搜索框跳转到搜索页面
		gotoSearch() {
			this.getRecord();
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		//跳转到详情页
		gotoDetail(id) {
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
				// console.log('res', res);
			}
		},
		//点击导航栏跳转到搜索页面
		toSearchOrClassify(name) {
			if (name == '分类') {
				uni.navigateTo({
					url: '/pages/classify/classify'
				});
				// console.log(name);
				// console.log(typeof name);
			} else {
				uni.navigateTo({
					url: '/pages/search/search?val=' + name
				});
			}
		},
		//获取轮播图
		async getHomeSwiper() {
			const res = await this.$api.home.getSwiperApi();
			// console.log('swiper', res);
			if (res.meta.status == 200) {
				this.swiper = res.message;
			}
		},
		async getClassify() {
			const res = await this.$api.home.getClassifyApi();
			// console.log('classify', res);
			if (res.meta.status == 200) {
				this.classify = res.message;
			}
		},
		async getFloor() {
			const res = await this.$api.home.getFloorApi();
			// console.log('floor', res);
			if (res.meta.status == 200) {
				this.floorData = res.message;
			}
		},
		async getRecommendShops() {
			const res = await this.$api.home.getRecommendShopsApi();
			// console.log('res', res);
			if (res.meta.status == 200) {
				this.recommendShops = res.message;
			}
		},
		Remove_quotation_marks(str) {
			return str.substring(1, str.length - 1);
		}
	},
	mounted() {
		this.getHomeSwiper();
		this.getClassify();
		this.getRecommendShops();
		this.getFloor();
	}
};
</script>

<style lang="scss">
.home-bar {
	background-image: url('../../static/imgs/home/mengbanzu250@3x.png');
	padding-bottom: 66rpx;
	background-size: 100% 100%;
	position: fixed;
	top: 0;
	z-index: 1000;
}
.bar-header-write {
	margin-left: 32rpx;
	// border: 1rpx solid red;
	color: #fff;
	.top {
		line-height: 40rpx;
		font-size: 40rpx;
		margin-bottom: 12rpx;
		font-weight: 600;
		letter-spacing: 4rpx;
	}
	.bottom {
		font-size: 24rpx;
		line-height: 24rpx;
		font-weight: 300;
	}
}
.search {
	position: absolute;
	background-color: #fff;
	height: 74rpx;
	bottom: -37rpx;
	width: 686rpx;
	color: #c7c7c7;
	// margin-left: 32rpx;
	border: 3rpx solid #fafafa;
	box-shadow: 0 10rpx 10rpx -10rpx #ccc;
	border-radius: 38rpx;
	font-size: 24rpx;
	line-height: 74rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	.text {
	}
	.icon {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
}
.container {
	padding: 0 30rpx;
	box-sizing: border-box;
	box-shadow: 0 -10rpx 10rpx 5rpx #f8f7f7 inset;
	margin-top: 240rpx;
}
.swiper {
	margin: 66rpx 0 0 0;
	// background-color: pink;
	width: 686rpx;
	height: 340rpx;
	.img {
		width: 100%;
		height: 295rpx;
	}
}
.home-classify {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 68rpx);
	grid-template-rows: repeat(2, 100rpx);
	grid-gap: 28rpx calc((100% - 68rpx * 5) / 4);
}
.item-classify {
	width: 69rpx;
	height: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.item-img {
		width: 68rpx;
		height: 68rpx;
	}
	.item-text {
		font-size: 23rpx;
		line-height: 23rpx;
		text-align: center;
	}
}
.floor {
	margin-top: 34rpx;
	width: 100%;
	height: 362rpx;
	display: flex;
	justify-content: space-between;
	.swiper-floor {
		width: 334rpx;
		height: 362rpx;
		position: relative;

		.img {
			width: 334rpx;
			height: 362rpx;
			z-index: 50;
		}
		.swiper-title {
			position: absolute;
			top: 12rpx;
			left: 12rpx;
			font-size: 30rpx;
			text-align: center;
			padding: 0 12rpx;
			line-height: 56rpx;
			color: #fff;
			background-color: #e59d66;
			z-index: 100;
			border-radius: 8rpx;
		}
	}
	.floor-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		view {
			position: relative;
			.ringht-title {
				position: absolute;
				top: 12rpx;
				left: 12rpx;
				font-size: 30rpx;
				text-align: center;
				padding: 0 12rpx;
				line-height: 56rpx;
				color: #fff;
				background-color: #e59d66;
				z-index: 100;
				border-radius: 8rpx;
			}
			image {
				width: 332rpx;
				height: 176rpx;
			}
		}
	}
}
.recommendShops {
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 26rpx;
	.item-shop {
		margin-bottom: 40rpx;
		.shop-img {
			width: 334rpx;
			height: 248rpx;
			display: block;
		}
		.text {
			font-size: 30rpx;
			color: #575757;
			margin: 18rpx 0 10rpx 0;
		}
	}
}
.good {
	font-size: 22rpx;
	line-height: 22rpx;
	height: 22rpx;
	width: 266rpx;
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
</style>
