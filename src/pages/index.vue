<template>
	<el-container>
		<el-header>
			<ui-header></ui-header>
			<ui-nav></ui-nav>
		</el-header>
		<router-view/>
	</el-container>
</template>

<script>
	import uiHeader from '@/components/ui-header'
	import uiNav from '@/components/ui-nav'
	export default {
		name: 'index',
		components: {
			uiHeader,
			uiNav
		},
		data() {
			return {
				userInfos:{},
				schoolInfo:{}
			}
		}
	}
</script>

<style lang="scss">
	.el-header{
		padding: 0;
		height: auto!important;
	}
</style>