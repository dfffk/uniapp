import http from '../utils/request.js'

//获取我的收藏
const myCollectionsApi = (data) => http.get('/user/getcollect', data)

//套餐列表
const getTopupListApi = () => http.get('/user/topupList')

//开通会员
const openMemberApi = (data) => http.get('/user/openVip', data)

//浏览商品
const myBrowseApi = (data) => http.get('/user/getrecord', data)

export default {
	myCollectionsApi,
	getTopupListApi,
	openMemberApi,
	myBrowseApi
}
