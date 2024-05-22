<template>
	<xn-form-container
		:title="formData.id ? '编辑云计算消费记录表' : '增加云计算消费记录表'"
		:width="700"
		v-model:open="open"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="消费订单号：" name="orderNo">
						<a-input v-model:value="formData.orderNo" placeholder="请输入消费订单号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="用户ID：" name="userId">
						<a-input v-model:value="formData.userId" placeholder="请输入用户ID" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="消费类型 1:消费：" name="type">
						<a-input v-model:value="formData.type" placeholder="请输入消费类型 1:消费" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="消费额度：" name="value">
						<a-input v-model:value="formData.value" placeholder="请输入消费额度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="服务器地址：" name="host">
						<a-input v-model:value="formData.host" placeholder="请输入服务器地址" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="服务器端口号：" name="port">
						<a-input v-model:value="formData.port" placeholder="请输入服务器端口号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="yqUseCloudRecordForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import yqUseCloudRecordApi from '@/api/biz/yqUseCloudRecordApi'
	// 抽屉状态
	const open = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)

	// 打开抽屉
	const onOpen = (record) => {
		open.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		open.value = false
	}
	// 默认要校验的
	const formRules = {
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value
			.validate()
			.then(() => {
				submitLoading.value = true
				const formDataParam = cloneDeep(formData.value)
				yqUseCloudRecordApi
					.yqUseCloudRecordSubmitForm(formDataParam, formDataParam.id)
					.then(() => {
						onClose()
						emit('successful')
					})
					.finally(() => {
					submitLoading.value = false
					})
			})
			.catch(() => {})
	}
	// 抛出函数
	defineExpose({
		onOpen
	})
</script>
