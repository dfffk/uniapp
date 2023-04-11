<template>
	<view>
		<view class="search-tar">
			<top-bar></top-bar>
			<view class="back-search">
				<view class="icon-back" @click="backHome"><u-icon name="arrow-left" color="#180c04" size="36rpx"></u-icon></view>
				菜谱搜索
			</view>
			<u-search
				:showAction="true"
				shape="square"
				actionText="搜索"
				color="#686868"
				searchIconColor="#f0904a"
				searchIconSize="32rpx"
				height="50rpx"
				v-model="search"
				:actionStyle="actionStyle"
				@search="searchMenu()"
			></u-search>
		</view>
		<!-- 替代margin -->
		<view class="zhanwei">
			<top-bar></top-bar>
			<view class="back-search">1</view>
		</view>
		<template v-if="userInfo.vip">
			<view class="boutique">
				<view class="title">
					<text class="text">精品名厨视频-会员专享</text>
					<image src="../../static/imgs/search/mengbanzu282.png" mode="" style="width: 40rpx; height: 40rpx;"></image>
				</view>
				<scroll-view class="scroll" :scroll-x="true">
					<view class="boutique-item" v-for="item in boutique" :key="item._id" @click="gotoDetail(item._id)">
						<image :src="item.coverpic" class="img"></image>
						<text class="name">{{ item.name }}</text>
						<view class="good">
							<view class="pageview">
								{{ item.pageview.toFixed(2) }}万
								<u-icon name="eye" color="#aaa" size="18rpx"></u-icon>
							</view>
							<view class="collections">
								{{ item.collections }}
								<u-icon name="star" color="#aaa" size="18rpx"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
		<template v-else></template>
		<view class="random">
			<view class="random_item" v-for="item in menus" :key="item._id" @click="gotoDetail(item._id)">
				<image :src="item.coverpic" class="img"></image>
				<view class="right">
					<view class="name">{{ item.name }}</view>
					<view class="details">
						<text class="text" v-for="obj in item.ingredient" :key="obj.name">{{ obj.name + '、' }}</text>
					</view>
					<view class="random_good">
						<view class="random_pageview">
							{{ item.pageview }}
							<u-icon name="eye" color="#aaa" size="18rpx"></u-icon>
						</view>
						<view class="random_collections">
							{{ item.collections }}
							<u-icon name="star" color="#aaa" size="18rpx"></u-icon>
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
			search: '',
			actionStyle: {
				'font-size': '32rpx',
				color: '#fff'
			},
			boutique: [],
			menus: [],
			total: 0,
			currentPage: '1',
			//用于清除触底事件
			bottom: true
		};
	},

	//触底事件
	onReachBottom() {
		if (this.menus.length < this.total) {
			this.currentPage = toString(parseInt(this.currentPage) + 1);
			this.$api.search.getSearchMenuApi({ val: this.option, currentPage: this.currentPage }).then(res => {
				this.total = res.total;
				this.menus.push(...res.menus);
				// console.log('res', res, this.total);
			});
		} else if (this.bottom) {
			uni.showToast({
				title: '没有更多了',
				duration: 1000,
				icon: 'none'
			});
			this.bottom = false;
		}
	},

	methods: {
		//跳转详情页面
		gotoDetail(id) {
			this.getRecord(id);
			uni.navigateTo({
				url: '/pages/detail/detail?_id=' + id
			});
		},

		//点击搜索
		searchMenu() {
			// console.log(this.search);
			this.getSearchMenu({
				val: this.search
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
		//返回到首页
		backHome() {
			uni.navigateBack();
		},
		//获取精品视频
		async getBoutique_item(data) {
			const res = await this.$api.search.getBoutiqueApi(data);
			// console.log(res);
			if (res.meta.status == 200) {
				this.boutique = res.message;
			}
			// console.log(this.boutique);
		},
		//随机推荐
		async getNormalRecommend(data) {
			const res = await this.$api.search.getNormalRecommendApi(data);
			// console.log(res);
		},
		//搜索菜品
		async getSearchMenu(data) {
			const res = await this.$api.search.getSearchMenuApi(data);
			if (res.meta.status == 200) {
				this.menus = res.menus;
				this.total = res.total;
				this.bottom = true;
				// console.log(res);
			}
		}
	},

	mounted() {
		this.getBoutique_item();
		this.getNormalRecommend();
	},
	onLoad(option) {
		// console.log(option);
		if (option) {
			this.getSearchMenu({
				currentPage: '1',
				val: option.val
			});
			this.search = option.val;
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

<style lang="scss">
.search-tar {
	background-size: 100% 100%;
	background-image: url('../../static/imgs/search/ditu.png');
	position: fixed;
	top: 0;
	z-index: 1000;
}
.back-search {
	font-size: 36rpx;
	color: #fef2ea;
	line-height: 36rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	width: 450rpx;
	padding-bottom: 138rpx;
}
.u-search {
	width: 618rpx;
	position: absolute;
	bottom: 26rpx;
	left: 98rpx;
}
.icon-back {
	padding-left: 35rpx;
	box-sizing: border-box;
	width: 90rpx;
	line-height: 50rpx;
}
.boutique {
	margin: 20rpx 0 40rpx 32rpx;
	.title {
		line-height: 40rpx;
		height: 40rpx;
		font-size: 30rpx;
		color: #3a3a3a;
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
		.text {
			margin-right: 15rpx;
			font-weight: 500;
		}
	}
}
.scroll {
	white-space: nowrap;
	width: 100%;
}
.boutique-item {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	flex-shrink: 0;
	width: 316rpx;
	height: 324rpx;
	background-color: #f9f9f9;
	margin-right: 20rpx;
	.img {
		width: 100%;
		height: 220rpx;
		display: block;
	}
	.name {
		margin: 14rpx 0 18rpx 10rpx;
		font-size: 24rpx;
		line-height: 26rpx;
		color: #575757;
	}
	.good {
		display: flex;
		width: 230rpx;
		height: 24rpx;
		line-height: 24rpx;
		font-size: 18rpx;
		justify-content: space-between;
		margin-left: 10rpx;
		margin-top: 18rpx;
		color: #aaa;
		.pageview {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100rpx;
		}
		.collections {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 75rpx;
		}
	}
}
.random {
	padding: 0 32rpx 0;
}
.random_item {
	height: 210rpx;
	display: flex;
	margin-bottom: 16rpx;
	.img {
		width: 314rpx;
		height: 210rpx;
		display: block;
		// background-color: blue;
		margin-right: 18rpx;
		flex-shrink: 0;
	}
	.right {
		width: 354rpx;
		color: #aaa;
		.name {
			margin: 20rpx 0 5rpx 0;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 30rpx;
			color: #000;
		}
		.details {
			width: 354rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-bottom: 65rpx;
			.text {
				flex-shrink: 0;
				line-height: 42rpx;
				font-size: 24rpx;
			}
		}
	}
}
.random_good {
	display: flex;
	font-size: 18rpx;
	line-height: 18rpx;
	.random_pageview {
		display: flex;
		align-items: center;
		margin-right: 40rpx;
		.u-icon {
			margin-left: 10rpx;
		}
	}
	.random_collections {
		display: flex;
		align-items: center;
		.u-icon {
			margin-left: 10rpx;
		}
	}
}
</style>
