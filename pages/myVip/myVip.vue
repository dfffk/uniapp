<template>
	<view>
		<view class="header">
			<top-bar></top-bar>
			<view class="back-classify">
				<view class="icon-back" @click="backonce"><u-icon name="arrow-left" color="#fff" size="36rpx"></u-icon></view>
				我的会员
			</view>
		</view>
		<view class="myVip-container" :style="{ marginTop: statusBarHeight + 84 + 'rpx' }">
			<view class="vip-done">
				<view class="vip-people">
					<view class="vip_avatars">
						<image src="/static/imgs/myVip/yonghu6@3x.png" class="avatar_img"></image>
						<image src="/static/imgs/myVip//yonghu5@3x.png" class="avatar_img"></image>
						<image src="/static/imgs/myVip/yonghu4@3x.png" class="avatar_img"></image>
						<image src="/static/imgs/myVip/yonghu3@3x.png" class="avatar_img"></image>
						<image src="/static/imgs/myVip/yonghu2@3x.png" class="avatar_img"></image>
						<image src="/static/imgs/myVip/yonghu1@3x.png" class="avatar_img"></image>
					</view>
					<view class="text">5593人已开通会员</view>
				</view>
				<view class="inquire">购买查询</view>
			</view>
			<view class="card">
				<template v-if="userInfo">
					<template v-if="userInfo.vip">
						<image :src="userInfo.avatarUrl" class="avatar"></image>
						<view class="myVip-card-child">
							<view class="card-name">
								<view class="welcome">欢迎您：{{ userInfo.nickName }}</view>
								<view class="card-img">会员</view>
							</view>
							<view class="open-vip">您已享受多种特权</view>
						</view>
					</template>
					<template v-else>
						<image :src="userInfo.avatarUrl" class="avatar"></image>
						<view class="myVip-card-child">
							<view class="card-name">
								<view class="welcome">欢迎您：{{ userInfo.nickName }}</view>
							</view>
							<view class="open-vip">开通会员尊享VIP权益</view>
						</view>
					</template>
				</template>
				<template v-else>
					<image src="../../static/imgs/vip/zu431@3x.png" class="avatar" @click="getUserInfo"></image>
					<view class="myVip-card-child" @click="getUserInfo">
						<view class="card-name">
							<view class="welcome">立即登录</view>
							<view class="card-img">会员</view>
						</view>
						<view class="open-vip">开通会员尊享VIP权益</view>
					</view>
				</template>
			</view>
		</view>
		<view class="package">
			<view class="recommend">推荐</view>
			<view class="choosePackages">
				<view
					:class="{ item_active: chooseItem == item._id, choosePackages_item: true }"
					v-for="item in topupList"
					:key="item._id"
					@click="changeStyle(item._id, item.mouth, item.salePrice)"
				>
					<view class="month">{{ item.mouth }}个月</view>
					<view class="cheapPrice">￥{{ item.salePrice }}</view>
					<view class="price">￥{{ item.normalPrice }}</view>
				</view>
			</view>
			<view class="congratulate">
				<view class="gongxi">恭喜</view>
				<view class="preferential">您获得两折开通会员特权</view>
			</view>
			<view class="openMember" @click="openMember">立即开通</view>
		</view>
		<view class="item_privilege">
			<view class="privilege">
				<view class="title">VIP特权</view>
				<view class="privilege_container">
					<view class="container_child">
						<image src="../../static/imgs/myVip/caipu@3x.png" class="img"></image>
						<view class="child_right">
							<view class="top">1000+精品名厨菜谱</view>
							<view class="bottom">大咖教学，轻松学会</view>
						</view>
					</view>
					<view class="container_child">
						<image src="../../static/imgs/myVip/new@3x.png" class="img"></image>
						<view class="child_right">
							<view class="top">每周上新</view>
							<view class="bottom">新菜持续更新中</view>
						</view>
					</view>
					<view class="container_child">
						<image src="../../static/imgs/myVip/ad@3x.png" class="img"></image>
						<view class="child_right">
							<view class="top">会员免广告打扰</view>
							<view class="bottom">体验更流畅</view>
						</view>
					</view>
					<view class="container_child">
						<image src="../../static/imgs/myVip/biaoshi@3x.png" class="img"></image>
						<view class="child_right">
							<view class="top">VIP尊贵身份标识</view>
							<view class="bottom">随时随地与众不同</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="vipDescription">
			<view class="title">会员使用说明</view>
			<view class="container">
				1.会员服务一经开通，不支持退款；
				<br />
				2.如遇到苹果手机支付问题，建议参考AppStore支付流程；
				<br />
				3.若会员开通出现异常，请立即联系客服我们会在2个工作日内出处理结果；
				<br />
				4.会员常见问题、会员服务协议、会员隐私协议。
			</view>
		</view>
		<template v-if="userInfo.vip">
			<view class="modelBox" ref="myModelBox" v-show="boxShow">
				<view class="fixed-package">
					<view class="package_icon">
						<u-icon name="close" color="#efd9b4" size="22" @click="closeModelBox"></u-icon>
						<view class="title">续费VIP会员</view>
					</view>
					<view class="recommend">超值特惠</view>
					<view class="choosePackages">
						<view
							:class="{ item_active: otherChooseItem == item._id, choosePackages_item: true }"
							v-for="item in topupList"
							:key="item._id"
							@click="otherChangeStyle(item._id, item.mouth, item.salePrice)"
						>
							<view class="month">{{ item.mouth }}个月</view>
							<view class="cheapPrice">￥{{ item.salePrice }}</view>
							<view class="price">￥{{ item.normalPrice }}</view>
						</view>
					</view>
					<view class="congratulate">
						<view class="gongxi">恭喜</view>
						<view class="preferential1">越早续费越优惠，即将涨价</view>
					</view>
					<view class="openMember" @click="otherOpenMember">立即购买</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="modelBox" ref="myModelBox" v-show="boxShow">
				<view class="fixed-package">
					<view class="package_icon">
						<u-icon name="close" color="#efd9b4" size="22" @click="closeModelBox"></u-icon>
						<view class="title">开通VIP会员</view>
					</view>
					<view class="recommend">即将涨价</view>
					<view class="choosePackages">
						<view
							:class="{ item_active: otherChooseItem == item._id, choosePackages_item: true }"
							v-for="item in topupList"
							:key="item._id"
							@click="otherChangeStyle(item._id, item.mouth, item.salePrice)"
						>
							<view class="month">{{ item.mouth }}个月</view>
							<view class="cheapPrice">￥{{ item.salePrice }}</view>
							<view class="price">￥{{ item.normalPrice }}</view>
						</view>
					</view>
					<view class="congratulate">
						<view class="gongxi">恭喜</view>
						<view class="preferential1">开通后立即全站去广告、免费看10000+名厨视频</view>
					</view>
					<view class="openMember" @click="otherOpenMember">立即购买</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			//用于改变选中套餐的样式,选中套餐的id
			chooseItem: '',
			otherChooseItem: '',
			//选中套餐的月数
			chooseMonth: '',
			topupList: [],
			choosePrice: 0,
			boxShow: false
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
		}),
			this.getTopupList();
	},
	methods: {
		//关闭模态框
		closeModelBox() {
			this.boxShow = false;
		},
		//点击切换选中的样式
		backonce() {
			uni.navigateBack();
		},
		//获取套餐列表
		async getTopupList() {
			const res = await this.$api.mine.getTopupListApi();
			// console.log('topupListApi', res);
			if (res.meta.status == 200) {
				this.topupList = res.data;
			}
		},
		changeStyle(id, month, price) {
			this.chooseItem = id;
			this.chooseMonth = month.toString();
			this.choosePrice = price;
			// console.log('1', this.chooseMonth, this.choosePrice);
		},
		otherChangeStyle(id, month, price) {
			this.otherChooseItem = id;
			this.chooseMonth = month.toString();
			this.choosePrice = price;
			// console.log('2', this.chooseMonth, this.choosePrice);
			// console.log(this.chooseItem, this.chooseMonth);
		},
		//点击显示开通会员，弹出模态框
		openMember() {
			if (this.$store.state.userInfo) {
				if (this.chooseItem) {
					this.otherChooseItem = this.chooseItem;
					this.boxShow = true;
				} else {
					//提示框
					uni.showToast({
						title: '请选择套餐',
						duration: 1000,
						icon: 'none'
					});
				}
			} else {
				uni.showToast({
					title: '请先登录',
					duration: 1000,
					icon: 'none'
				});
			}
		},
		//点击立即购买
		async otherOpenMember() {
			if (this.otherChooseItem) {
				// console.log(this.userInfo);
				// console.log('1', this.choosePrice);
				const res = await this.$api.mine.openMemberApi({
					// _id:this.userInfo._id,
					_id: this.$store.state._id,
					date: this.chooseMonth
				});
				const token = uni.getStorageSync('userToken');
				//有token,直接从数据库中获取信息
				// console.log(111);
				uni.request({
					url: 'http://nocat.life:4000/user/getUserInfo',
					method: 'GET',
					data: { token },
					success: res => {
						// console.log('restoken', res);
						this.$store.commit('set_user_info', res.data[0]);
						this.$store.commit('set_user_id', res.data[0]._id);
					}
				});
				// console.log('2', this.choosePrice);
				uni.navigateTo({
					url: '/pages/payComplete/payComplete?money=' + this.choosePrice
				});
			} else {
				//提示框
				uni.showToast({
					title: '请选择套餐',
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
	background-color: #313131;
	position: fixed;
	top: 0;
	z-index: 1000;
	border-bottom: 1rpx solid #a5a5a5;

	.back-classify {
		font-size: 36rpx;
		color: #fef2ea;
		font-weight: 500;
		line-height: 36rpx;
		display: flex;
		justify-content: space-between;
		width: 418rpx;
		margin: 20rpx 0 28rpx 32rpx;
	}
}
.myVip-container {
	position: relative;
	width: 100%;
	height: 312rpx;
	background-image: url('../../static/imgs/myVip/ditu@3x.png');
	background-size: 100% 100%;
	padding-top: 22rpx;
	margin-bottom: 92rpx;
	background-color: #fff;
	.card {
		width: 100%;
		height: 302rpx;
		background-image: url('../../static/imgs/myVip/huiyuan108.png');
		background-size: 100% 100%;
		display: flex;
		position: absolute;
		top: 98rpx;
		.avatar {
			width: 108rpx;
			height: 108rpx;
			display: block;
			margin: 80rpx 0 0 64rpx;
			border-radius: 50%;
		}
	}
}
.myVip-card-child {
	margin: 80rpx 0 0 18rpx;
	.open-vip {
		font-size: 28rpx;
		color: #86672f;
		line-height: 28rpx;
	}
	.card-name {
		display: flex;
		align-items: center;
		.card-img {
			border-radius: 16rpx;
			background-color: #a5a5a5;
			width: 108rpx;
			height: 34rpx;
			line-height: 32rpx;
			font-size: 26rpx;
			text-align: center;
			color: #fbedc5;
		}
		.welcome {
			font-size: 40rpx;
			margin: 8rpx 8rpx 18rpx 0;
			color: #7b5b21;
			line-height: 40rpx;
		}
	}
}
.vip-done {
	padding-right: 32rpx;
	display: flex;
	justify-content: space-between;
	.vip-people {
		height: 48rpx;
		width: 434rpx;
		background-color: #5c5c5c;
		border-radius: 0 40rpx 40rpx 0;
		display: flex;
		.text {
			color: #fff;
			margin-top: 14rpx;
			line-height: 26rpx;
			font-size: 24rpx;
		}
	}
	.inquire {
		line-height: 48rpx;
		font-size: 28rpx;
		color: #fff;
	}
}
.vip_avatars {
	margin: 8rpx 14rpx 0 34rpx;
	display: flex;
	.avatar_img {
		display: block;
		width: 36rpx;
		height: 36rpx;
		margin-left: -10rpx;
	}
}
.package {
	background-color: #fff;
	padding: 0 32rpx 74rpx 32rpx;
	position: relative;
	.u-icon {
		width: 100rpx;
		position: absolute;
		top: 26rpx;
		left: 34rpx;
	}
	.recommend {
		width: 94rpx;
		height: 40rpx;
		background-image: url('../../static/imgs/myVip/tuijian.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #fff;
		position: absolute;
	}
	.choosePackages {
		display: flex;
		justify-content: space-between;
	}
}
.choosePackages_item {
	margin-top: 18rpx;
	width: 210rpx;
	border: 1rpx solid #e0e0e0;
	background-color: #fcfbfe;
	text-align: center;
	border-radius: 16rpx;
	.month {
		margin-top: 48rpx;
		line-height: 36rpx;
		height: 36rpx;
		color: #464646;
	}
	.cheapPrice {
		font-size: 40rpx;
		color: #deb264;
		line-height: 40rpx;
		margin: 24rpx 0 32rpx 0;
	}
	.price {
		font-size: 28rpx;
		line-height: 28rpx;
		margin-bottom: 28rpx;
		color: #a49fa0;
		text-decoration: line-through;
	}
}
.item_active {
	border: 2rpx solid #deb062;
	background-color: #fbf7ef;
	margin-top: 18rpx;
	width: 210rpx;
	text-align: center;
	border-radius: 16rpx;
	.month {
		margin-top: 48rpx;
		line-height: 36rpx;
		height: 36rpx;
		color: #464646;
	}
	.cheapPrice {
		font-size: 40rpx;
		color: #deb264;
		line-height: 40rpx;
		margin: 24rpx 0 32rpx 0;
	}
	.price {
		font-size: 28rpx;
		line-height: 28rpx;
		margin-bottom: 28rpx;
		color: #a49fa0;
		text-decoration: line-through;
	}
}
.congratulate {
	margin: 28rpx 0 34rpx 0;
	display: flex;
	.gongxi {
		width: 92rpx;
		height: 40rpx;
		background-image: url('../../static/imgs/myVip/gongxi@3x.png');
		background-size: 100% 100%;
		text-align: center;
		line-height: 40rpx;
		font-size: 32rpx;
		font-weight: 550;
		margin-right: 10rpx;
		color: #deb264;
	}
	.preferential1 {
		line-height: 40rpx;
		font-size: 24rpx;
		color: #2c2c2c;
	}
}
.openMember {
	text-align: center;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 42rpx;
	font-weight: 550;
	background-color: #fcf1d3;
	color: #a98c4f;
	border-radius: 16rpx;
}
.modelBox {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	z-index: 2000;
}
.fixed-package {
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
	padding: 0 32rpx 0 32rpx;
	position: absolute;
	bottom: 0;
	.congratulate {
		margin: 28rpx 0 34rpx 0;
		display: flex;
		.gongxi {
			width: 92rpx;
			height: 40rpx;
			background-image: url('../../static/imgs/myVip/gongxi@3x.png');
			background-size: 100% 100%;
			text-align: center;
			line-height: 40rpx;
			font-size: 32rpx;
			font-weight: 550;
			margin-right: 10rpx;
			color: #deb264;
		}
		.preferential {
			line-height: 40rpx;
			font-size: 30rpx;
			color: #7b5b21;
		}
	}
	.package_icon {
		display: flex;
		.title {
			color: #5a5a5a;
			font-size: 32rpx;
			line-height: 32rpx;
			margin: 28rpx 0 12rpx 210rpx;
		}
	}
	.recommend {
		width: 158rpx;
		height: 56rpx;
		background-image: url('../../static/imgs/myVip/zhangjia.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		text-align: center;
		line-height: 40rpx;
		padding-top: 16rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #fff;
		position: absolute;
		top: 56rpx;
	}
	.choosePackages {
		display: flex;
		justify-content: space-between;
	}
}
.item_privilege {
	background-color: #f5f7fa;
	padding: 28rpx 0;
}
.privilege {
	padding: 20rpx 0 4rpx 32rpx;
	background-color: #fff;
	.title {
		font-size: 44rpx;
		color: #353535;
		line-height: 44rpx;
		margin-bottom: 42rpx;
	}
	.privilege_container {
		padding-left: 14rpx;
	}
}
.container_child {
	margin-bottom: 50rpx;
	display: flex;
	.img {
		border-radius: 50%;
		width: 90rpx;
		height: 90rpx;
		display: block;
		margin-right: 44rpx;
	}
	.child_right {
		padding-top: 6rpx;
		.top {
			margin-bottom: 18rpx;
			line-height: 32rpx;
			font-size: 32rpx;
			color: #484848;
		}
		.bottom {
			font-size: 26rpx;
			line-height: 26rpx;
			color: #aaa;
		}
	}
}
.vipDescription {
	padding: 26rpx 62rpx 52rpx 32rpx;
	.title {
		margin-bottom: 33rpx;
		line-height: 34rpx;
		font-size: 34rpx;
		color: #484848;
	}
	.container {
		line-height: 40rpx;
		color: #c3c3c3;
		font-size: 28rpx;
	}
}
</style>
