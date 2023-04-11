<template>
	<view class="pages">
		<view class="search-tar">
			<top-bar></top-bar>
			<view class="back-search">
				<view class="icon-back" @click="backTo"><u-icon name="arrow-left" color="#fff" size="36rpx"></u-icon></view>
				{{ detailFood.name }}
			</view>
			<view class="imgs">
				<image src="../../static/imgs/detail/xuhuan@3x.png" @click="addLikeFood"></image>
				<image src="../../static/imgs/detail/zhuanfa@2x.png"></image>
			</view>
		</view>
		<template v-if="userInfo">
			<template v-if="userInfo.vip">
				<!-- 登录且有会员 -->
				<view class="video_container" :style="{ marginTop: statusBarHeight + 138 + 'rpx' }">
					<view class="food_video"><video :src="detailFood.vid" class="video"></video></view>
					<view class="vipRights" @click="gotoMvip">现在续费更优惠、免广告、看10000+名厨视频</view>
					<view class="goodsName">{{ detailFood.name }}</view>
					<view class="collectionBrowse">
						<view class="left">
							会员专享
							<image class="image" src="/static/imgs/detail//huiyuan@2x.png"></image>
						</view>
						<view class="center">
							{{ detailFood.pageview }}万浏览
							<image class="image" src="../../static/imgs/detail/liulan@3x.png"></image>
						</view>
						<view class="right">
							{{ detailFood.collections }}收藏
							<image class="image" src="../../static/imgs/detail/shoucamg@3x.png"></image>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<!-- 登录但没有会员 -->
				<view class="video_container" :style="{ marginTop: statusBarHeight + 138 + 'rpx' }">
					<view class="food_video"><image :src="detailFood.coverpic"></image></view>
					<view class="vipRights" @click="gotoMvip">会员低至2元/月、免广告、看10000+名厨视频</view>
					<view class="goodsName">{{ detailFood.name }}</view>
					<view class="collectionBrowse">
						<view class="left">
							会员专享
							<image class="image" src="/static/imgs/detail//huiyuan@2x.png"></image>
						</view>
						<view class="center">
							{{ detailFood.pageview }}万浏览
							<image class="image" src="../../static/imgs/detail/liulan@3x.png"></image>
						</view>
						<view class="right">
							{{ detailFood.collections }}收藏
							<image class="image" src="../../static/imgs/detail/shoucamg@3x.png"></image>
						</view>
					</view>
				</view>
			</template>
		</template>
		<template v-else>
			<!-- 未登录 -->
			<view class="video_container" :style="{ marginTop: statusBarHeight + 138 + 'rpx' }">
				<view class="food_video" @click="getUserInfo"><image :src="detailFood.coverpic"></image></view>
				<view class="parent_item" @click="getUserInfo">
					<view class="video_item">
						<view class="top">开通会员观看视频做法</view>
						<view class="center">立即开通</view>
						<view class="bottom">
							已是会员，立即登录
							<u-icon name="arrow-right" color="#ded0b8" size="34rpx"></u-icon>
						</view>
					</view>
				</view>
				<view class="vipRights" @click="prompt">会员低至2元/月、免广告、看10000+名厨视频</view>
				<view class="goodsName">{{ detailFood.name }}</view>
				<view class="collectionBrowse">
					<view class="left">
						会员专享
						<image class="image" src="/static/imgs/detail//huiyuan@2x.png"></image>
					</view>
					<view class="center">
						{{ detailFood.pageview }}万浏览
						<image class="image" src="../../static/imgs/detail/liulan@3x.png"></image>
					</view>
					<view class="right">
						{{ detailFood.collections }}收藏
						<image class="image" src="../../static/imgs/detail/shoucamg@3x.png"></image>
					</view>
				</view>
			</view>
		</template>

		<!-- 心得 -->
		<view class="experience">
			<view class="top">
				心得
				<view class="text">{{ detailFood.tips[0].tipdescribe[0] }}</view>
			</view>
			<view class="bottom">
				养生必读
				<view class="text">
					<text v-for="item in detailFood.classtips" :key="item">{{ item }}</text>
				</view>
			</view>
		</view>
		<!-- 配料 -->
		<view class="main">
			<view class="main_title">
				<view class="left">
					<image src="../../static/imgs/detail/shijian@3x.png" class="img"></image>
					30分钟以上
				</view>
				<view class="right">
					<image src="/static/imgs//detail/xing@2x.png" class="img"></image>
					切墩（初级）
				</view>
			</view>
			<view class="ingredient_title">
				<view class="left">用料</view>
				<template v-if="collected">
					<view class="right" @click="addCollection">移出采购清单</view>
				</template>
				<template v-else>
					<view class="right_collected" @click="addCollection">加入采购清单</view>
				</template>
			</view>
			<view class="item_ingredient" v-for="item in detailFood.ingredient" :key="item.name">
				<view class="left">{{ item.name }}</view>
				<view class="right">{{ item.number }}</view>
			</view>
		</view>
		<!-- 详细步骤 -->
		<template v-if="userInfo">
			<view class="detailSteps">
				<view class="step_item" v-for="(item, index) in detailFood.method" :key="item.name">
					<view class="step_title">步骤{{ index + 1 }}</view>
					<image :src="item.img" class="step_img"></image>
					<view class="step_text">{{ item.describe }}</view>
				</view>
			</view>
		</template>
		<template v-else></template>
		<!-- 小贴士 -->
		<view class="remind">
			<view class="remind_title">小贴士</view>
			<view class="remind_top">
				[用量换算]
				<view class="text">1汤匙≈15ml；1茶匙≈3g</view>
			</view>
			<view class="remind_center">
				[原料选择]
				<view class="text">
					1.川北凉粉：来自四川北部的一道民间小吃，由豌豆粉研制而成，口感细腻，颜色洁白透亮，这事和普通北方凉粉的区别所在。豌豆含有优质蛋白质，可以提高集体的抗病能力和康复能力。
					<br />
					2.永川豆豉：永川豆豉属毛霉型豆豉。富含蛋白质和人体所需基酸，香气浓郁，滋味鲜美，即可用于烹饪，也可代菜佐餐，不但营养价值高，又有开胃助食解表驱寒之功效。可在市场、超市购买
				</view>
			</view>
			<view class="remind_bottom">
				[烹饪要点]
				<view class="text">
					1.怎样使凉粉的味道有层次感？
					<br />
					首先放入榨菜末，增加轻脆的口感，然后放入香葱。提升菜的香气，接下来放入红油，提升菜的辣味和香味，最后放入花生碎，提升口感。
					<br />
					2.为什么没有放盐？
					<br />
					在调味时已烹入酱油、豆瓣等调味料，故无需要再加盐。如果口味较重，也可根据需求酌情添加。
				</view>
			</view>
		</view>
		<!-- 相关菜谱 -->
		<view class="guess-you-like">
			<view class="title">相关菜谱</view>
			<view class="youLike">
				<view class="new-item" v-for="item in freeVedio" :key="item._id" @click="newDetail(item._id)">
					<image class="new-img" :src="item.coverpic"></image>
					<view class="new-name">{{ item.name }}</view>
					<view class="good">
						<view class="pageview">
							{{ item.pageview }}
							<u-icon name="eye" color="#aaa" size="24rpx"></u-icon>
						</view>
						<view class="collections">
							{{ item.collections }}
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
			//该菜品_id
			id: '',
			detailFood: {},
			statusBarHeight: 0,
			//相关菜谱
			freeVedio: [],
			//用于修改添加收藏字体样式
			collected: false
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
		this.getCollections();
		this.getFree();
	},
	methods: {
		// 跳转到详情
		newDetail(id) {
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
		//获取相关菜谱
		async getFree(data) {
			const res = await this.$api.vip.getFreeApi(data);
			// console.log('free', res.menus);
			if (res.meta.status == 200) {
				this.freeVedio = res.menus;
			}
		},
		//提示登录
		prompt() {
			//提示框
			uni.showToast({
				title: res.msg,
				duration: 1000,
				icon: 'none'
			});
		},
		//去购买会员
		gotoMvip() {
			uni.navigateTo({
				url: '/pages/myVip/myVip'
			});
		},
		//获取我的收藏,然后判断该菜品是否被收藏
		async getCollections() {
			if (this.$store.state._id) {
				const res = await this.$api.mine.myCollectionsApi({ _id: this.$store.state._id });
				if (res.meta.status == 200) {
					if (res.mycollect.filter(item => item._id == this.id).length == 1) {
						this.collected = true;
					}
				}
				// console.log(this.userInfo);
			}
		},
		//添加收藏
		async addCollection() {
			if (this.$store.state._id) {
				const res = await this.$api.collectionLike.addCollectionApi({
					user_id: this.$store.state._id,
					menu_id: this.id,
					promptBox: true
				});
				// console.log('收藏', res);
				if (res.code == 1) {
					this.collected = true;
				} else {
					this.collected = false;
				}
				//提示框
				uni.showToast({
					title: res.msg,
					duration: 1000,
					icon: 'none'
				});
			} else {
				//提示框
				uni.showToast({
					title: '请先登录',
					duration: 1000,
					icon: 'none'
				});
			}
		},
		//添加喜欢
		async addLikeFood() {
			if (this.$store.state._id) {
				const res = await this.$api.collectionLike.addLikeApi({ user_id: this.$store.state._id, menu_id: this.id, promptBox: true });
				// console.log('like', res);
				uni.showToast({
					title: res.msg,
					duration: 1000,
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '请先登录',
					duration: 1000,
					icon: 'none'
				});
			}
		},
		getUserInfo() {
			//弹出授权窗口
			uni.getUserProfile({
				desc: '完善用户资料',
				success: res => {
					//通知状态机mutations修改userInfo
					//参数1  方法    参数2   传入数据
					// console.log(res.userInfo);
					this.$store.commit('set_user_info', res.userInfo);
					this.getCode();
				},
				fail: err => {
					// console.log(err);
				}
			});

			// if (this.timer) {
			// 	clearTimeout(this.timer);
			// }
			// this.timer = setTimeout(() => {
			// 	// console.log(111);
			// 	//弹出授权窗口
			// 	uni.getUserProfile({
			// 		desc: '完善用户资料',
			// 		success: res => {
			// 			//通知状态机mutations修改userInfo
			// 			//参数1  方法    参数2   传入数据
			// 			this.$store.commit('set_user_info', res.userInfo);
			// 			this.getCode();
			// 		},
			// 		fail: err => {
			// 			console.log(err);
			// 		}
			// 	});
			// }, 500);
		},
		//登录——获取code
		getCode() {
			uni.login({
				success: res => {
					this.getToken(res.code);
				}
			});
		},
		getToken(code) {
			// console.log(111111);
			uni.request({
				url: 'http://nocat.life:4000/user/wxLogin',
				method: 'POST',
				data: {
					code, // 微信官方需要的参数
					// appId 和 appSecret 在实际项目开发中不需要传递给后端
					appId: 'wxf50dd146529ee744',
					appSecret: '83426371c62038e83cb26f4baa9f950c'
				},
				success: res => {
					// console.log('res: ', res);
					// console.log(this.userInfo);
					uni.setStorageSync('userToken', res.data.token);
					this.updateUserInfo(res.data.token);
				},
				fail(res) {
					// console.log(res);
				}
			});
		},
		//授权后更新数据库信息
		updateUserInfo(token) {
			const { avatarUrl, nickName, gender, province } = this.$store.state.userInfo;
			// console.log('avatarUrl', avatarUrl);
			uni.request({
				url: 'http://nocat.life:4000/user/auth',
				method: 'post',
				data: {
					token,
					avatarUrl,
					nickName,
					gender,
					province
				},
				success: res => {
					// console.log(res);
					uni.request({
						url: 'http://nocat.life:4000/user/getUserInfo',
						method: 'GET',
						data: { token },
						success: res => {
							this.$store.commit('set_user_id', res.data[0]._id);
						},
						complete: () => {
							// console.log(this.$store.state._id);
						}
					});
				}
			});
		},
		backTo() {
			uni.navigateBack();
		}
	},
	computed: {
		//用户信息
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	async onLoad(option) {
		const res = await this.$api.search.getmenuDetailApi({ _id: option._id });
		this.detailFood = res.message[0];
		this.id = option._id;
		// console.log('option', option._id);
		// console.log(this.detailFood);
	}
};
</script>

<style lang="scss" scoped>
.pages {
	background-color: #f6f7f8;
}
.search-tar {
	background-size: 100% 100%;
	background-image: url('../../static/imgs/search/ditu.png');
	position: fixed;
	top: 0;
	z-index: 1000;
	.back-search {
		font-size: 36rpx;
		color: #fef2ea;
		line-height: 36rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		width: 450rpx;
		padding-bottom: 84rpx;
		.icon-back {
			padding-left: 35rpx;
			box-sizing: border-box;
			width: 90rpx;
			line-height: 50rpx;
		}
	}
	.imgs {
		position: absolute;
		display: flex;
		bottom: 0;
		right: 24rpx;
		image {
			width: 50rpx;
			height: 50rpx;
			display: block;
			margin-right: 14rpx;
		}
	}
}
.video_container {
	position: relative;
	background-color: #fff;
	padding-bottom: 40rpx;
	.food_video {
		width: 100%;
		height: 386rpx;
		image {
			width: 100%;
			height: 100%;
		}
		.video {
			width: 100%;
			height: 100%;
		}
	}
	.vipRights {
		margin: 28rpx 32rpx 52rpx 32rpx;
		border-radius: 16rpx;
		font-size: 28rpx;
		line-height: 88rpx;
		color: #fff;
		text-align: center;
		background-color: #e8b767;
	}
	.goodsName {
		text-align: center;
		font-size: 34rpx;
		color: #000000;
	}
}
.parent_item {
	position: absolute;
	top: 0;
	width: 100%;
	height: 386rpx;
	background-color: rgba(0, 0, 0, 0.5);
	.video_item {
		margin-top: 86rpx;
		width: 100%;
		.top {
			font-size: 32rpx;
			line-height: 32rpx;
			color: #fff;
			text-align: center;
			font-weight: 400;
		}
		.center {
			margin: 30rpx 253rpx;
			display: flex;
			justify-content: center;
			line-height: 68rpx;
			color: #76401f;
			background-color: #f5e3c4;
			font-size: 32rpx;
			width: 244rpx;
			border-radius: 34rpx;
		}
		.bottom {
			font-weight: 400;
			font-size: 32rpx;
			color: #fff;
			display: flex;
			justify-content: center;
		}
	}
}
.collectionBrowse {
	display: flex;
	justify-content: center;
	margin-top: 32rpx;
	.left {
		display: flex;
		color: #ed6786;
		font-size: 20rpx;
		line-height: 26rpx;
		margin-right: 20rpx;
		.image {
			display: block;
			width: 26rpx;
			height: 26rpx;
			margin-left: 12rpx;
		}
	}
	.center {
		display: flex;
		color: #aaa;
		font-size: 20rpx;
		line-height: 26rpx;
		margin-right: 20rpx;
		.image {
			display: block;
			width: 26rpx;
			height: 26rpx;
			margin-left: 12rpx;
		}
	}
	.right {
		display: flex;
		color: #aaa;
		font-size: 20rpx;
		line-height: 26rpx;
		.image {
			display: block;
			width: 26rpx;
			height: 26rpx;
			margin-left: 12rpx;
		}
	}
}
.main {
	margin-top: 28rpx;
	padding-top: 36rpx;
	background-color: #fff;
}
.main_title {
	display: flex;
	justify-content: center;
	font-size: 26rpx;
	line-height: 36rpx;
	color: #686868;
	.left {
		display: flex;
		margin-right: 40rpx;
		.img {
			display: block;
			margin-right: 12rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}
	.right {
		display: flex;
		.img {
			display: block;
			margin-right: 12rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}
}
.ingredient_title {
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	line-height: 28rpx;
	margin: 34rpx 32rpx 0 34rpx;
	padding-bottom: 34rpx;
	border-bottom: 1rpx solid #f1f1f1;
	.left {
		color: #000000;
	}
	.right {
		color: #9b9b9b;
	}
	.right_collected {
		color: #ee7b2d;
	}
}
.item_ingredient {
	margin: 0 32rpx;
	display: flex;
	line-height: 70rpx;
	border-bottom: 1rpx solid #f1f1f1;
	color: #686868;
	font-size: 28rpx;
	.left {
		width: 436rpx;
	}
}
.remind {
	background-color: #fff;
	font-size: 30rpx;
	line-height: 30rpx;
	padding-bottom: 32rpx;
	.remind_title {
		padding: 34rpx 0 42rpx 32rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #2c2c2c;
	}
	.remind_top {
		color: #686868;
		margin-left: 32rpx;
		.text {
			font-size: 24rpx;
			line-height: 26rpx;
			margin: 20rpx 70rpx 30rpx 22rpx;
			color: #707070;
		}
	}
	.remind_center {
		margin-left: 32rpx;
		color: #686868;
		.text {
			font-size: 24rpx;
			line-height: 32rpx;
			margin: 32rpx 70rpx 36rpx 22rpx;
			color: #707070;
		}
	}
	.remind_bottom {
		margin-left: 32rpx;
		color: #686868;
		.text {
			font-size: 24rpx;
			line-height: 32rpx;
			margin: 32rpx 70rpx 0 22rpx;
			color: #707070;
		}
	}
}
.guess-you-like {
	margin-top: 28rpx;
	padding: 34rpx 32rpx 0 32rpx;
	background-color: #fff;
	.title {
		font-size: 30rpx;
		line-height: 30rpx;
		color: #303030;
		margin-bottom: 26rpx;
		letter-spacing: 1rpx;
	}
}
.youLike {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.new-item {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex-shrink: 0;
	margin-bottom: 32rpx;
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
.detailSteps {
	background-color: #fff;
	padding: 0 32rpx;
	.step_item {
		padding-top: 48rpx;
		.step_title {
			font-size: 30rpx;
			line-height: 30rpx;
			margin-bottom: 26rpx;
			color: #2c2c2c;
		}
		.step_img {
			width: calc(100vw - 64rpx);
			height: 440rpx;
			border-radius: 8rpx;
			display: block;
			object-fit: cover;
		}
		.step_text {
			font-size: 26rpx;
			line-height: 40rpx;
			margin-top: 34rpx;
			color: #686868;
		}
	}
}
.experience {
	margin-top: 28rpx;
	padding: 34rpx 32rpx 28rpx 32rpx;
	background-color: #fff;
	.top {
		font-size: 28rpx;
		color: #2c2c2c;
		line-height: 28rpx;
		.text {
			color: #686868;
			line-height: 40rpx;
			font-size: 28rpx;
			margin-top: 36rpx;
		}
	}
	.bottom {
		font-size: 28rpx;
		color: #2c2c2c;
		line-height: 28rpx;
		margin-top: 46rpx;
		.text {
			color: #686868;
			line-height: 40rpx;
			font-size: 28rpx;
			margin-top: 36rpx;
		}
	}
}
</style>
