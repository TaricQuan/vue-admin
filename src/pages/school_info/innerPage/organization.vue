<template>
	<div class="box">
		<el-row>
			<el-col :span="6" class="organizational">
				<div class="tit">所有部门</div>
	            <ul id="demo">
	                <li ref="demo_parent">
	                    <ui-item class="item" :model="department_list" :isActive="isActive" :openaId="openaId" @upActive="upActive" @upopenaId="upopenaId"></ui-item>
	                </li>
	            </ul>
			</el-col>
			<el-col :span="18">
				<div class='content-box'>
                    <div class='box_header'>
                        <div class='departmentofdisplay'>
                            <h3 id="dep_title">{{cuDepartmentName}}</h3>
                        </div>
                        <div class='box_right box_left '>
                            <input type="text" class="searchsupervisor" placeholder="搜索教师姓名或手机号" v-model='searchUser'>
                            <button type="button" @click='searchtheuser'>搜索</button>
                        </div>

                        <div class="box_right">
                            <a class="new" href="#">新增</a>
                            <a href="javascript:void(0);" class="delete" @click='deleteBtn'>删除</a>
                        </div>
                    </div>
                    <div class="icontent">
                    	<el-table ref="multipleTable" :data="department_users" tooltip-effect="dark" :max-height="540" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="25"></el-table-column>
							<el-table-column prop="realname" label="姓名"></el-table-column>
							<el-table-column prop="gender" label="性别" width="50">
								<template slot-scope="scope">
									<span>{{scope.row.gender==1 ? "男" : "女"}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="privilege" label="职务">
								<template slot-scope="scope">
									<span>{{scope.row.privilege ? scope.row.privilege : ""}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="phone" label="手机号码" width="112"></el-table-column>
							<el-table-column prop="is_bind" label="是否绑定">
								<template slot-scope="scope">
									<span v-if="scope.row.is_bind" class="standardtime">已绑定</span>
                                    <span v-else>未绑定</span>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<router-link to="/systemSettings/help-center">修改</router-link>
								</template>
							</el-table-column>
						</el-table>
                    </div>
                    <div class="pagesa">
                        <span v-if='!isReadAll'>加载中...</span>
                        <span v-else-if='isReadAll'>已经到底啦～～</span>
                        <span class="numberof">总共{{alistofusers}}条</span>
                    </div>
                </div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { getSchoolDepartment, getDepartmentUserList } from "@/const/course"
	import { getCookie } from '@/const/my.ext'
	import uiItem from '@/components/ui-item'
	export default{
		name:"organization",
		components:{
			uiItem
		},
		data() {
			return {
				token: getCookie("token"),
				school_id: getCookie("school_id"),
				department_list:{},
				isReadAll:false,
				isActive:0,
				openaId:0,
				alistofusers:0,
				department_users:[],
				cuDepartmentName:'',
				searchUser:'',
				checkedNames:'',
				page:1,
				pageSize:20,
			}
		},
		created(){
			let _self = this;
			let _data = {
				token: _self.token,
	            school_id: _self.school_id,
	            format_type: 1
			}
			getSchoolDepartment(_data).then(respones =>{
				if(respones.data.code == 0){
					respones.data.list[0]['departtment'] = respones.data.list[0].id;
                    if (respones.data.list[0]) {
                        respones.data.list[0] && (respones.data.list[0].tab = 0);
                        _self.department_list = respones.data.list[0];
                        _self.isActive = _self.department_list.id;
                        _self.cuDepartmentName = _self.department_list.label;
                        _self.getUserList();
                        //重构数据，加上层级标签
                        var length = _self.department_list && _self.department_list.children && _self.department_list.children.length;
                        for (var i = 0; i < length; i++) {
                            _self.jisuan(_self.department_list.children[i], 1);
                        }
                    }
				}
			})
		},
		methods:{
			jisuan(obj, i) {
                obj.indexNum = i;
                if (obj && obj.children && (obj.children && obj.children.length > 0)) {
                    for (var j = 0; j < (obj.children && obj.children.length); j++) {
                        obj.children[j].indexNum = i + 1;
                        var objMid = obj.children[j];
                        this.jisuan(objMid, i + 1);
                    }
                }
            },
            getUserList(){
            	let _self = this;
            	let _data = {
            		token: _self.token,
            		school_id:_self.school_id,
					department_id:_self.isActive,
					type:1,
					page:_self.page,
					pagesize:_self.pageSize
            	}
            	getDepartmentUserList(_data).then(respones => {
            		if(respones.data.code == 0){
            			_self.department_users.push.apply(_self.department_users, respones.data.list);
            			_self.alistofusers = respones.data.count;
            			_self.isLoad();
            		}
            	})
            },
            isLoad(){
            	if (this.department_users.length >= this.alistofusers) {
                    this.isReadAll = true;
                } else {
                    this.isReadAll = false;
                    this.page++
                }
            },
            sena() {
            	
            },
            handleSelectionChange(){
            	
            },
            searchtheuser() {
            	
            },
            deleteBtn() {
            	
            },
            upActive(id) {
            	this.isActive = id;
            	this.page = 1;
            	this.department_users = [];
            	this.getUserList();
            },
            upopenaId(id) {
            	this.openaId = id;
            }
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		height: 728px;
		box-sizing: border-box;
		.organizational{
		    border-right: 1px solid #DEE1E6;
		    padding-top: 20px;
		    overflow: hidden;
		    .tit{
	    	    padding-left: 10px;
	    	    background: #F7F9FB;
    	        line-height: 44px;
	            height: 44px;
                font-size: 12px;
		    	color: #676A6C;
		    	font-weight: bold;
		    }
		    #demo {
		    	overflow: auto;
			    height: 664px;
			}
		}
		.content-box{
		    padding: 35px;
    		height: 728px;
    		box-sizing: border-box;
    		.box_header{
			    display: flex;
			    margin-bottom: 10px;
			    .departmentofdisplay{
			    	h3{
			    		width: 120px;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    overflow: hidden;
				        font-size: 14px;
					    color: #676A6C;
					    margin-right: 10px;
					    line-height: 32px;
			    	}
			    }
			    .box_left{
		    	    font-size: 14px;
				    color: #676A6C;
				    flex: 1;
				    input{
				    	width: 170px;
			    	    height: 30px;
    					border: 1px solid #DEE1E6;
					    padding-left: 10px;
				    }
				    button{
				    	width: 56px;
					    height: 32px;
					    line-height: 32px;
					    text-align: center;
					    font-size: 13px;
					    color: #FFFFFF;
					    background: #4597E0;
					    border: 1px solid #4597E0;
					    border-radius: 3px;
					    text-decoration: none;
					    cursor: pointer;
				    }
			    }
			    .box_right{
			    	a{
		    		    background: #4597E0;
					    border: 1px solid #4597E0;
					    border-radius: 3px;
					    display: inline-block;
					    color: #fff;
					    width: 84px;
					    height: 30px;
					    text-align: center;
					    line-height: 30px;
			    	}
			    }
    		}
    		.pagesa{
    			margin-top: 20px;
			    position: relative;
    			text-align: center;
    			line-height: 21px;
    			span {
				    font-size: 12px;
				}
				.numberof {
				    position: absolute;
				    right: 0;
				}
    		}
		}
	}
</style>
<style type="text/css">
	.el-table .cell {
		padding: 0 5px;
		font-size: 12px;
		line-height: 36px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.el-table .cell .standardtime{
		color: #FF5500;
	}
	.el-table td,
	.el-table th {
		padding: 0;
	}
	
	.el-table th {
		background: #F7F9FB;
	}
	
	.el-input__inner {
		height: 30px;
		line-height: 30px;
	}
	.el-table__body-wrapper::-webkit-scrollbar {
		width: 6px;
		background-color: #F5F5F5;
	}
	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		background-color: #999;
		-webkit-border-radius: 4px;
		border-radius: 4px;
	}
</style>