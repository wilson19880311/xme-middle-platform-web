<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="手机号" name="phone">
						<a-input v-model:value="searchFormState.phone" placeholder="请输入手机号" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="是否开启云计算 0:未开启 1：开启" name="autodlStatus">
						<a-input v-model:value="searchFormState.autodlStatus" placeholder="请输入是否开启云计算 0:未开启 1：开启" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" @click="tableRef.refresh()">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<s-table
			ref="tableRef"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:row-selection="options.rowSelection"
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('yqUsersAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('yqUsersBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchYqUsers"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('yqUsersEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['yqUsersEdit', 'yqUsersDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteYqUsers(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('yqUsersDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="tableRef.refresh()" />
</template>

<script setup name="users">
	import { cloneDeep } from 'lodash-es'
	import Form from './form.vue'
	import yqUsersApi from '@/api/biz/yqUsersApi'
	const searchFormState = ref({})
	const searchFormRef = ref()
	const tableRef = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '昵称',
			dataIndex: 'name'
		},
		{
			title: '手机号',
			dataIndex: 'phone'
		},
		{
			title: '登录账号',
			dataIndex: 'username'
		},
		{
			title: '过期时间',
			dataIndex: 'useTime'
		},
		{
			title: '合成时间',
			dataIndex: 'comeTime'
		},
		{
			title: '实时互动时长',
			dataIndex: 'liveTime'
		},
		{
			title: '声音克隆次数',
			dataIndex: 'soundNum'
		},
		{
			title: '形象克隆次数',
			dataIndex: 'imageNum'
		},
		{
			title: 'vip合成时间',
			dataIndex: 'vipComeTime'
		},
		{
			title: 'vip实时互动时长',
			dataIndex: 'vipLiveTime'
		},
		{
			title: 'vip声音克隆次数',
			dataIndex: 'vipSoundNum'
		},
		{
			title: 'vip形象克隆次数',
			dataIndex: 'vipImageNum'
		},
		{
			title: '会员等级',
			dataIndex: 'vipLv'
		},
		{
			title: '登录ip',
			dataIndex: 'loginIp'
		},
		{
			title: '电脑标识',
			dataIndex: 'session'
		},
		{
			title: '登录时间',
			dataIndex: 'loginTime'
		},
		{
			title: '是否限制互动',
			dataIndex: 'isLimit'
		},
		{
			title: '剩余云计算时间（秒）',
			dataIndex: 'remainingTime'
		},
		{
			title: '是否开启云计算 0:未开启 1：开启',
			dataIndex: 'autodlStatus'
		},
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['yqUsersEdit', 'yqUsersDelete'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: 150
		})
	}
	const selectedRowKeys = ref([])
	// 列表选择配置
	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: true,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const loadData = (parameter) => {
		const searchFormParam = cloneDeep(searchFormState.value)
		return yqUsersApi.yqUsersPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		tableRef.value.refresh(true)
	}
	// 删除
	const deleteYqUsers = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		yqUsersApi.yqUsersDelete(params).then(() => {
			tableRef.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchYqUsers = (params) => {
		yqUsersApi.yqUsersDelete(params).then(() => {
			tableRef.value.clearRefreshSelected()
		})
	}
</script>
