const baseURL = 'http://nocat.life:4000';
import Store from '../store/index.js'
// console.log('res', Store);
// console.log(1111);

function request(params) {
	// console.log('params', params.data);
	// console.log('url', params.url);
	params.url = baseURL + params.url;
	if (params.data) {
		if (params.data.promptBox) {
			return new Promise((resolve, reject) => {
				uni.request({
					...params,
					success: (res) => {
						// console.log('res', res);
						resolve(res.data)
					},
					complete() {}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				uni.showLoading();
				uni.request({
					...params,
					success: (res) => {
						// console.log('res', res);
						resolve(res.data)
					},
					complete() {
						uni.hideLoading()
					}
				})
			})
		}
	} else {
		return new Promise((resolve, reject) => {
			uni.showLoading();
			uni.request({
				...params,
				success: (res) => {
					// console.log('res', res);
					resolve(res.data)
				},
				complete() {
					uni.hideLoading()
				}
			})
		})
	}
}

const http = {
	get(url, data) {
		return request({
			method: 'GET',
			url,
			data
		})
	},
	post(url, data) {
		return request({
			method: 'POST',
			url,
			data
		})
	}
}

export default http;
