import http from '@/utils/request.js'

//精品名厨视频
const getBoutiqueApi = (data) => http.get('/search/memberRecommend', data)


//菜单详情
const getmenuDetailApi = (data) => http.post('/search/menuDetail', data)

//随机推荐
const getNormalRecommendApi = (data) => http.get('/search/normalRecommend', data)

//菜品搜索
const getSearchMenuApi = (data) => http.post('/search/searchMenu', data)

export default {
	getBoutiqueApi,
	getmenuDetailApi,
	getNormalRecommendApi,
	getSearchMenuApi
}
