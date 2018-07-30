<template lang="html">
	<div class="ui-select" @click="selectSwitch($event)">
		{{select_text}}<i class="iconfont icon-sanjiaoxing-copy"></i>
		<div class="ui-select_ul" v-show="is_show">
			<li :class="selectId==item.id ? 'active':''" v-for="item in selectArr" @click="choice(item,$event)" @contextmenu.prevent="choice(item,$event)">{{item.name}}</li>
		</div>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		props: {
	        selectArr: { //选择的参数
	            type: Array,
	            default: [{ name: "全部", id: 0 }, ]
	        },
	        selectId: {
	        	type: Number,
	            default: 0
	        },
	    },
		data() {
			return {
				is_show:false,
    			select_text:'全部'
			}
		},
		created: function() {
	        var self = this;
	        document.body.onclick = function(event) {
	            if (self.is_show == true) {
	                self.is_show = false;
	            } else {
	                return;
	            }
	        }
	    },
	    mounted:function() {
	    	for (var n in this.selectArr) {
		        if (this.selectArr[n].id == this.selectId) {
		            this.select_text = this.selectArr[n].name
		        }
		    }
	    },
	    methods: {
	        selectSwitch: function(event) {
	            event.stopPropagation();
	            this.is_show = !this.is_show;
	        },
	        choice: function(item,event) {
	            event.stopPropagation();
	            this.$emit('choice', item);
	            this.select_text = item.name;
	            this.is_show = !this.is_show;
	        }
	    },
	    watch: {
			"selectId":function(){
				for (var n in this.selectArr) {
			        if (this.selectArr[n].id == this.selectId) {
			            this.select_text = this.selectArr[n].name
			        }
			    }
			}
	    }
	}
</script>

<style lang="scss" scoped>
.ui-select {
    width: 100px;
    line-height: 30px;
    border: 1px solid #ddd;
    height: 30px;
    position: relative;
    box-sizing: border-box;
    padding: 0 5px;
    cursor: pointer;
    i{
        position: absolute;
        right: 8px;
    }
    .ui-select_ul {
        width: 100px;
        position: absolute;
        box-sizing: border-box;
        left: -1px;
        top: 28px;
        border: 1px solid #4597E0;
        background: #fff;
        z-index: 99;
        li {
            width: 100%;
            padding: 0 5px;
            box-sizing: border-box;
            &:hover {
                background: #4597E0;
                color: #fff;
            }
            &:last-child {
                border-bottom: none;
            }
        }
        .active {
            background: #4597E0;
            color: #fff;
        }
    }
}
</style>