<template>
	<el-main class="content_cencent">
		<div class="const_ove">
           	<h2><ui-btn><span slot="content">返回</span></ui-btn></h2>
        	<div class="main">
        		<h3>{{msg_detail.title}}</h3>
        		<span class="time">{{msg_detail.updated_at}}</span>
        		<p v-html="msg_detail.detail"></p>
        	</div>
        </div>
	</el-main>
</template>

<script>
	import { getSysmsgDetail } from '@/const/course'
	import { getCookie, GetQueryString } from '@/const/my.ext'
	import uiBtn from '@/components/ui-btn'
	export default {
		name: 'msgDetail',
		components:{
			uiBtn
		},
		data() {
			return {
				token: getCookie('token'),
				msg_detail: {}
			}
		},
        created () {
        	let _self = this;
        	let _data = {
        		token: _self.token,
        		tweet_id: _self.$route.params.id,
        	}
			getSysmsgDetail(_data).then(respones => {
				if(respones.data.code == 0){
					_self.msg_detail = respones.data.data.list;
				}
			})
        }
	}
</script>

<style lang="scss" scoped>
	.content_cencent{
	    width: 1080px;
		margin: 25px auto 0;
	    border: 1px solid #DEE1E6;
	    box-shadow: 0 1px 8px 0 rgba(46, 59, 79, 0.10);
	    background: #FFFFFF;
		height: 730px;
		padding: 0;
		.const_ove{
			padding: 20px;
			h2{
				padding-bottom: 20px;
	    		border-bottom: 1px solid #DEE1E6;
			}
			.main{
				h3{
					font-size: 18px;
				    overflow: hidden;
				    margin-top: 15px;
				    color: #333333;
				}
				.time{
					display: inline-block;
				    margin: 10px 0;
				    font-size: 12px;
				    color: #999999;
				}
				p{
					font-size: 14px;
				    color: #333333;
				    line-height: 25px;
				}
			}
		}
	}
</style>