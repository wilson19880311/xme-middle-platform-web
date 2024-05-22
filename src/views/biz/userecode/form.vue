<template>
	<xn-form-container
		:title="formData.id ? '编辑yq_use_recode' : '增加yq_use_recode'"
		:width="700"
		v-model:open="open"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="用户ID：" name="userId">
						<a-input v-model:value="formData.userId" placeholder="请输入用户ID" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="消费类型：" name="type">
						<a-input v-model:value="formData.type" placeholder="请输入消费类型" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="消费额度：" name="value">
						<a-input v-model:value="formData.value" placeholder="请输入消费额度" allow-clear />
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

<script setup name="yqUseRecodeForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import yqUseRecodeApi from '@/api/biz/yqUseRecodeApi'
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
				yqUseRecodeApi
					.yqUseRecodeSubmitForm(formDataParam, formDataParam.id)
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
