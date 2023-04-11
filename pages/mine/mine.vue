<template>
	<view>
		<view class="header">
			<view class="header-userInfo">
				<template v-if="userInfo">
					<view class="userInfo" @click="exit">
						<image :src="userInfo.avatarUrl" class="avatar"></image>
						<view class="login">
							<view class="logining">欢迎您：{{ userInfo.nickName }}</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="userInfo" @click="getUserInfo()">
						<image src="/static/imgs/mine/Zu428.png" class="avatar"></image>
						<view class="login">
							<view class="logining">立即登录</view>
							<view class="text">登陆后可收藏喜欢的菜谱</view>
						</view>
					</view>
				</template>
				<u-icon name="arrow-right" size="28rpx" color="#dadada" top="10rpx"></u-icon>
			</view>
			<template v-if="userInfo.vip">
				<view class="upgradeVIP" @click="gotoVip">
					<image src="/static/imgs/mine/mengbanzu87@3x.png" class="upgrade_img"></image>
					<text class="viptext">续费VIP</text>
					<u-icon name="arrow-right" size="28rpx" color="#b89766"></u-icon>
				</view>
			</template>
			<template v-else>
				<view class="upgradeVIP" @click="gotoVip">
					<image src="/static/imgs/mine/mengbanzu87@3x.png" class="upgrade_img"></image>
					<text class="viptext">升级为VIP</text>
					<u-icon name="arrow-right" size="28rpx" color="#b89766"></u-icon>
				</view>
			</template>
		</view>
		<view class="nav">
			<view class="myCollection">
				<image src="/static/imgs/mine//mengbanzu282.png" class="icon"></image>
				<view class="text">我的收藏</view>
			</view>
			<view class="history" @click="gotoBrowse">
				<image src="/static/imgs/mine//mengbanzu283@3x.png" class="icon"></image>
				<view class="text">浏览记录</view>
			</view>
			<view class="like">
				<image src="/static/imgs/mine//mengbanzu284@3x.png" class="icon"></image>
				<view class="text">点赞</view>
			</view>
		</view>
		<view class="main">
			<scroll-view class="title" scroll-x>
				<view :class="{ title_item: true, title_active: choosed == null }" @click="allFood">所有食材</view>
				<view :class="{ title_item: true, item_active: choosed == item._id }" v-for="item in myCollections" :key="item._id" @click="changeDishes(item._id)">
					{{ item.name }}
				</view>
			</scroll-view>
			<template v-if="dishes">
				<template v-if="dishes.length > 5">
					<template v-if="unfoldAll">
						<view class="foodList">
							<view class="list-item" v-for="item in dishes" :key="item.name">
								<view class="item-left">{{ item.name }}</view>
								<view class="item-right">{{ item.number }}</view>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="foodList">
							<view class="list-item">
								<view class="item-left">{{ dishes[0].name }}</view>
								<view class="item-right">{{ dishes[0].number }}</view>
							</view>
							<view class="list-item">
								<view class="item-left">{{ dishes[1].name }}</view>
								<view class="item-right">{{ dishes[1].number }}</view>
							</view>
							<view class="list-item">
								<view class="item-left">{{ dishes[2].name }}</view>
								<view class="item-right">{{ dishes[2].number }}</view>
							</view>
							<view class="list-item">
								<view class="item-left">{{ dishes[3].name }}</view>
								<view class="item-right">{{ dishes[3].number }}</view>
							</view>
							<view class="list-item">
								<view class="item-left">{{ dishes[4].name }}</view>
								<view class="item-right">{{ dishes[4].number }}</view>
							</view>
							<view class="item-last" @click="openAll">
								展开全部
								<image src="../../static/imgs/mine/mengbanzu282@3x.png" class="last-img"></image>
							</view>
						</view>
					</template>
				</template>
				<template v-else>
					<view class="foodList">
						<view class="list-item" v-for="item in dishes" :key="item.name">
							<view class="item-left">{{ item.name }}</view>
							<view class="item-right">{{ item.number }}</view>
						</view>
					</view>
				</template>
			</template>
			<template v-else>
				<view class="foodList">
					<view class="list-item">
						<view class="item-left">豌豆凉粉</view>
						<view class="item-right">500g</view>
					</view>
					<view class="list-item">
						<view class="item-left">小葱末</view>
						<view class="item-right">20g</view>
					</view>
					<view class="list-item">
						<view class="item-left">榨菜末</view>
						<view class="item-right">50g</view>
					</view>
					<view class="list-item">
						<view class="item-left">花生碎</view>
						<view class="item-right">50g</view>
					</view>
					<view class="list-item">
						<view class="item-left">姜末</view>
						<view class="item-right">10g</view>
					</view>
					<view class="item-last">
						展开全部
						<image src="../../static/imgs/mine/mengbanzu282@3x.png" class="last-img"></image>
					</view>
				</view>
			</template>
		</view>
		<view class="myRecipes">
			<view class="title">我的菜谱</view>
			<scroll-view class="recipes" scroll-x>
				<view class="item-recipe" v-for="item in myCollections" :key="item._id" @click="gotoDetail(item._id)">
					<view class="recipe_box"><image :src="item.coverpic" class="recipe-img"></image></view>
					<view class="recipe-name">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<view class="top">
				<image src="/static/imgs/mine//mengbanzu272@3x.png" class="support-icon"></image>
				<view class="content" style="border-bottom: 2rpx solid #dadada;">
					<view class="text" @click="gotoTest">去APP Store给菜谱大全评分</view>
					<u-icon name="arrow-right" size="28rpx" color="#dadada"></u-icon>
				</view>
			</view>
			<view class="bottom">
				<image src="/static/imgs/mine//mengbanzu273.png" class="support-icon"></image>
				<view class="content">
					<view class="text">反馈问题</view>
					<u-icon name="arrow-right" size="28rpx" color="#dadada"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: true,
			myCollections: [],
			//用于渲染菜品种类与数量
			dishes: null,
			//用于判断是否展开全部
			unfoldAll: false,
			//用于改变选中的菜品样式
			choosed: null
		};
	},
	methods: {
		//跳转到浏览记录
		gotoBrowse() {
			if (this.$store.state.userInfo) {
				uni.navigateTo({
					url: '/pages/browse/browse'
				});
			} else {
				uni.showToast({
					title: '请先登录',
					duration: 1000,
					icon: 'none'
				});
			}
		},
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
		//点击展开全部
		openAll() {
			this.unfoldAll = true;
		},
		//所有食材
		allFood() {
			this.choosed = null;
		},
		//点击修改菜名样式与其配料展示
		changeDishes(id) {
			this.choosed = id;
			this.unfoldAll = false;
			this.dishes = this.myCollections.filter(item => item._id == id)[0].ingredient;
			// console.log(this.dishes);
		},
		//获取收藏
		async getCollections() {
			if (this.$store.state.userInfo) {
				const res = await this.$api.mine.myCollectionsApi({ _id: this.$store.state._id });
				if (res.meta.status == 200) {
					this.myCollections = res.mycollect;
				}
				// console.log('res', res.mycollect);
				// console.log(this.userInfo);
			} else {
			}
		},
		gotoVip() {
			uni.navigateTo({
				url: '/pages/myVip/myVip'
			});
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
					// console.log(this.userInfo);
					this.getCollections();
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
		//退出登录
		exit() {
			//判断是否登录状态
			if (this.userInfo) {
				//确认框
				uni.showModal({
					title: '提示',
					content: '您确定要退出吗？',
					success: res => {
						if (res.confirm) {
							// console.log('用户点击确定');
							this.$store.commit('delete_user_info');
							this.myCollections = null;
							//清除本地数据
							try {
								uni.clearStorageSync();
							} catch (e) {
								// error
							}
							//提示框
							uni.showToast({
								title: '退出成功',
								duration: 1000,
								icon: 'none'
							});
							//1秒后跳转到我的页面
							// setTimeout(() => {
							// 	uni.navigateBack({
							// 		url: '/pages//my/my'
							// 	});
							// }, 1000);

							// console.log('退出3');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			}
		}
	},
	onShow() {
		this.getCollections();
	},
	mounted() {
		this.getCollections();
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
page {
	background-color: #f5f5f5;
}
.header {
	background-color: #fff;
}
.header-userInfo {
	display: flex;
	justify-content: space-between;
	margin: 0rpx 32rpx 34rpx 32rpx;
}
.userInfo {
	display: flex;
	.avatar {
		width: 116rpx;
		height: 116rpx;
		display: block;
		margin-right: 34rpx;
		border-radius: 50%;
	}
}
.login {
	.logining {
		font-size: 30rpx;
		line-height: 24rpx;
		font-weight: 600;
		color: #515151;
		margin: 34rpx 0 20rpx 0;
	}
	.text {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #d1d1d1;
	}
}
.upgradeVIP {
	width: 688rpx;
	height: 118rpx;
	margin: 0 auto;
	position: relative;
	.upgrade_img {
		width: 100%;
		height: 100%;
	}
	.viptext {
		position: absolute;
		top: 20rpx;
		left: 102rpx;
		height: 32rpx;
		font-size: 22rpx;
		line-height: 32rpx;
		color: #b4853f;
	}
	.u-icon {
		position: absolute;
		top: 30rpx;
		right: 70rpx;
	}
}
.nav {
	margin: 20rpx 0;
	background-color: #fff;
	padding: 12rpx 32rpx 30rpx 32rpx;
	display: flex;
	justify-content: space-between;
	.myCollection,
	.like,
	.history {
		width: 112rpx;
		.icon {
			width: 40rpx;
			height: 40rpx;
			display: block;
			margin: 0 auto;
		}
		.text {
			text-align: center;
			color: #5a5a5a;
			font-size: 28rpx;
			line-height: 28rpx;
			margin-top: 12rpx;
		}
	}
}
.main {
	background-color: #fff;
	padding: 0 32rpx;
	.title {
		white-space: nowrap;
		width: 100%;
		line-height: 66rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #5a5a5a;
		border-bottom: 1rpx solid #f1f1ff;
		.title_item {
			margin-right: 30rpx;
			display: inline-block;
		}
		.title_active {
			display: inline-block;
			font-size: 30rpx;
			color: #ee7b2d;
			margin-right: 36rpx;
		}
		.item_active {
			display: inline-block;
			font-size: 30rpx;
			color: #ee7b2d;
			margin-right: 36rpx;
		}
	}
}
.foodList {
	.list-item {
		display: flex;
		margin-right: 8rpx;
		line-height: 72rpx;
		font-size: 30rpx;
		height: 72rpx;
		border-bottom: 1rpx solid #f1f1ff;
		color: #8f8f8f;
		.item-left {
			width: 436rpx;
		}
		.item-right {
			width: calc(100% - 436rpx);
		}
	}
	.item-last {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #5a5a5a;
		height: 58rpx;
		.last-img {
			width: 20rpx;
			height: 20rpx;
			margin-left: 10rpx;
		}
	}
}
.myRecipes {
	margin: 20rpx 0;
	padding-left: 32rpx;
	padding-bottom: 16rpx;
	background-color: #fff;
	.title {
		font-size: 28rpx;
		line-height: 28rpx;
		padding: 16rpx 0 32rpx 0;
		color: #5a5a5a;
	}
}
.recipes {
	white-space: nowrap;
	width: 100%;
	.item-recipe {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		flex-shrink: 0;
		margin-right: 32rpx;
		width: 172rpx;
		.recipe_box {
			width: 172rpx;
			height: 208rpx;
			margin-bottom: 20rpx;
			.recipe-img {
				width: 100%;
				height: 100%;
				display: block;
				object-fit: cover;
			}
		}

		.recipe-name {
			font-size: 24rpx;
			color: #5a5a5a;
			text-align: center;
			line-height: 24rpx;
		}
	}
}
.footer {
	background-color: #fff;
}
.top,
.bottom {
	height: 94rpx;
	width: 100;
	display: flex;
	align-items: center;
	.support-icon {
		width: 44rpx;
		height: 44rpx;
		margin: 0 26rpx 0 28rpx;
	}
	.content {
		display: flex;
		justify-content: space-between;
		width: calc(100vw - 44rpx - 26rpx - 28rpx);
		padding-right: 36rpx;
		box-sizing: border-box;
		.text {
			font-size: 28rpx;
			color: #5a5a5a;
		}
	}
}
.top {
	.content {
		line-height: 94rpx;
		border-bottom: 2rpx solid #f5f5f5;
	}
}
</style>
