<template>
	<view class="page">
		<view class="random">
			<view class="random_item" v-for="item in record" :key="item._id" @click="gotoDetail(item._id)">
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
			record: []
		};
	},
	methods: {
		//跳转详情页面
		gotoDetail(id) {
			uni.navigateTo({
				url: '/pages/detail/detail?_id=' + id
			});
		},
		//获取浏览记录
		async getBrowseShops() {
			const res = await this.$api.mine.myBrowseApi({
				_id: this.$store.state._id
			});
			this.record = res.record;
		}
	},
	mounted() {
		this.getBrowseShops();
	}
};
</script>

<style lang="scss" scoped>
.page {
	background-color: #f6f7f8;
}
.random {
	margin: 0 32rpx 0 32rpx;
}
.random_item {
	height: 210rpx;
	display: flex;
	border-bottom: 30rpx solid #f6f7f8;
	background-color: #fff;
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
