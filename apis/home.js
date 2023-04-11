//首页api
import http from '@/utils/request.js'
//获取轮播图
const getSwiperApi = () => http.get('/home/swiperdata');

//获取导航栏a
const getClassifyApi = () => http.get('/home/catitems')

//获取楼层数据
const getFloorApi = () => http.get('/home/floorsdata');

//获取推荐商品
const getRecommendShopsApi = () => http.get('/home/recommend')
export default {
	getSwiperApi,
	getClassifyApi,
	getFloorApi,
	getRecommendShopsApi,
}
