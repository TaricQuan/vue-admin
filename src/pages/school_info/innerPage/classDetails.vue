<template>
	<div class="box">
		<div class="returns">
			<ui-btn><span slot="content">返回</span></ui-btn>
			<div class='retucent_telte'>
				<h3>班级详情</h3>
			</div>
		</div>
		<div class="content">
			<div class="content-box">
				<div class="content-box_t">
					<div class="left">
						<div class="tit"><p>基本信息</p></div>
						<div class="text">
							<ul class="classInfo">
								<li>
									<span class="ione">年级</span> 
									<span class="itwo">{{gradei.grade.name}}</span>
								</li>
								<li>
									<span class="ione">班主任</span> 
									<span class="itwo">{{gradei.master.nickname}}</span>
								</li>
								<li>
									<span class="ione">班级名称</span> 
									<span class="itwo">{{gradei.name}}</span>
								</li>
								<li>
									<span class="ione">班级码</span> 
									<span class="itwo">{{gradei.code}}</span>
								</li>
								<li>
									<span class="ione">场所</span> 
									<span class="itwo"></span>
								</li>
								<li>
									<span class="ione">班牌序号</span> 
									<span class="itwo"></span>
								</li>
							</ul>
						</div>
					</div>
					<div class="right">
						<div class="tit"><p>班级学生家长</p><router-link class="checkthelist" to="/school_info/classManagement/parentList">查看学生家长列表></router-link></div>
						<div class="text">
							<div class="statistical">
								<div class="numberofstudents"><dl><dt>加入学生数</dt> <dd><span>5</span>人</dd></dl></div>
								<div class="numberofstudents"><dl><dt>加入家长数</dt> <dd><span>1</span>人</dd></dl></div>
							</div>
						</div>
					</div>
				</div>
				<div class="content-box_b">
					<div class="tit"><p>任课老师</p><router-link class="checkthelist" to="/school_info/classManagement/addTeacher">增加任课老师></router-link></div>
					<div class="text">
						<ul class="teacherList">
							<li v-for="item in teacherList">
								<div class="teacherList-text">
									<span class="name">{{item.realname}}</span>
									<span class="phone">{{item.phone}}</span>
									<span class="subject">{{item.subjects[0] ? item.subjects[0].name:''}}</span>
								</div>
								<div class="teacherList-btn">
									<i class="iconfont icon-shanchu"></i>
									<span class="delete">删除</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getClassInfo, getClassTeacher } from '@/const/course'
	import { getCookie } from '@/const/my.ext'
	import uiBtn from '@/components/ui-btn'
	export default {
		name: 'classDetails',
		components:{
			uiBtn
		},
		data() {
			return {
				token: getCookie("token"),
				user_id: getCookie("user_id"),
				school_id: getCookie("school_id"),
				class_id: this.$route.params.id,
				gradei: {
					grade:{},
					master:{}
				},
				renk: '',
				codeid: '',
				teacherList:[]
				
			}
		},
		created() {
			let _self = this;
			let _data = {
				token: _self.token,
				class_id: _self.class_id
			}
			let mayk = [];
			getClassInfo(_data).then(respones =>{
				if(respones.data.code == 0){
					_self.gradei = respones.data.list[0];
					respones.data.list[0].master && mayk.push(respones.data.list[0].master)
					if(respones.data.list[0].master) {
						_self.renk = respones.data.list[0].master.realname;
					} else {
						_self.renk = '无';
					}
					_self.codeid = respones.data.list[0].code;
				}
			})
			getClassTeacher(_data).then(respones =>{
				if(respones.data.code == 0){
					_self.teacherList = respones.data.list;
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 35px;
		height: 728px;
		box-sizing: border-box;
		.returns{
			display: flex;
			position: relative;
		    border-bottom: 1px solid #F7F9FB;
		    padding-bottom: 10px;
		    .ui-btn{
		    	position: absolute;
		    	top: 0;
		    	left: 0;
		    }
		    .retucent_telte{
	    	    text-align: center;
    			width: 100%;
    			h3{
    				font-size: 18px;
				    color: #333333;
				    font-family: "microsoft yahei";
				    font-weight: normal;
				    line-height: 30px;
				    height: 30px;
    			}
		    }
		}
		.content{
		    margin-top: 30px;
		    padding: 0 15px;
			.content-box{
				width: 700px;
    			margin: 0 auto;
				.content-box_t{
					display: flex;
					.left{
						width: 200px;
    					margin-right: 35px;
					}
					.right{
						flex: 1;
					}
				}
				.content-box_b{
				    margin-top: 50px;
				}
				.tit{
				    background: #F7F9FB;
			        display: flex;
			        line-height: 36px;
			        height: 36px;
			        width: 100%;
			        padding: 0 15px;
			        box-sizing: border-box;
			        p{
			        	font-size: 14px;
    					color: #676A6C;
			        	flex: 1;
			        }
			        .checkthelist{
		        	    font-size: 12px;
    					color: #4872A0;
			        }
				}
				.text{
					padding: 0 10px;
					.classInfo{
						li{
							line-height: 32px;
							.ione {
							    width: 80px;
							    display: inline-block;
							    font-size: 12px;
							    color: #999999;
							}
							.itwo{
								display: inline-block;
							    font-size: 12px;
    							color: #333333;
							}
						}
					}
					.statistical{
					    display: flex;
					    padding-left: 15px;
					    margin-top: 30px;
					    .numberofstudents{
					    	flex: 1;
					    	dl{
					    		dt{
					    			font-size: 12px;
								    color: #999999;
								    margin-bottom: 5px;
					    		}
					    		dd{
					    			color: #4597E0;
					    			span{
					    				font-size: 36px;
					    			}
					    		}
					    	}
					    }
					}
					.teacherList{
					    margin-top: 15px;
						height: 280px;
    					overflow-y: auto;
						li{
						    line-height: 42px;
						    padding:0 10px;
						    display: flex;
						    .teacherList-text{
						    	flex:1;
						    	.name{
					    		    font-size: 12px;
    								color: #333333;
    								margin-right: 15px;
						    	}
						    	.phone{
						    		font-size: 12px;
								    color: #333333;
								    margin-right: 35px;
						    	}
						    	.subject{
						    		font-size: 12px;
    								color: #999999;
						    	}
						    }
						    .teacherList-btn{
						    	cursor: pointer;
						    	display: none;
						    	width: 80px;
						    	color: #9FADC7;
						    	text-align: center;
						    	.delete{
					    		    font-size: 12px;
						    	}
						    }
						    &:hover{
					    	    background: #F7F9FB;
					    	    .teacherList-btn{
					    	    	display: block;
					    	    }
						    }
						}
					}
				}
			}
		}
	}
</style>