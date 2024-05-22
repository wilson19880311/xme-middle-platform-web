import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/users/` + url, ...arg)

/**
 * yq_usersApi接口管理器
 *
 * @author 王腾
 * @date  2024/05/21 14:09
 **/
export default {
	// 获取yq_users分页
	yqUsersPage(data) {
		return request('page', data, 'get')
	},
	// 提交yq_users表单 edit为true时为编辑，默认为新增
	yqUsersSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除yq_users
	yqUsersDelete(data) {
		return request('delete', data)
	},
	// 获取yq_users详情
	yqUsersDetail(data) {
		return request('detail', data, 'get')
	}
}
