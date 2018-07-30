<template>
	<el-main class="content_cencent">
		<div class="header">
			<span>微智校园学校后台帮助中心</span>
		</div>
		<div class="table">
			<ul class="colunmes" v-if="hasData">
				<li v-for="item in datasource"><span>{{item.column_name}}</span>
					<ul class="rows">
						<li v-for="row in item.content">
							<a :href="row.link" target="_blank">{{row.title}}</a>
						</li>
					</ul>
				</li>
			</ul>
			<div v-else class="no-data">
				<img src="@/assets/images/nosystans.png">
				<span>暂无信息</span>
			</div>
		</div>
		<a class="jump-to-link" title="点击查看" href="https://mp.weixin.qq.com/s?__biz=MzAxMzYzNzk1NA==&mid=506199198&idx=6&sn=5163a29fedd2f14fda8b641b9ff5ba80&scene=19#wechat_redirect" target="_blank">
			<i class="iconfont icon-dankuangjingshi"></i>管理员在微智校园可以做什么？</a>
	</el-main>
</template>

<script>
	import { getColumn } from '@/const/course'
	import { getCookie } from '@/const/my.ext';
	export default {
		name: 'home',
		data() {
			return {
				token: getCookie("token"),
				user_id: getCookie("user_id"),
				hasData: true,
				datasource: [],
			}
		},
		created() {
			let _self = this;
			let _data = {
				token: _self.token,
				platform: '3' //学校后台
			};
			getColumn(_data).then(respones => {
				if(respones.data.code == 0) {
					let arr = [];
					for(let i in respones.data.data.list) {
						for(let j in respones.data.data.list[i].content) {
							let link = respones.data.data.list[i].content[j].link;
							if(link.substring(0, 4) != "http") {
								respones.data.data.list[i].content[j].link = "http://" + link;
							}
						}
						if(respones.data.data.list[i].is_hide != 1) {
							arr.push(respones.data.data.list[i]);
						}
					}
					_self.datasource = arr;
					_self.hasData = _self.datasource.length > 0 ? true : false;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content_cencent {
		width: 1080px;
		margin: 25px auto 0;
		border: 1px solid #DEE1E6;
		box-shadow: 0 1px 8px 0 rgba(46, 59, 79, 0.10);
		background: #FFFFFF;
		height: 730px;
		padding: 0;
		.header{
		    background-color: #FFFFFF;
		    height: 76px;
		    position: relative;
			span{
				position: absolute;
			    font-weight: bold;
			    left: 20px;
			    right: 20px;
			    text-align: center;
			    font-size: 18px;
			    color: #333333;
			    line-height: 76px;
			    border-bottom: 1px solid #CCCCCC;
			}
		}
		.table{
			width: 100%;
		    height: 550px;
		    background-color: #FFFFFF;
		    padding-top: 20px;
		    padding-bottom: 20px;
		    overflow: auto;
		    .colunmes{
		    	display: flex;
		    	flex-direction: row;
		    	li{
	    		    width: 33.3%;
				    padding-left: 60px;
				    padding-right: 60px;
				    box-sizing: border-box;
				    span{
				    	display: inline-block;
					    font-size: 18px;
					    font-weight: bold;
					    color: #333333;
					    line-height: 48px;
					    overflow: hidden;
					    -o-text-overflow: ellipsis;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    width: 100%;
				    }
				    .rows{
				    	li{
			    		    width: 100%;
						    padding: 0px;
						    margin-top: 5px;
				    	}
				    	a{
						    width: 100%;
						    font-size: 14px;
						    margin-bottom: 10px;
						    line-height: 18px;
						    display: block;
						    overflow: hidden;
					    }
				    }
		    	}
		    }
		    .no-data{
	    	    width: 100%;
    			text-align: center;
    			img{
    				width: 70px;
				    margin-top: 70px;
				    margin-bottom: 10px;
    			}
    			span{
    				display: block;
				    font-size: 14px;
				    line-height: 18px;
				    color: #808286;
    			}
		    }
		}
		.jump-to-link{
			display: flex;
		    justify-content: center;
		    color: #576B95;
		    font-size: 14px;
		    line-height: 14px;
		    width: 100%;
		    margin: 0px auto 30px auto;
		    i{
	    	    color: #97AAD0;
    			margin-right: 5px;
		    }
		}
	}
</style>