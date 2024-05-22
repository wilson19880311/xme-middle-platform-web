import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/userecode/` + url, ...arg)

/**
 * yq_use_recodeApi接口管理器
 *
 * @author 王腾
 * @date  2024/05/21 16:48
 **/
export default {
	// 获取yq_use_recode分页
	yqUseRecodePage(data) {
		return request('page', data, 'get')
	},
	// 提交yq_use_recode表单 edit为true时为编辑，默认为新增
	yqUseRecodeSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除yq_use_recode
	yqUseRecodeDelete(data) {
		return request('delete', data)
	},
	// 获取yq_use_recode详情
	yqUseRecodeDetail(data) {
		return request('detail', data, 'get')
	}
}
