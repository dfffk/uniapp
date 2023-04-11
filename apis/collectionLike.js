import http from '../utils/request.js'

//添加喜欢
const addLikeApi = (data) => http.post('/user/mylike', data)

//添加收藏
const addCollectionApi = (data) => http.post('/user/collect', data)

//我的收藏
const myCollectionApi = (data) => http.get('/user/getcollect', data)

//浏览商品
const myRecordApi = (data) => http.post('/user/record', data)

export default {
	addLikeApi,
	myCollectionApi,
	addCollectionApi,
	myRecordApi
}
