import http from '../utils/request.js'

//获取vip最新推荐
const getNewVedioApi = (data) => http.get('/vip/getRecommendMenuList', data)
//获取显示免费体验
const getFreeApi = (data) => http.get('/vip/getisFreeMenuList', data)
//获取喜欢
const getLikeApi = (data) => http.get('/vip/likeMenu', data)

export default {
	getNewVedioApi,
	getFreeApi,
	getLikeApi
}
