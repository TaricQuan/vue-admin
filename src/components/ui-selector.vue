<template>
	<div class="ui-selector" @click="selectSwitch($event)">{{displayText}}
		<div class="ui-select-ul" v-show="show" :style="ulStyle">
			<li v-for="(item,index) in choices" @click="choice(index,$event)" :class="currentindex==index?'li-selected':''">{{item}}</li>
		</div>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		props: {
			choices: { //选择的参数
				type: Array,
				default: ["全部"],
			},
			selectindex: { //选择的参数
				type: Number,
				default: 0,
			},
			itemwidth: { //宽度
				type: String,
				default: '100px',
			},
			// itemheight: { //高度
			//     type: String,
			//     default: '30px',
			// }, 
		},
		data: function() {
			return {
				currentindex: 0,
				displayText: '',
				titles: [],
				show: false,
				ulStyle: {},
			}
		},
		created: function() {
			var _self = this;
			_self.currentindex = _self.selectindex;
			_self.titles = _self.choices;
			_self.displayText = _self.choices[_self.currentindex];
			_self.ulStyle.width = _self.itemwidth;
			// _self.ulStyle.height = _self.itemheight;
			document.body.onclick = function(event) {
				if(_self.show) {
					_self.show = false;
				} else {
					return;
				}
			}
		},
		methods: {
			selectSwitch: function(event) {
				event.stopPropagation();
				this.show = !this.show;
			},
			choice: function(index, event) {
				event.stopPropagation();
				this.show = false;
				this.currentindex = index;
				this.displayText = this.choices[index];
				this.$emit('choice-select', index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-selector {
		width: 100px;
		line-height: 30px;
		border: 1px solid #ddd;
		height: 30px;
		position: relative;
		box-sizing: border-box;
		padding: 0 5px;
		cursor: pointer;
		.ui-select-ul {
			width: 100px;
			position: absolute;
			box-sizing: border-box;
			left: -1px;
			top: 28px;
			border: 1px solid #cccccc;
			background: #fff;
			z-index: 99;
			overflow: auto;
			box-shadow: 0px 1px 3px #cccccc;
			.li-selected {
				background: #4597E0;
				color: #fff;
				&:hover {
					background: #4597E0;
					color: #fff;
				}
			}
			li {
				width: 100%;
				padding: 0 5px;
				box-sizing: border-box;
				&:hover {
					background: #F7F9FB;
					color: #333333;
				}
				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>