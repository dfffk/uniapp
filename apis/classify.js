import http from '@/utils/request.js'

//获取分类
const getclassifyApi = () => http.get('/categories')


export default {
	getclassifyApi
}
