<template lang="html">
	<div class="left_nav">
		<ul v-if="tab==1">
			<li>
				<router-link to="/school_info/basicsInfo">基本信息</router-link>
			</li>
			<li>
				<router-link to="/school_info/classManagement">班级管理</router-link>
			</li>
			<li>
				<router-link to="/school_info/organization">学校组织架构</router-link>
			</li>
			<li>
				<router-link to="/school_info/batchOperation">批量操作</router-link>
			</li>
			<li v-if="permission">
				<router-link to="/school_info/placeDefinition">场所定义</router-link>
			</li>
			<li v-if="permission">
				<router-link to="/school_info/timeTable">作息时间表</router-link>
			</li>
			<li v-if="permission">
				<router-link to="/school_info/cardCenter">卡片中心</router-link>
			</li>
		</ul>
		<ul v-if="tab==2">
			<li v-if='permissionsetting'>
				<router-link to="/systemSettings/">权限设置</router-link>
			</li>
			<li>
				<router-link to="/systemSettings/">账号管理</router-link>
			</li>
		</ul>
		<ul v-if="tab==3">
			<li>
				<router-link to="/application/">班屏信息</router-link>
			</li>
			<li>
				<router-link to="/application/">设备监控</router-link>
			</li>
			<li>
				<router-link to="/application/">隐私设置</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { getShowButton } from '@/const/course'
	import { delCookie, getCookie } from '@/const/my.ext'
	export default {
		props: {
			tab: {
				type: Number,
				default: 1
			},
			onclass: {
				type: String,
				default: "base"
			},
			permissionsetting: { //是否有用户权限设置
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				token: getCookie('token'),
				school_id: getCookie('school_id'),
				permission:0,
			}
		},
		created: function() {
	        let _self = this;
	        let _data = {
	        	token: _self.token,
	        	school_id: _self.school_id
	        }
	        getShowButton(_data).then(respones => {
	        	if(respones.data.code == 0){
	        		_self.permission = respones.data.data.result.permission;
	        		_self.$emit("permission",_self.permission);
	        	}
	        })
	    }
	}
</script>

<style lang="scss" scoped>
	.left_nav {
		width: 100%;
		ul {
			background: #F7F9FB;
			border: 1px solid #DEE1E6;
			height: 728px;
			width: 100%;
			padding-top: 20px;
			box-sizing: border-box;
			li {
				font-size: 14px;
				a {
					color: #676A6C;
					cursor: pointer;
					display: block;
					line-height: 44px;
					padding: 0 20px;
					box-sizing: border-box;
					&.router-link-active{
						background: #4597E0;
						color: #fff;
					}
				}
			}
		}
	}
</style>