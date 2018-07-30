<template>
	<div class="box">
		<div class="label_box">
			<label>学校logo：</label>
			<div class="label_box_right">
				<div class="logo_img" :style="{ backgroundImage: 'url('+$store.state.schoolInfo.logo+')'}"></div>
				<div class="imagepmg"><div class="uploadpictures"><input type="file" name="" id="" class="upload"></div></div>
				<p>推荐尺寸200*200，图片仅支持jpg、gif、jpeg、png格式，上传最大是2M</p>
			</div>
		</div>
		<div class="label_box">
			<label>学校名称：</label>
			<div class="label_box_right">{{$store.state.schoolInfo.name}}</div>
		</div>
		<div class="label_box">
			<label>学校地址：</label>
			<div class="label_box_right">{{$store.state.schoolInfo.address}}</div>
		</div>
		<div class="label_box">
			<label>学校简介：</label>
			<div class="label_box_right">{{$store.state.schoolInfo.description}}</div>
		</div>
	</div>
</template>

<script>
	import { getCookie } from '@/const/my.ext'
	export default {
		name: 'home',
		data() {
			return {
				token : getCookie("token"),
				user_id : getCookie("user_id"),
			}
		},
        created () {
        	
        }
	}
</script>

<style lang="scss" scoped>
	.box{
		padding: 35px;
		.label_box{
		    display: flex;
	        margin-bottom: 3%;
    		line-height: 30px;
		    overflow: hidden;
		    label{
	    	    margin-right: 10%;
			    font-size: 13px;
			    color: #999999;
			    float: left;
		    }
		    .label_box_right{
		    	flex: 1;
	    	    font-size: 13px;
    			color: #333333;
    			.logo_img{
    				background-size: cover;
				    background-position: center center;
				    margin-bottom: 15px;
				    width: 100px;
				    height: 100px;
				    border-radius: 50%;
    			}
    			.imagepmg{
    				position: relative;
    				.uploadpictures{
    					overflow: hidden;
					    width: 66px;
					    font-size: 12px;
					    border: 1px solid #D0E8FF;
					    border-radius: 3px;
    					color: #4597E0;
					    height: 24px;
    					background-image: url(../../../assets/images/anniu.png);
    					.upload{
    						opacity: 0;
    					}
    				}
    			}
    			p{
				    width: 216px;
				    font-size: 10px;
				    color: #999999;
    			}
		    }
		}
	}
</style>