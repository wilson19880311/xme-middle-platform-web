<template>
	<xn-form-container
		:title="formData.id ? '编辑yq_users' : '增加yq_users'"
		:width="700"
		v-model:open="open"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="昵称：" name="name">
						<a-input v-model:value="formData.name" placeholder="请输入昵称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="手机号：" name="phone">
						<a-input v-model:value="formData.phone" placeholder="请输入手机号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="登录账号：" name="username">
						<a-input v-model:value="formData.username" placeholder="请输入登录账号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="密码：" name="password">
						<a-input v-model:value="formData.password" placeholder="请输入密码" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="过期时间：" name="useTime">
						<a-input v-model:value="formData.useTime" placeholder="请输入过期时间" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="合成时间：" name="comeTime">
						<a-input v-model:value="formData.comeTime" placeholder="请输入合成时间" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="实时互动时长：" name="liveTime">
						<a-input v-model:value="formData.liveTime" placeholder="请输入实时互动时长" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="声音克隆次数：" name="soundNum">
						<a-input v-model:value="formData.soundNum" placeholder="请输入声音克隆次数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="形象克隆次数：" name="imageNum">
						<a-input v-model:value="formData.imageNum" placeholder="请输入形象克隆次数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="vip合成时间：" name="vipComeTime">
						<a-input v-model:value="formData.vipComeTime" placeholder="请输入vip合成时间" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="vip实时互动时长：" name="vipLiveTime">
						<a-input v-model:value="formData.vipLiveTime" placeholder="请输入vip实时互动时长" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="vip声音克隆次数：" name="vipSoundNum">
						<a-input v-model:value="formData.vipSoundNum" placeholder="请输入vip声音克隆次数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="vip形象克隆次数：" name="vipImageNum">
						<a-input v-model:value="formData.vipImageNum" placeholder="请输入vip形象克隆次数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="会员等级：" name="vipLv">
						<a-input v-model:value="formData.vipLv" placeholder="请输入会员等级" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="登录ip：" name="loginIp">
						<a-input v-model:value="formData.loginIp" placeholder="请输入登录ip" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="电脑标识：" name="session">
						<a-input v-model:value="formData.session" placeholder="请输入电脑标识" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="登录时间：" name="loginTime">
						<a-input v-model:value="formData.loginTime" placeholder="请输入登录时间" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="是否限制互动：" name="isLimit">
						<a-input v-model:value="formData.isLimit" placeholder="请输入是否限制互动" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="剩余云计算时间（秒）：" name="remainingTime">
						<a-input v-model:value="formData.remainingTime" placeholder="请输入剩余云计算时间（秒）" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="是否开启云计算 0:未开启 1：开启：" name="autodlStatus">
						<a-input v-model:value="formData.autodlStatus" placeholder="请输入是否开启云计算 0:未开启 1：开启" allow-clear />
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

<script setup name="yqUsersForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import yqUsersApi from '@/api/biz/yqUsersApi'
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
				yqUsersApi
					.yqUsersSubmitForm(formDataParam, formDataParam.id)
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
