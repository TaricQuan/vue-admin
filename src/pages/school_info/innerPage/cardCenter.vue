<template>
	<div class="box">
		<ui-btn><span slot="content">返回</span></ui-btn>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="批量导入" name="first">

			</el-tab-pane>
			<el-tab-pane label="导入记录" name="second">

			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import uiBtn from '@/components/ui-btn'
	export default {
		components:{
			uiBtn
		},
		data() {
			return {
				activeName: 'second'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	};
</script>
<style type="text/css">
	.el-tabs__nav-wrap::after {
		height: 0;
	}
	
	.el-tabs__header {
		margin: 0 auto;
		text-align: center;
		width: 380px;
		border-radius: 4px;
		border: 1px solid #4597E0;
	}
	
	.el-tabs__nav {
		width: 100%;
	}
	
	.el-tabs__item {
		padding: 0;
		text-align: center;
		color: #4597E0;
		width: 50%;
	}
	
	.el-tabs__item:last-child {
		border-left: none;
	}
	
	.el-tabs__active-bar {
		display: none;
	}
	
	.el-tabs__item.is-active {
		background: #4597E0;
		color: #fff;
	}
</style>