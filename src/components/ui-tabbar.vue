<template lang="html">
	<div class="ui-tabbar">
		<ul class="ui-tabbar-ul">
			<li class="ui-tabbar-li" :class="selectedIndex==indexNum?'li-selected':'li-de-selected'" v-for="(title, indexNum) in titlearray" @click="didSelectedAtIndexOf(indexNum)" :style="stylesheet">{{title}}</li>
		</ul>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		props: {
	        titles: {//标题数组
	            type: Array,
	            default: []
	        }, 
	        index: {//手动选中的索引
	            type: Number,
	            default: 0
	        },
	        itemwidth: '', //宽度
	        itemheight: '', //高度
	        tintcolor: {//主题颜色
	            type: String,
	            default: '#4597E0'
	        },
	        fontsize: '', //字体大小
	
	    },
		data() {
			return {
				selectedIndex: 0,
	            titlearray: ['title'],
	            stylesheet: { //默认值
	                color: '',
	                borderColor: '',
	                backgroundColor: '',
	                fontSize: '14px',
	                height: '36px',
	                width: '160px',
	            },
			}
		},
		created: function() {
	        var _self = this;
	        if (_self.titles) {
	            _self.titlearray = _self.titles;
	        }
	        if (_self.index) {
	            _self.selectedIndex = _self.index;
	        }
	        //设置颜色
	        if (!_self.tintcolor) { //初始颜色
	            _self.tintcolor = '#4597E0';
	        }
	        _self.stylesheet.color = _self.tintcolor;
	        _self.stylesheet.borderColor = _self.tintcolor;
	        _self.stylesheet.backgroundColor = _self.tintcolor;
	
	        if (_self.fontsize) {
	            _self.stylesheet.fontSize = _self.fontsize;
	        }
	        if (_self.itemwidth) {
	            _self.stylesheet.width = _self.itemwidth;
	        }
	        if (_self.itemheight) {
	            _self.stylesheet.height = _self.itemheight;
	        }
	        _self.stylesheet.lineHeight = _self.stylesheet.height;
	    },
	    methods: {
	        didSelectedAtIndexOf: function(index) {
	            var _self = this;
	            if (_self.selectedIndex == index) return;
	            _self.selectedIndex = index;
	            _self.$emit('did-selected-at', index); //往上层传值
	        },
	    },
	    watch: {
	        index: function(newValue) {
	            var _self = this;
	            _self.didSelectedAtIndexOf(newValue);
	        },
	    }
	}
</script>

<style lang="scss" scoped>
	$white-color: #FFFFFF;
	$border-corner-radius: 3px;
	.ui-tabbar {
	    width: 100%;
	    text-align: center;
	    box-sizing: border-box;
	    .ui-tabbar-ul {
	        .ui-tabbar-li {
	            text-align: center;
	            display: inline-block;
	            border: 1px solid $white-color;
	            border-right: none;
	            cursor: pointer;
	            box-sizing: border-box;
	        }
	    }
	    .ui-tabbar-ul :first-child {
	        border-bottom-left-radius: $border-corner-radius;
	        border-top-left-radius: $border-corner-radius;
	    }
	    .ui-tabbar-ul :last-child {
	        border-right: 1px solid $white-color;
	        border-bottom-right-radius: $border-corner-radius;
	        border-top-right-radius: $border-corner-radius;
	    }
	}
	.li-selected {
	    font-weight: 300;
	    color: $white-color !important;
	}
	
	.li-de-selected {
	    background-color: $white-color !important;
	}
</style>