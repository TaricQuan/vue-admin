<template lang="html">
	<div id="list_container">
		<div class='foldinglayer' @click='foldinglayer'></div>
		<div class="bottom_concent">
			<div class='modifythedepartment_model'>
				<div class="modi_left">
					<div class="chooseaperson_search" v-if="issearch">
						<input class="chooseaperson_input" type="text" v-model='sousuo' placeholder="请输入搜索的关键字">
						<a href="javascript:void(0)">搜索</a>
					</div>
					<ul class="tab_qiehuan">
						<li @click='taba(1)' v-if="leftData" :class="tab==1 ? 'onkm':''">部门</li>
						<li @click='taba(2)' v-if="rightData" :class="tab==2 ? 'onkm':''">班级</li>
					</ul>
					<div class="box_top" v-if="!sousuo">
						<div class="tab1 tabh" v-show="tab==1">
							<ul id="demo" class="demo01">
								<single-item class="item" v-for="(item,index) in applic" :model="item" :ispeople="ispeople" @push-model-data="pushModelData" @delete-model-data="deleteModelData" :issingle="issingle" :isparment="isparment" :key="item.id">
								</single-item>
							</ul>
						</div>
						<div class="tab1 tabh2" v-if="isgrade" v-show="tab==2">
							<div class="parentslist">
								<div class="membersoftheparents takeAll">全选<input type="checkbox" name="checkboxAll" class="chk_1 checkboxAll" @click.stop="takeAll($event)" /></div>
								<div class="membersoftheparents" v-for='(item,key) in classlist'>
									<div style="overflow:hidden;clear:both;">
										<span class="switch_text" @click.stop="toggle(item)">
						                    <i class="icon iconfont icon_tabel icon_tabel_02" v-if="item.open">&#xe673;</i>
						                    <i class="icon iconfont icon_tabel icon_tabel_01" v-else >&#xe61b;</i>
						                </span>
										<div class="parentsname" @click.stop="toggle(item)">
											<span>{{item.name}}</span>
										</div>
										<div class="wrap switch_input parentsname_right">
											<input type="checkbox" :id="'checkbox_b'+(item.id)" name="checkbox1" class="chk_1" :checked="item.ischecked" @click="clickGrade(item,$event)">
											<label for="checkbox_a1" :for="'checkbox_b'+(item.id)"></label>
										</div>
									</div>
									<ul v-if="item.open==true">
										<div class="membersoftheparents cl_box" v-for='(cl,key) in item.classes'>
											<div style="overflow:hidden;clear:both;">
												<div class="parentsname">
													<span>{{cl.name}}</span>
												</div>
												<div class="wrap switch_input parentsname_right">
													<input type="checkbox" :id="'checkbox_b'+(cl.id)" v-model="arentsarraya" name="checkbox1" class="chk_1" :value="cl">
													<label for="checkbox_a1" :for="'checkbox_b'+(cl.id)"></label>
												</div>
											</div>
										</div>
									</ul>
								</div>
							</div>
						</div>
						<div class="tab1 tabh2" v-else v-show="tab==2">
							<div class="parentslist">
								<div class="membersoftheparents takeAll">全选<input type="checkbox" name="checkboxAll" class="chk_1 checkboxAll" @click.stop="takeAll($event)" /></div>
								<div class="membersoftheparents" v-for='(cl,key) in classlist'>
									<div style="overflow:hidden;clear:both;">
										<div class="parentsname">
											<span>{{cl.name}}</span>
										</div>
										<div class="wrap switch_input parentsname_right">
											<input type="checkbox" :id="'checkbox_b'+(cl.id)" v-model="arentsarraya" name="checkbox1" class="chk_1" :value="cl">
											<label for="checkbox_a1" :for="'checkbox_b'+(cl.id)"></label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--搜索的内容列表-->
					<div class="search_box" v-if="sousuo && tab==1">
						<ul>
							<li v-for="(item,index) in leftFilterData" @click="inputname(item)">
								<img src="~myassets/img/wenjian.png" v-if='item.org_type == 1'>
								<img :src="item.headimg | errImg" v-else> {{item.label}}
							</li>
						</ul>
					</div>
					<div class="box_top" v-if="sousuo && tab==2">
						<div class="tabh2">
							<ul class="parentslist">
								<li class="membersoftheparents" v-for='(cl,key) in leftFilterData'>
									<div style="overflow:hidden;clear:both;">
										<div class="parentsname">
											<span>{{cl.name}}</span>
										</div>
										<div class="wrap switch_input parentsname_right">
											<input type="checkbox" :id="'checkbox_b'+(cl.id)" v-model="arentsarraya" name="checkbox1" class="chk_1" :value="cl">
											<label for="checkbox_a1" :for="'checkbox_b'+(cl.id)"></label>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="modi_right">
					<h3>已选择部门和成员：</h3>
					<div class="departmentbox" :class="{'istips':istips}">
						<div class="departmentlist" v-for='(mydepartment,key) in select_range'>
							<!-- 老师 -->
							<div class="departmentlist_left">
								<img src="~myassets/img/wenjian.png" v-if='mydepartment.org_type == 1'>
								<img :src="mydepartment.headimg | errImg" v-else>
								<span>{{mydepartment.label}}</span>
							</div>
							<div class="departmentlist_right">
								<i class="iconfont icon-guanbi" v-on:click="deletethecolumn(mydepartment)" style="background-color: #fff; font-size: 16px; color: #c4c8ce;"></i>
							</div>
						</div>
						<slot name="tips" v-if="istips"></slot>
						<div class="departmentlist" v-for='(myarentsarray,key) in arentsarraya'>
							<!-- 家长 -->
							<div class="departmentlist_left">
								<span>{{myarentsarray.name}}</span>
							</div>
							<div class="departmentlist_right">
								<i class="iconfont icon-guanbi" @click='deleteparents(myarentsarray)' style="background-color: #fff; font-size: 16px; color: #c4c8ce;"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="modi_bottom">
					<div class="modi_bottom_cengt">
						<a href="javascript:void(0)" class="bule" @click='confirm'>确定</a>
						<a href="javascript:void(0)" class="write" @click='cancel'>取消</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie,removalObj,getCookie } from "rootSrc/util/my.ext";
	import { jc_ajax } from "rootSrc/util/my.request";
	
	export default {
		components: {
			singleItem:resolve => {
      			require(["rootSrc/components/single-item"], resolve);
    		},
		},
		props: {
			leftData: { //是否有部门按钮
				type: Boolean,
				default: true
			},
			rightData: { //是否有班级按钮
				type: Boolean,
				default: true
			},
			issingle: {
				type: Boolean,
				default: false
			},
			isparment: {
				type: Boolean,
				default: false
			},
			issearch: { // 是否显示搜索框
				type: Boolean,
				default: true
			},
			istips: {
				type: Boolean,
				default: false
			},
			ispeople: { //是否显示部门里面的人
				type: Boolean,
				default: true
			},
			isgrade: { //班级选择是否有年级层
				type: Boolean,
				default: false
			},
			//  是否不能为空，true代表必须选择
			isnulljudgment: {
				type: Boolean,
				default: true
			},
			selectedData: [Object, Array], //接收已选数据
		},
		data() {
			return {
				tab: this.leftData ? 1 : 2,
				classlist: [],
				arentsarraya: [], //选中班级的数组
				departmenta: '',
				select_range: [], //选中部门的数组
				delem: [],
				depar: [],
				applic: [],
				sousuo: ''
			}
		},
		computed: {
			//已经选择数据
			selectedDatas: function() {
				if(this.selectedData) {
					return JSON.parse(JSON.stringify(this.selectedData));
				} else {
					return {
						class_array: [],
						partment_array: []
					};
				}
			},
			//判断左边两个筛选看是否存在数据
			isleftexist: function() {
				return !!this.applic.length
			},
			isrightexist: function() {
				return !!this.classlist.length
			},
			leftFilterData: function() {
				var arr = [],
					_self = this;
				//多重数组简化为一纬数组
				if(this.tab == 1) {
					function jisuan(obj) {
						_self.isparment && arr.push(obj);
						if(obj && obj.children && (obj.children && obj.children.length > 0)) {
							!_self.isparment && arr.push(obj);
							for(var j = 0; j < (obj.children && obj.children.length); j++) {
								arr.push(obj.children[j]);
								var objMid = obj.children[j];
								jisuan(objMid);
							}
						}
					}
					for(var key in this.applic) {
						if(this.applic.hasOwnProperty(key))
							jisuan(this.applic[key]);
					};
					//去重
					arr = removalObj(arr, "id");
					//过滤
					return arr.filter(function(item) {
						//根据搜索条件进行过滤
						if(_self.sousuo) {
							if(item.children && _self.isparment) {
								//如果部门不选则过滤掉
								return false;
							}
							return item.label && !!~item.label.indexOf(_self.sousuo)
						} else {
							return true
						}
					});
				} else {
					function jisuans(obj) {
						!obj.classes && arr.push(obj);
						if(obj.classes && obj.classes.length > 0) {
							for(var j = 0; j < obj.classes.length; j++) {
								arr.push(obj.classes[j]);
								var objMid = obj.classes[j];
								jisuans(objMid);
							}
						}
					}
					for(var key in this.classlist) {
						if(this.classlist.hasOwnProperty(key))
							jisuans(this.classlist[key]);
					};
					//去重
					arr = removalObj(arr, "id");
					//过滤
					return arr.filter(function(item) {
						//根据搜索条件进行过滤
						if(_self.sousuo) {
							return item.name && !!~item.name.indexOf(_self.sousuo)
						} else {
							return true
						}
					});
				}
			}
		},
		created: function() {
			var self = this;
			if(!self.isgrade) {
				self.assignment();
			}
			var _data = {};
			_data.token = getCookie('token');
			_data.school_id = getCookie('school_id');
			self.leftData && $.ajax({
				url: config.site_url + "/school/backend/department/get-organizational-all", //根据学校ID获取组织架构
				data: _data,
				type: "get",
				cache: false,
				dataType: "JSON",
				success: function(obj) {
					if(obj.code == 0) {
						self.applic.push(obj.list);
					}
				}
			});
			if(self.rightData) {
				!self.isgrade && $.ajax({
					url: config.site_url + "/school/backend/class/getclasslist",
					data: _data,
					type: "GET",
					cache: false,
					dataType: "JSON",
					success: function(obj) {
						if(obj.code == 0) {
							self.classlist = obj.data.list;
						}
					}
				});
				self.isgrade && jc_ajax({
					url: consts.GET_GRADE_CLASS_LIST,
					data: _data,
					type: "GET",
					cache: false,
					dataType: "JSON",
					success: function(obj) {
						if(obj.code == 0) {
							for(var i in obj.data.list) {
								if(obj.data.list[i].classes.length > 0) {
									obj.data.list[i].open = false;
									self.classlist.push(obj.data.list[i]);
								}
							}
							self.assignment();
						}
					}
				});
			}
		},
		filters: {
			errImg: function(src) {
				return src ? src : require('myassets/img/default_people.png');
			}
		},
		methods: {
			assignment: function() {
				if(this.selectedDatas.class_array && this.selectedDatas.class_array.length > 0) {
					this.arentsarraya = this.selectedDatas.class_array;
				}
				if(this.selectedDatas.partment_array && this.selectedDatas.partment_array.length > 0) {
					this.select_range = this.selectedDatas.partment_array;
				}
			},
			pushModelData: function(data) {
				if(this.issingle) {
					var arr = [];
					this.select_range.push(data)
					this.select_range[1] && arr.push(this.select_range.pop()) && (this.select_range = arr);
				} else {
					this.select_range.push(data);
					this.select_range = removalObj(this.select_range, "id");
				}
			},
			deleteModelData: function(data) {
				var length = this.select_range.length;
				for(var i = 0; i < length; i++) {
					if(this.select_range[i] == data) {
						this.select_range.splice(i, 1);
						return;
					}
				}
			},
			taba: function(val) {
				this.tab = val;
			},
			foldinglayer: function() {
				this.$emit("close-container"); //关闭弹窗
			},
			cancel: function() {
				this.$emit("close-container"); //关闭弹窗
			},
			//班级块删除
			deleteparents: function(index) {
				var length = this.arentsarraya.length;
				index.id && $("#checkbox_b" + index.id).removeAttr("checked");
				for(var i = 0; i < length; i++) {
					if(this.arentsarraya[i] == index) {
						this.arentsarraya[i].hasAdd = false; //设置可以再次添加
						this.arentsarraya.splice(i, 1);
						return;
					}
				}
			},
			//部门块删除
			deletethecolumn: function(index) {
				var length = this.select_range.length;
				for(var i = 0; i < length; i++) {
					if(this.select_range[i] == index) {
						this.select_range[i].hasAdd = false; //设置可以再次添加
						this.select_range.splice(i, 1);
						return;
					}
				}
			},
			//搜索点击事件，根据条件进行筛选过滤
			inputname: function(model) {
				if(!model.hasAdd) {
					//如果是部门不可选则返回
					if (this.isparment && model.org_type == 1) {
	                    return;
	                }
					this.pushModelData(model);
					!this.issingle && (model.hasAdd = true); //设置不可以再次添加
				}
			},
			confirm: function() {
				if(this.isnulljudgment) {
					if(!this.select_range[0] && !this.arentsarraya[0]) {
						alert("您还没有选择对应的部门或者班级！");
						return;
					}
				}
				this.$emit("choose-data", {
					"partment_array": this.select_range,
					"class_array": this.arentsarraya
				});
				this.$emit("close-container"); //关闭弹窗
			},
			takeAll: function(e) {
				//全选，反选班级
				var _this = e.target,
					_self = this;
				if(!_this.checked) { //实现反选
					_self.arentsarraya = [];
				} else { //实现全选
					_self.arentsarraya = [];
					if(_self.isgrade) {
						_self.classlist.forEach(function(item) {
							if(item.classes) {
								item.classes.forEach(function(val) {
									_self.arentsarraya.push(val);
								})
							}
						});
					} else {
						_self.classlist.forEach(function(item) {
							_self.arentsarraya.push(item);
						});
					}
				}
			},
			clickGrade: function(item, e) {
				if(e.target.checked) {
					for(var n in item.classes) {
						if(!this.in_array(this.arentsarraya, item.classes[n])) {
							this.arentsarraya.push(item.classes[n]);
						}
					}
				} else {
					for(var n in item.classes) {
						this.arrRemove(this.arentsarraya, item.classes[n]);
					}
				}
			},
			//班级点击事件冒泡
			//      clickClass:function(e){
			//      	var target = e.target || e.srcElement,length = $(target).parents(".cl_box").siblings().size()+1,
			//      	checkedLength = $(target).parents("ul").find("input[type=checkbox]:checked").size();
			//      	var nowGradeInput = $(target).parents("ul").siblings("div").find("input[type=checkbox]")[0]; //当前年级元素的input
			//      	//则不是全选
			//      	console.log(checkedLength,length);
			//      	if(checkedLength !== length){
			//      		nowGradeInput.checked = false;
			//      	}else{
			//      	//则是全选
			//      		nowGradeInput.checked = true;
			//      	}
			//      },
			in_array: function(arr, element) {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].id == element.id) {
						return true;
					}
				}
				return false;
			},
			arrRemove: function(arr, val) {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].id == val.id) {
						arr.splice(i, 1);
						return;
					}
				}
			},
			toggle: function(item) {
				item.open = !item.open
			},
		},
		watch: {
			"arentsarraya": function() {
				if(!this.isgrade) { //如果没有年级则不监听
					return;
				}
				for(var n in this.classlist) {
					var arr = [];
					for(var i in this.arentsarraya) {
						if(this.arentsarraya[i].grade_id == this.classlist[n].id) {
							arr.push(this.arentsarraya[i]);
						}
					}
					if(this.classlist[n].classes.length == arr.length) {
						this.$set(this.classlist[n], 'ischecked', true);
					} else {
						this.$set(this.classlist[n], 'ischecked', false);
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 4px;
}
.modifythedepartment_model {
    width: 600px;
    height: 480px;
    background-color: #fff;
    border-radius: 5px;
    .modi_left {
        width: 350px;
        height: 400px;
        border: 1px solid #E7EAEC;
        float: left;
        .chooseaperson_search {
            padding: 12px;
            border-bottom: 1px solid #E7EAEC;
            input {
                width: 238px;
                height: 30px;
                border: 1px solid #DEE1E6;
                margin-right: 5px;
                padding-left: 10px;
            }
            a {
                background: #4597E0;
                border: 1px solid #4597E0;
                border-radius: 3px;
                display: inline-block;
                width: 56px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 13px;
                color: #FFFFFF;
            }
        }
        .tab_qiehuan {
            display: flex;
            width: 322px;
            height: 30px;
            border: 1px solid #4597E0;
            border-radius: 4px;
            margin: 0 auto;
            margin-top: 15px;
            li {
                flex: 1;
                float: left;
                width: 161px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                cursor: pointer;
                &.onkm {
                    background: #4597E0;
                    color: #fff;
                }
            }
        }
        .box_top {
            height: 270px;
            overflow-y: auto;
            padding: 5px 5px;
            .tabh {
                height: 270px;
                overflow-y: overlay;
                padding-right: 10px;
                .demo01 {
                    padding-left: 1em;
                    line-height: 1.5em;
                    .item {
                        cursor: pointer;
                        overflow: hidden;
                        clear: both;
                        line-height: 28px;
                        .bold {
                            padding: 10px;
                            display: inline;
                            .switch_text {
                                float: left;
                                position: relative;
                                .icon_tabel_01 {
                                    color: #C4C8CE;
                                    position: relative;
                                    top: 2px;
                                }
                                .icon_tabel_02 {
                                    color: #C4C8CE;
                                    font-size: 20px;
                                    position: relative;
                                    top: -1px;
                                }
                            }
                        }
                        .switch_name {
                            float: left;
                            font-size: 12px;
                            color: #676A6C;
                            position: relative;
                            img {
                                width: 16px;
                                height: 16px;
                                position: relative;
                                top: 3px;
                            }
                        }
                    }
                }
            }
            .tabh2 {
                .parentslist {
                    overflow: hidden;
                    .membersoftheparents {
                        overflow: hidden;
                        padding-left: 1em;
                        margin-bottom: 5px;
                        &.takeAll {
                            text-align: right;
                            cursor: pointer;
                            .checkboxAll {
                                background-color: #FFF;
                                border: 1px solid #DEE1E6;
                                border-radius: 2px;
                                vertical-align: sub;
                                margin-left: 10px;
                                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
                                width: 17px;
                                height: 17px;
                                display: inline-block;
                                position: relative;
                                margin-right: 15px;
                                margin-top: 2px;
                            }
                        }
                        .switch_text{
                            cursor: pointer;
                            float: left;
                            position: relative;
                            .icon_tabel_01{
                                color: #C4C8CE;
                                position: relative;
                                top: 2px;
                            }
                            .icon_tabel_02{
                                color: #C4C8CE;
                                font-size: 20px;
                                position: relative;
                                top: -1px;
                            }
                        }
                        .parentsname {
                            float: left;
                            font-size: 12px;
                            color: #676A6C;
                            line-height: 20px;
                            position: relative;
                            cursor: pointer;
                        }
                        .parentsname_right {
                            float: right;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
        .search_box{
            height: 270px;
            overflow-y: scroll;
            border-radius: 4px;
            margin: 0 auto;
            margin-top: 15px;
            ul{
                padding-left: 20px;
                overflow: hidden;
                li{
                    cursor: pointer;
                    overflow: hidden;
                    clear: both;
                    font-size: 12px;
                    color: #676A6C;
                    line-height: 28px;
                    height: 28px;
                    img{
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
    .modi_right {
        position: relative;
        float: left;
        height: 380px;
        border-bottom: 1px solid #E7EAEC;
        padding: 10px;
        width: 228px;
        h3 {
            font-size: 13px;
            color: #999999;
            font-weight: normal;
        }
        .departmentbox {
            overflow-y: scroll;
            height: 370px;
            .istips {
                height: 233px;
                position: absolute;
                bottom: 20px;
                left: 0;
                padding: 0 10px;
                p {
                    margin-bottom: 10px;
                    color: #fb1717;
                    font-size: 16px;
                }
            }
        }
        .departmentlist {
            padding: 6px 0px 6px 0px;
            overflow: hidden;
            img {
                width: 16px;
                height: 16px;
            }
            .departmentlist_left {
                float: left;
                font-size: 12px;
                color: #676A6C;
                position: relative;
                img {
                    position: relative;
                    top: 3px;
                }
            }
            .departmentlist_right {
                overflow: hidden;
                line-height: 16px;
                float: right;
                margin-right: 10px;
                cursor: pointer;
                i {
                    width: 16px;
                    height: 16px;
                    background: #BFC8D0;
                    border-radius: 50%;
                    display: inline-block;
                    font-style: normal;
                    font-size: 6px;
                    color: #fff;
                    text-align: center;
                    line-height: 16px;
                }
            }
        }
    }
    .modi_bottom {
        text-align: center;
        overflow: hidden;
        clear: both;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        .modi_bottom_cengt {
            text-align: center;
            overflow: hidden;
            clear: both;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            .bule {
                background: #4597E0;
                border-radius: 4px;
            }
            a {
                width: 110px;
                height: 36px;
                border-radius: 4px;
                display: inline-block;
                text-align: center;
                line-height: 36px;
                color: #fff;
                margin-right: 15px;
            }
            .write {
                background: #9FB1C0;
                border-radius: 4px;
            }
        }
    }
}
</style>