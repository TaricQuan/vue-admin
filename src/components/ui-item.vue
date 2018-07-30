<template>
	<li>
        <div class="bold" @dblclick="changeType" @click='toggle(model)' :class="$attrs.isActive == model.id ? 'active':''"
            :style="{'padding-left':getPxForIndex(model.indexNum, isFolder)}">
            <span class="mode">
                <span v-if="isFolder" @click.stop='switchtab'>
                    <i class="icon iconfont icon_02" v-if='!open'>&#xe61b;</i>
                    <i class="icon iconfont icon_03" v-else>&#xe673;</i>
                </span>
                <span>
                    <img src="@/assets/images/wenjian.png" class="folder">
                    {{model.label}}
                </span>
            </span>
            <span style="border-bottom: none; padding:0px;" class="ul_parent">
                <span @click.stop='addanddelete($event,model)'>
                    <i class="icon iconfont">&#xe679;</i>
                </span>
                <ul :class="model.tab == 0 ? 'anddelet' : 'anddelete' " v-if='opena' id="con">
                    <li @click='add(model.id)'>{{model.add}}</li>
                    <li @click='rename(model.id,model.label)' v-if='model.tab != 0'>{{model.rename}}</li>
                    <li @click='deletea(model.id,model.label)' v-if='model.tab != 0'>{{model.delete}}</li>
                    <li @click='moveup(model)' v-if='model.tab != 0'>{{model.moveup}}</li>
                    <li @click='movedown(model)' v-if='model.tab != 0'>{{model.movedown}}</li>
                </ul>
            </span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <ui-item class="item itembottom" v-for="(model,index) in model.children" :key="index" :model="model" v-bind="$attrs" v-on="$listeners" :pdl="true"></ui-item>
        </ul>
    </li>
</template>

<script>
	export default{
		name: "uiItem",
		props: {
            model: Object,
        },
        inheritAttrs: false,
		data(){
			return {
                open: false,
                opena: false,
                counter: 0,
                dep_id: '',
                clickCount: 0,
                nums: 0
            }
		},
		created () {
            let _self = this;
        },
        mounted () {
        	let _self = this;
        },
        updated () {
            let _self = this;
            if(this.$attrs.openaId != this.model.id){
            	this.opena = false;
            }
        },
		computed: {
            isFolder: function () {
                return (this.model.children && this.model.children.length) || (this.model.indexNum == 0);
            }
        },
        methods: {
            toggle: function (department) {
            	this.$attrs.isActive = department.id;
            	this.$emit('upActive',department.id);
            },
            addanddelete: function (e, model) {
            	this.$emit('upopenaId',model.id);
                if (this.model.tab == 0) {
                    this.model['add'] = '添加部门';
                } else {
                    this.model['add'] = '添加部门';
                    this.model['rename'] = '重命名';
                    this.model['delete'] = '删除';
                    this.model['moveup'] = '上移';
                    this.model['movedown'] = '下移';
                }
                this.opena = !this.opena;
                this.$nextTick(function () {
                    let con = e.target.parentNode.parentNode.lastChild;
                    if(con.html){
                    	let _height = con.offsetHeight;
	                    if ((window.innerHeight - e.pageY) < _height) {
	                    	con.style.top = e.pageY - _height;
	                    	con.style.left = e.pageX;
	                    } else {
	                    	con.style.top = e.pageY + 10;
	                    	con.style.left = e.pageX;
	                    }
                    }
                })
            },
            switchtab: function (e) {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            add: function (id) {

//              vm.nameid = id;
//              vm.department = true;
//              this.opena = false;
//              vm.is_add_department = true;

            },
            rename: function (id, name) {
//              vm.mynameid = id;
//              vm.renameid = name;
//              this.opena = false;
//              vm.renamea = true;
//              this.$nextTick(function () {
//                  name && (vm.$refs.partmentName.textContent = name + "-重命名");
//              })
            },
            deletea: function (id, name) {
//              vm.departmentid = id;
//              this.opena = false;
//              vm.departmena = true;
//              vm.removeDepartmentName = name;
            },
            moveup: function (model) {
//              let _data = {};
//              let self = this;
//              let json = {};
//              let joson = {};
//              json['department_id'] = model.id;
//              json['sort'] = model.sort - 1;
//              vm.departmentsortjosn.push(json);
//              joson['departmentid_and_sort'] = vm.departmentsortjosn;
//              var str = JSON.stringify(joson);
//              _data.token = $H.getCookie("token");
//              _data.school_id = $H.getCookie("school_id");
//              _data.departmentsort = str;
//              //组织架构部门上移下移
//              JC.Req.ajax({
//                  url: JC.Const.MOVE_OR_DOWN,
//                  data: _data,
//                  type: "POST",
//                  dataType: "JSON",
//                  success: function (obj) {
//                      if (obj.code == 0) {
//                          swal("移动成功！", "您将成功的移动这条信息！", "success");
//                          location.assign(location)
//                      }
//                  }
//              });
            },
            movedown: function (model) {
//              let _data = {};
//              let self = this;
//              let json = {};
//              let joson = {};
//              json['department_id'] = model.id;
//              json['sort'] = model.sort + 1;
//              vm.departmentsortjosn.push(json);
//              joson['departmentid_and_sort'] = vm.departmentsortjosn;
//              var str = JSON.stringify(joson);
//              _data.token = $H.getCookie("token");
//              _data.school_id = $H.getCookie("school_id");
//              _data.departmentsort = str;
//              JC.Req.ajax({
//                  url: JC.Const.MOVE_OR_DOWN,
//                  data: _data,
//                  type: "POST",
//                  dataType: "JSON",
//                  success: function (obj) {
//                      if (obj.code == 0) {} else {
//
//                      }
//                  }
//              });
            },
            changeType: function () {
            	console.log(1);
            },
            getPxForIndex: function (indexNum, isFolder) {
                if (indexNum == 0) {
                    return '10px';
                } else if (indexNum == 1 && isFolder)
                    return 17 + 5 + 'px';
                else if (indexNum == 1 && !isFolder)
                    return 34 + 5 + 'px';
                else if (indexNum > 1 && !isFolder)
                    return indexNum * 15 + 5 + 17 + 'px';
                else
                    return indexNum * 15 + 5 + 'px';
            }
        }
	}
</script>

<style lang="scss" scoped>
	.item{
		cursor: pointer;
		.bold{
			padding: 10px;
    		display: flex;
    		font-size: 12px;
    		.mode{
			    flex: 1;
			    .folder{
		    	    width: 12px;
				    height: 12px;
				    margin-right: 5px;
			    }
    		}
    		&.active{
			    background: #4597E0;
			    border: 1px solid #DEE1E6;
			    color: #fff;
    		}
		}
	}
	.anddelet{
	    width: 180px;
		height: 46px;
	    background: #FFFFFF;
	    border: 0 solid #E7EAEC;
	    z-index: 2;
	    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);
	    border-radius: 5px;
	    overflow: hidden;
        position: fixed;
        li {
        	padding-left: 10px;
		    color: #676A6C;
		    line-height: 46px;
		}
	}
	.anddelete{
	    width: 180px;
	    height: 230px;
	    background: #FFFFFF;
	    padding: 0px!important;
	    border: 0 solid #E7EAEC;
	    z-index: 2;
	    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);
	    border-radius: 5px;
	    overflow: hidden;
        position: fixed;
        li{
    	    height: 46px;
		    line-height: 46px;
		    padding-left: 10px;
		    border-bottom: 1px solid #E7EAEC;
		    color: #676A6C;
        }
	}
</style>