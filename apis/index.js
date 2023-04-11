//汇总所有模块的API
//引入home  api
import home from '@/apis/home.js'
//引入search  api
import search from '@/apis/search.js'
//引入分类  api
import classify from '@/apis/classify.js'
//引入mine页面api
import mine from '@/apis/mine.js'
//引入点赞搜藏
import collectionLike from '@/apis/collectionLike.js'
//引入vipapi
import vip from '@/apis/vip.js'
//引入收藏喜欢

const api = {
	home,
	search,
	classify,
	mine,
	collectionLike,
	vip,
}

export default api
