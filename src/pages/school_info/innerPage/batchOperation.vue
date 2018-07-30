<template>
	<div class="box">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="批量导入" name="first">
				<el-upload 
					class="upload-demo" 
					ref="upload"
  					:limit="1"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePreview" 
					:on-remove="handleRemove"
					:on-exceed="updateFile"
					:file-list="fileList"
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-tab-pane>
			<el-tab-pane label="导入记录" name="second">

			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import uiBtn from '@/components/ui-btn'
	export default {
		data() {
			return {
				activeName: 'first',
				fileList:[]
			};
		},
		methods: {
			updateFile(files, fileList){
				fileList[0].raw = files[0];
				fileList[0].name = files[0].name;
				fileList[0].size = files[0].size;
			},
			handleClick(){
				
			},
			handleRemove(tab, event) {
				console.log(tab, event);
			},
			handlePreview(){
				
			},
			submitUpload(){}
		}
	};
</script>
<style lang="scss" scoped>
	.box {
		padding: 35px;
		height: 728px;
		box-sizing: border-box;
		position: relative;
	}
</style>
<style type="text/css">
	.el-tabs__nav-wrap::after {
		height: 0;
	}
	
	.el-tabs__header {
		margin: 0 auto;
		text-align: center;
		width: 360px;
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
		font-size: 14;
		line-height: 36px;
		height: 36px;
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