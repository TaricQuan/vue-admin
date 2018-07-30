<template>
	<el-main class="content_cencent">
		<div class="const_ove">
           <h3>系统消息</h3>
            <ul>
                <li v-for="(item,index) in msg_list" @click="goDetial(item)" :key="item.id">
                    <span class="left">{{item.title}}</span>
                    <span class="right">{{item.updated_at}}</span>
                </li>
            </ul>
        </div>
	</el-main>
</template>

<script>
	import { getSysmsg, addReadCount } from '@/const/course'
	import { getCookie } from '@/const/my.ext'
	export default {
		name: 'msgList',
		data() {
			return {
				token : getCookie("token"),
				user_id : getCookie("user_id"),
				msg_list: []
			}
		},
        created () {
        	let _self = this;
        	let _data = {
        		token: _self.token,
        		push_port: 3
        	}
			getSysmsg(_data).then(respones => {
				if(respones.data.code == 0){
					_self.msg_list = respones.data.data.list;
				}
			})
        },
        methods:{
        	goDetial(item){
        		let _self = this;
        		let _data = {
        			token: _self.token,
        			tweet_id: item.id,
                    user_id: _self.user_id,
                    push_port: 3
        		}
        		addReadCount(_data).then(respones => {
        			if (item.type == 2) {
	                    location.href = item.link ? item.link : 'javascript:void(0)';
	                } else {
	                	_self.$router.push(`/systemSettings/msgDetail/${item.id}`)
	                }
        		})
        	}
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
			display: block;
    		padding: 20px 20px;
    		h3{
			    text-align: center;
			    padding-bottom: 20px;
			    border-bottom: 1px solid #DEE1E6;
    		}
    		ul{
    			display: block;
			    overflow: auto;
			    height: 600px;
			    margin-top: 10px;
			    &::-webkit-scrollbar {
					width: 6px;
					background-color: #F5F5F5;
				}
				&::-webkit-scrollbar-thumb {
					background-color: #999;
					-webkit-border-radius: 4px;
					border-radius: 4px;
				}
			    li{
			    	display: flex;
				    line-height: 40px;
				    height: 40px;
				    border-bottom: 1px dashed #cccccc;
			    	justify-content: space-between;
				    font-size: 15px;
				    color: #676A6C;
				    cursor: pointer;
			    }
    		}
		}
	}
</style>