<template>
	<view>
		<view class="classify-bar">
			<!-- 占位 -->
			<top-bar></top-bar>
			<view class="back-classify">
				<view class="icon-back" @click="backHome"><u-icon name="arrow-left" color="#fff" size="36rpx"></u-icon></view>
				食材分类
			</view>
			<view class="classify-Ingredients">
				<view :class="{ active: task == 'classify' }" @click="changeDom('classify')">分类</view>
				<view :class="{ active: task == 'Ingredients' }" @click="changeDom('Ingredients')">食材</view>
			</view>
			<view class="search" @click="gotoSearch">
				<image src="../../static/imgs/home/mengbanzu2.png" class="icon"></image>
				<text class="text">想吃什么点这里</text>
			</view>
		</view>
		<view class="container">
			<scroll-view class="list" :scroll-y="true" :style="{ height: statusBarHeight - 257 + 'rpx' }">
				<view :class="{ active: index == changeIndex }" v-for="(item, index) in classifyList" :key="item._id" @click="changeActive(index)">
					<view class="text">{{ item.cat_name }}</view>
				</view>
			</scroll-view>
			<scroll-view class="details" :scroll-y="true" @scroll="getScroll" scroll-with-animation :style="{ height: statusBarHeight - 257 + 'rpx' }" :scroll-into-view="scrollId">
				<view class="details-item" v-for="(item, index) in classifyList" :key="item._id" :id="'scroll' + index">
					<view class="title">{{ item.cat_name }}</view>
					<view class="item-children">
						<view class="item-child" v-for="(obj, index) in item.children" :key="obj">
							<image class="img" :src="obj.cat_icon"></image>
							<view class="name">{{ obj.cat_name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//选中的
			task: 'classify',
			classify: '',
			//除了顶部的高度
			statusBarHeight: 0,
			classifyList: [],
			//用于改变左侧列表点击时的样式
			changeIndex: 0,
			scrollId: 'scroll0'
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: res => {
				// console.log(res);
				//将除了状态栏的剩余高度转化为rpx单位
				this.statusBarHeight = (750 / res.windowWidth) * (res.windowHeight - res.statusBarHeight);
			},
			fail() {
				// console.log(111111111);
			}
		}),
			this.getClassify();
	},
	methods: {
		changeActive(index) {
			this.changeIndex = index;
			this.scrollId = 'scroll' + index;
			// console.log(index);
		},
		//滚动右侧菜单改变左侧列表样式
		getScroll(event) {
			const scrollTop = event.detail.scrollTop;
			const query = uni.createSelectorQuery();
			query
				.selectAll('.details-item')
				.boundingClientRect(arr => {
					// console.log(arr);
					let start = 0;
					arr.forEach((item, index) => {
						if (scrollTop >= start && scrollTop < start + item.height) {
							this.changeIndex = index;
						}
						start += item.height;
					});
				})
				.exec();
		},
		//获取分类信息
		async getClassify() {
			const res = await this.$api.classify.getclassifyApi();
			if (res.meta.status == 200) {
				this.classifyList = res.message;
			}
			// console.log(this.classifyList);
		},
		//切换分类和食材
		changeDom(name) {
			this.task = name;
		},
		//返回到首页
		backHome() {
			uni.navigateBack();
		},
		//跳转到搜索页面
		gotoSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.classify-bar {
	background-image: url('/static/imgs/classify/ditu.png');
	background-size: 100% 100%;
	padding-bottom: 22rpx;
}
.back-classify {
	font-size: 36rpx;
	color: #fef2ea;
	font-weight: 500;
	line-height: 36rpx;
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	width: 450rpx;
	margin-bottom: 48rpx;
}
.classify-Ingredients {
	width: 378rpx;
	height: 48rpx;
	border: 2rpx solid #fff;
	border-radius: 28rpx;
	margin: 0 auto;
	text-align: center;
	line-height: 48rpx;
	font-size: 28rpx;
	display: flex;
	view {
		width: 50%;
		border-radius: 28rpx;
		color: #fff;
	}
	.active {
		color: #f08334;
		background-color: #fff;
	}
}
.icon-back {
	padding-left: 35rpx;
	box-sizing: border-box;
	width: 90rpx;
	line-height: 50rpx;
}
.search {
	background-color: #f1f1f1;
	height: 60rpx;
	width: 692rpx;
	margin: 20rpx 0 0 28rpx;
	color: #c7c7c7;
	border-radius: 16rpx;
	font-size: 24rpx;
	line-height: 60rpx;
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
	display: flex;
}
.list {
	width: 180rpx;
	background-color: #fff;
	border-right: 2rpx solid transparent;
	view {
		height: 135rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #767676;
	}
	.active {
		height: 135rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #ef7d2b;
		background-color: #f6f6f6;
		.text {
			text-align: center;
			width: 182rpx;
			height: 24rpx;
			line-height: 24rpx;
			border-right: 2rpx solid #ef7d2b;
		}
	}
}
.details {
	background-color: #fcfcfc;
	border-right: 2rpx solid #f6f6f6;
}
.details-item {
	padding-top: 18rpx;
	.title {
		font-size: 22rpx;
		line-height: 22rpx;
		color: #cbcbcb;
		margin: 0 0 22rpx 22rpx;
	}
	.item-children {
		margin: 0 32rpx 14rpx 32rpx;
		display: grid;
		grid-template-columns: repeat(3, 100rpx);
		grid-gap: 10rpx calc((504rpx - 300rpx) / 2);
	}
}
.item-child {
	width: 100rpx;
	.img {
		display: block;
		width: 100rpx;
		height: 100rpx;
	}
	.name {
		text-align: center;
		line-height: 18rpx;
		font-size: 18rpx;
		margin-top: 12rpx;
		color: #dbdbdb;
	}
}
</style>
