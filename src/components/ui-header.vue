<template lang="html">
	<div class='thehead'>
		<div class='thehead_top'>
			<div class='text_left'>{{school_name}}</div>
			<div class='text_right'>
				<router-link to="/systemSettings/help-center">帮助中心</router-link>
				<router-link to="/systemSettings/msgList">系统消息<i v-if='noReadNums'></i></router-link>
				<a href="javascript:void(0)">关于我们</a>
				<a href="javascript:void(0)" @click="logout">退出</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { getSchoolInfo } from '@/const/course'
	import { delCookie, getCookie, isFullSite } from '@/const/my.ext';
	export default {
		data() {
			return {
				token : getCookie("token"),
				school_name : '',
				school_id : getCookie("school_id"),
				noReadNums : false
			}
		},
		created() {
			let _self = this;
			let _data = {
				token : _self.token,
				school_id : _self.school_id
			}
			getSchoolInfo(_data).then(response => {
				if(response.data.code == 0){
					_self.school_name = response.data.data.list.name;
					response.data.data.list.logo = isFullSite(response.data.data.list.logo);
					_self.$store.commit('updateSchoolInfo',response.data.data.list);
				}
			})
		},
		methods: {
			logout() {
				delCookie("school_id");
				delCookie("user_id");
				delCookie("token");
				delCookie("user_name");
				delCookie("school_name");
				delCookie("noReadNums");
				this.$router.push('/login')
			},
		}
	}
</script>

<style lang="scss">
	.thehead{
		width: 100%;
	    height: 36px;
	    background: #4597E0;
	    font-size: 14px;
	    .thehead_top{
    	    width: 1080px;
    		margin: 0 auto;
		    display: flex;
		    .text_left{
	    	    flex: 1;
			    line-height: 36px;
			    color: #fff;
		    }
		    .text_right{
	    	    line-height: 36px;
	    	    a{
    	    	    position: relative;
				    text-decoration: none;
				    color: #fff;
				    margin-left: 20px;
	    	    }
		    }
	    }
	}
</style>