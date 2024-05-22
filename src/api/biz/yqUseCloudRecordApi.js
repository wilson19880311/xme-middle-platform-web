import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/biz/usecloudrecord/` + url, ...arg)

/**
 * 云计算消费记录表Api接口管理器
 *
 * @author 王腾
 * @date  2024/05/22 10:00
 **/
export default {
	// 获取云计算消费记录表分页
	yqUseCloudRecordPage(data) {
		return request('page', data, 'get')
	},
	// 提交云计算消费记录表表单 edit为true时为编辑，默认为新增
	yqUseCloudRecordSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除云计算消费记录表
	yqUseCloudRecordDelete(data) {
		return request('delete', data)
	},
	// 获取云计算消费记录表详情
	yqUseCloudRecordDetail(data) {
		return request('detail', data, 'get')
	}
}
