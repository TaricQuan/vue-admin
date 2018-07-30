<template lang="html">
	<a href="javascript:void(0);" class="ui-btn" :class="{'ui-btn-goback':ishref,'ui-btn-stable':!ishref}" @click="run($event)">
    	<slot name="content"></slot>
    </a>
</template>

<script>
	import { delCookie } from '@/const/my.ext'
	export default {
		props: {
	        ishref: {
	            type: Boolean,
	            default: true
	        }
	    },
	    methods: {
	        run: function(event) {
	            if (!this.ishref) {
	                this.$emit("btn-event",event);
	            } else {
	                history.go(-1);
	            }
	        }
	    },
	}
</script>

<style lang="scss" scoped>
	$white-color: #FFFFFF;
	$border-corner-radius: 3px;
	
	.ui-btn{
	    width: 62px;
	    height: 28px;
	    font-size: 14px;
	    border: 1px solid #D0E8FF;
	    border-radius: 3px;
	    display: inline-block;
	    text-align: center;
	    line-height: 30px;
	    color: #4597E0;
	    background: #4597E0;
	    &:active{
	        background: rgb(58, 149, 230);
	        box-shadow:inset 0 0 5px 5px rgb(42, 137, 221);
	    }
	}
	.ui-btn-goback {
	    background: #fff;
	    &::before {
	        display: inline-block;
	        content: "";
	        width: 8px;
	        height: 8px;
	        border: 2px solid #4597E0;
	        transform: rotate(45deg);
	        border-right: none;
	        border-top: none;
	    }
	    &:hover {
	        background: #4597E0;
	        color: #ffffff;
	        &::before {
	            border-color: #ffffff;
	        }
	    }
	}
	
	.ui-btn-stable {
	    background: #4597E0;
	    color: #ffffff;
	}
</style>