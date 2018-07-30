<template lang="html">
	<div class="ui-from">
		<div class="ui-from-table">
			<div class="ui-from-thead">
				<div class="ui-from-thead_th" v-for="item in listTh">{{item}}</div>
			</div>
			<div class="ui-from-tbody" v-if="listArray && listArray.length>0">
				<slot v-for="(item,index) in listArray" name="item" :data="item,index"></slot>
			</div>
			<div v-else class="ui-from-errorPrompt">暂无数据！</div>
		</div>
		<div class="ui-from-page">
			<span v-if='isLoad' @click="get_list" class="ui-from-page_but">点击加载更多</span>
			<span v-else>已经到底啦～～</span>
			<span class="ui-from-page_count">总共{{count}}条</span>
		</div>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		props: {
	        listTh: Array, //头部参数
	        listArray: Array, //内容参数
	        isLoad: { //是否还有下一页
	            type: Boolean,
	            default: true
	        },
	        count: { //总条数
	            type: Number,
	            default: 0
	        }
	    },
	    mounted: function() {
	        var dom = document.querySelector('.ui-from');
	        var listWidth = dom.querySelector('.ui-from-thead').offsetWidth;
	        var list = dom.querySelectorAll('.ui-from-tbody_tr');
	        listWidth = listWidth + 'px';
	        for (var i = 0; i < list.length; i++) {
	            list[i].style.width = listWidth;
	        }
	    },
	    methods: {
	        get_list: function(key) {
	            this.$emit('getlist');
	        },
	    }
	}
</script>

<style lang="scss" scoped>
	.ui-from {
	    background-color: #fff;
	    border: none;
	    padding: 0;
	    width: 100%;
	    &::-webkit-scrollbar {
		    width: 6px;
		    background-color: #F5F5F5;
		}
		
		&::-webkit-scrollbar-thumb {
		    background-color: #999;
		    border-radius: 4px;
		}
	    .ui-from-table {
	        width: 100%;
	        margin-bottom: 20px;
	        .ui-from-thead {
	            width: 100%;
	            background: #F7F9FB;
	            font-weight: bold;
	            line-height: 36px;
	            display: flex;
	            .ui-from-thead_th {
	                flex: 1;
	                display: block;
	                margin-right: 0px!important;
	                font-size: 12px;
	                color: #676A6C;
	                overflow: hidden;
	                text-overflow: ellipsis;
	                white-space: nowrap;
	                padding: 0 5px;
	            }
	        }
	        .ui-from-tbody {
	            width: 100%;
	            line-height: 36px;
	            height: 480px;
	            padding-right: 5px;
	            overflow-y: auto;
	            border-color: #e7eaec;
	            border-image: none;
	            border-style: solid solid none;
	            border-width: 1px 0px;
	            border: none;
	            .ui-from-tbody_tr {
	                line-height: 36px;
	                border-bottom: 1px solid #F7F9FB;
	                display: flex;
	                width: 100%;
	                .ui-from-tbody_td {
	                    flex: 1;
	                    display: block;
	                    margin-right: 0px!important;
	                    font-size: 12px;
	                    color: #676A6C;
	                    overflow: hidden;
	                    text-overflow: ellipsis;
	                    white-space: nowrap;
	                    padding: 0 5px;
	                    a {
	                        font-size: 12px;
	                        color: #4597E0;
	                    }
	                }
	            }
	        }
	        .ui-from-errorPrompt {
	            padding-top: 100px;
	            text-align: center;
	            font-size: 30px;
	            color: #ccc;
	            width: 100%;
	        }
	    }
	    .ui-from-page {
	        text-align: center;
	        line-height: 36px;
	        font-size: 14px;
	        color: #9FADC7;
	        width: 100%;
	        position: relative;
	        .ui-from-page_count {
	            position: absolute;
	            right: 0;
	            top: 0;
	        }
	        .ui-from-page_but {
	            color: #4597E0;
	            cursor: pointer;
	        }
	    }
	}
</style>