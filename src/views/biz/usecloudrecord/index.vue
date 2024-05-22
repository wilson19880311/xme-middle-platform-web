<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="消费订单号" name="orderNo">
						<a-input v-model:value="searchFormState.orderNo" placeholder="请输入消费订单号" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="用户ID" name="userId">
						<a-input v-model:value="searchFormState.userId" placeholder="请输入用户ID" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="消费类型 1:消费" name="type">
						<a-input v-model:value="searchFormState.type" placeholder="请输入消费类型 1:消费" />
					</a-form-item>
				</a-col>
				<a-col :span="6" v-show="advanced">
					<a-form-item label="服务器地址" name="host">
						<a-input v-model:value="searchFormState.host" placeholder="请输入服务器地址" />
					</a-form-item>
				</a-col>
				<a-col :span="6" v-show="advanced">
					<a-form-item label="服务器端口号" name="port">
						<a-input v-model:value="searchFormState.port" placeholder="请输入服务器端口号" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" @click="tableRef.refresh()">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
					<a @click="toggleAdvanced" style="margin-left: 8px">
						{{ advanced ? '收起' : '展开' }}
						<component :is="advanced ? 'up-outlined' : 'down-outlined'"/>
					</a>
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
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('yqUseCloudRecordAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('yqUseCloudRecordBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchYqUseCloudRecord"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('yqUseCloudRecordEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['yqUseCloudRecordEdit', 'yqUseCloudRecordDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteYqUseCloudRecord(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('yqUseCloudRecordDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="tableRef.refresh()" />
</template>

<script setup name="usecloudrecord">
	import { cloneDeep } from 'lodash-es'
	import Form from './form.vue'
	import yqUseCloudRecordApi from '@/api/biz/yqUseCloudRecordApi'
	const searchFormState = ref({})
	const searchFormRef = ref()
	const tableRef = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	// 查询区域显示更多控制
	const advanced = ref(false)
	const toggleAdvanced = () => {
		advanced.value = !advanced.value
	}
	const columns = [
		{
			title: '消费订单号',
			dataIndex: 'orderNo'
		},
		{
			title: '用户ID',
			dataIndex: 'userId'
		},
		{
			title: '消费类型 1:消费',
			dataIndex: 'type'
		},
		{
			title: '消费额度',
			dataIndex: 'value'
		},
		{
			title: '服务器地址',
			dataIndex: 'host'
		},
		{
			title: '服务器端口号',
			dataIndex: 'port'
		},
		{
			title: '开始时间',
			dataIndex: 'createTime'
		},
		{
			title: '结束时间',
			dataIndex: 'updateTime'
		},
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['yqUseCloudRecordEdit', 'yqUseCloudRecordDelete'])) {
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
		return yqUseCloudRecordApi.yqUseCloudRecordPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		tableRef.value.refresh(true)
	}
	// 删除
	const deleteYqUseCloudRecord = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		yqUseCloudRecordApi.yqUseCloudRecordDelete(params).then(() => {
			tableRef.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchYqUseCloudRecord = (params) => {
		yqUseCloudRecordApi.yqUseCloudRecordDelete(params).then(() => {
			tableRef.value.clearRefreshSelected()
		})
	}
</script>
