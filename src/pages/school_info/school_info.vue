<template>
	<el-main class="content_cencent">
		<el-row>
			<el-col :span="4">
				<ui-leftnav></ui-leftnav>
			</el-col>
			<el-col :span="20">
				<router-view/>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import { getSysmsg } from '@/const/course'
	import { getCookie } from '@/const/my.ext'
	import uiLeftnav from '@/components/ui-leftnav'
	export default {
		name: 'home',
		components:{
			uiLeftnav
		},
		data() {
			return {
				token : getCookie("token"),
				user_id : getCookie("user_id"),
			}
		},
        created () {
        	
        }
	}
</script>

<style lang="scss">
	.content_cencent{
	    width: 1080px;
		margin: 25px auto 0;
	    border: 1px solid #DEE1E6;
	    box-shadow: 0 1px 8px 0 rgba(46, 59, 79, 0.10);
	    background: #FFFFFF;
		height: 730px;
		padding: 0;
		
	}
</style>