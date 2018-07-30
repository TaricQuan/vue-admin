<template lang="html">
	<div class="navigation">
		<div class="navigation_cenent">
			<ul>
				<li v-show='user_info.is_superuser==1 || (user_info.permissions && user_info.permissions["admin.home"])'>
					<router-link to="/home" exact>首页</router-link>
				</li>
				<li v-show='user_info.is_superuser==1 || (user_info.permissions && user_info.permissions["admin.schoolinfo"])'>
					<router-link to="/school_info">学校信息</router-link>
				</li>
				<li :class="navIndex=='3' ? 'on':''">
					<router-link to="/application">功能应用</router-link>
				</li>
				<li v-show='user_info.is_superuser==1 || (user_info.permissions && user_info.permissions["admin.datastatistics"])'>
					<router-link to="/dataStatistics">数据统计</router-link>
				</li>
				<li v-show='user_info.is_superuser==1' :class="navIndex=='5' ? 'on':''">
					<router-link to="/systemSettings">系统设置</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { getUserInfo } from '@/const/course'
	import { getCookie } from "@/const/my.ext";
	export default {
		props: {
		    navIndex: {//导航当前位置
	            type: String,
	            default: '1'
	        }, 
		},
		data() {
			return {
				user_info:{}
			}
		},
		created:function(){
			this.getNav();
		},
		methods: {
			getNav:function(){
				let _self = this;
				let _data = {
					token : getCookie("token"),
        			user_id : getCookie("user_id"),
				};
				getUserInfo(_data).then(response => {
					if(response.data.code == 0){
						_self.user_info = response.data.data.list[0];
						_self.$store.commit('updateUserInfo',_self.user_info);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.navigation{
	    height: 74px;
    	background-color: #fff;
    	.navigation_cenent{
		    margin: 0 auto;
			width: 1080px;
			ul{
				display: flex;
				li{
					flex: 1;
				    text-align: center;
				    line-height: 70px;
				    font-size: 18px;
				    a{
			    	    text-decoration: none;
						color: #4597E0;
						cursor: pointer;
						&.router-link-active{
							border-bottom: 4px solid #4597E0;
							display: block;
						}
				    }
				}
			}
    	}
	}
</style>