<script>
export default {
	onLaunch: function() {
		//判断本地储存是否有token
		const token = uni.getStorageSync('userToken');
		//有token,直接从数据库中获取信息
		if (token) {
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
		}
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
</style>
