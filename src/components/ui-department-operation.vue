<template lang="html">
	<li>
		<div class="bold" @dblclick="changeType" v-on:click='toggle(model)' v-bind:class="{ 'active':model.id == isActive && isActive}" :style="{'padding-left':getPxForIndex(model.indexNum, isFolder)}">
			<span class="mode">
                <span v-if="isFolder" v-on:click.stop='switchtab'>
                    <i class="icon iconfont icon_02" v-if='!open'>&#xe61b;</i>
                    <i class="icon iconfont icon_03" v-else>&#xe673;</i>
                </span>
			<span><img src="~myassets/img/wenjian.png" class="folder">{{model.label}}</span>
			</span>
			<span style="border-bottom: none; padding:0px;" class="ul_parent">
                <span @click.stop='addanddelete($event,model)' style="">
                    <i class="icon iconfont">&#xe679;</i>
                </span>
			<ul v-bind:class="model.tab == 0 ? 'anddelet' : 'anddelete' " v-if='opena' id="con">
				<li v-on:click='itemadd(model.id)'>{{model.add}}</li>
				<li v-on:click='itemrename(model,model)' v-if='model.tab != 0'>{{model.rename}}</li>
				<li v-on:click='itemdeletea(model)' v-if='model.tab != 0'>{{model.delete}}</li>
				<li v-on:click='itemmoveup(model)' v-if='model.tab != 0'>{{model.moveup}}</li>
				<li v-on:click='itemmovedown(model)' v-if='model.tab != 0'>{{model.movedown}}</li>
			</ul>
			</span>
		</div>
		<ul v-show="open" v-if="isFolder">
			<ui-department-operation 
				class="item itembottom"
				v-for="model in model.children"
				:model="model"
				:bus="bus"
				:pdl="true"
				:key="model.id"
				@itemadd="itemadd"
				@itemrename="itemrename"
				@itemdeletea="itemdeletea"
				@itemmoveup="itemmoveup"
				@itemmovedown="itemmovedown">
			</ui-department-operation>
		</ul>
	</li>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie, GetQueryString, getCookie } from "rootSrc/util/my.ext";
	export default {
		name:"ui-department-operation",
		props: {
			model: Object,
			bus: Object,
		},
		data() {
			return {
				open: false,
				opena: false,
				isActive: this.model.departtment,
				counter: 0,
				dep_id: '',
				clickCount: 0,
				nums: 0
			}
		},
		computed: {
			isFolder: function() {
				return(this.model.children && this.model.children.length) || (this.model.indexNum == 0);
			}
		},
		created: function() {
			var _self = this;
			document.addEventListener('click', function(e) {
				_self.opena = false;
			})

		},
		mounted: function() {
			if(GetQueryString("department_id")) {
				this.isActive = GetQueryString("department_id");
			}
			if(this.isActive) {
				this.open = !this.open;
			}
		},
		updated: function() {
			var _self = this;

			_self.bus.$on('parentid', function(id) {
				_self.isActive = id;
			})
			_self.bus.$on('close_menu', function(id) {
				if(id != _self.model.id) {
					_self.opena = false;
				}
			})
		},
		methods: {
			toggle: function(department) {
				this.isActive = department.id;
				this.bus.$emit('changeid', department);
			},
			addanddelete: function(e, model) {
				this.bus.$emit('close_menu', this.model.id);
				if(this.model.tab == 0) {
					this.model['add'] = '添加部门';
				} else {
					this.model['add'] = '添加部门';
					this.model['rename'] = '重命名';
					this.model['delete'] = '删除';
					this.model['moveup'] = '上移';
					this.model['movedown'] = '下移';
				}

				this.opena = !this.opena;

				this.$nextTick(function() {
					var $con = $(e.target).closest(".ul_parent").find("#con");
					var _height = $con.height();
					if((window.innerHeight - e.pageY) < _height) {
						$con.css({
							top: e.pageY - _height,
							left: e.pageX
						});
					} else {
						$con.css({
							top: e.pageY + 10,
							left: e.pageX
						});
					}

				})

			},
			switchtab: function(e) {
				if(this.isFolder) {
					this.open = !this.open
				}

			},
			itemadd: function(data) {
				this.$emit('itemadd',data);
			},
			itemrename: function(data) {
				this.$emit('itemrename',data);
			},
			itemdeletea: function(data) {
				this.$emit('itemdeletea',data);
			},
			itemmoveup: function(data) {
				this.$emit('itemmoveup',data);
			},
			itemmovedown: function(data) {
				this.$emit('itemmovedown',data);
			},
			changeType: function() {
				let _self = this;
				if(!this.isFolder) {
					Vue.set(this.model, 'children', []);
					this.open = true;
				}
			},
			getPxForIndex: function(indexNum, isFolder) {
				if(indexNum == 0) {
					return '10px';
				} else if(indexNum == 1 && isFolder)
					return 17 + 5 + 'px';
				else if(indexNum == 1 && !isFolder)
					return 34 + 5 + 'px';
				else if(indexNum > 1 && !isFolder)
					return indexNum * 15 + 5 + 17 + 'px';
				else
					return indexNum * 15 + 5 + 'px';
			}
		}
	}
</script>

<style lang="css">
	.pdl10 {
		padding-left: 30px !important;
	}
	
	.pdl10 {
		padding-left: 30px !important;
	}
	
	.anddelet {
		width: 180px;
		height: 46px;
		background: #FFFFFF;
		padding-left: 10px;
		border: 0 solid #E7EAEC;
		z-index: 2;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.20);
		border-radius: 5px;
		position: fixed;
		overflow: hidden;
		text-anchor: center;
		line-height: 46px;
	}
	
	.anddelet li {
		color: #676A6C;
	}
	
	.anddelete li {
		color: #676A6C;
	}
</style>