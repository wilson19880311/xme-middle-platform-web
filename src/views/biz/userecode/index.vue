<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="消费类型" name="type">
						<a-input v-model:value="searchFormState.type" placeholder="请输入消费类型" />
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
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('yqUseRecodeAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('yqUseRecodeBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchYqUseRecode"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('yqUseRecodeEdit')">编辑</a>
						<a-divider type="vertical" v-if="hasPerm(['yqUseRecodeEdit', 'yqUseRecodeDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteYqUseRecode(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('yqUseRecodeDelete')">删除</a-button>
						</a-popconfirm>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="tableRef.refresh()" />
</template>

<script setup name="userecode">
	import { cloneDeep } from 'lodash-es'
	import Form from './form.vue'
	import yqUseRecodeApi from '@/api/biz/yqUseRecodeApi'
	const searchFormState = ref({})
	const searchFormRef = ref()
	const tableRef = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '消费类型',
			dataIndex: 'type'
		},
		{
			title: '消费额度',
			dataIndex: 'value'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime'
		},
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['yqUseRecodeEdit', 'yqUseRecodeDelete'])) {
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
		return yqUseRecodeApi.yqUseRecodePage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		tableRef.value.refresh(true)
	}
	// 删除
	const deleteYqUseRecode = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		yqUseRecodeApi.yqUseRecodeDelete(params).then(() => {
			tableRef.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchYqUseRecode = (params) => {
		yqUseRecodeApi.yqUseRecodeDelete(params).then(() => {
			tableRef.value.clearRefreshSelected()
		})
	}
</script>
