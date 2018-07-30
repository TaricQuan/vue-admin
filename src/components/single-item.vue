<template lang="html">
	<li @click.stop='inputname($event,model)' :class="{'marl15':!isFolder}" v-if="ispeople">
        <div
            :class="{'bold': isFolder}"
            @dblclick="changeType">
            <span v-if="isFolder" class="switch_text" @click.stop="toggle">
                <i class="icon iconfont icon_tabel icon_tabel_02" v-if="open">&#xe673;</i>
                <i class="icon iconfont icon_tabel icon_tabel_01" v-else >&#xe61b;</i>
            </span>
            <span class="switch_name">
                <img :src="model.artvar" v-if="model.artvar">
                <img src="~myassets/img/wenjian.png" v-if='model.org_type == 1'>
                <img :src="model.headimg | errImg" v-else>
                {{model.label}}
            </span>
        </div>
        <ul v-show="open" v-if="isFolder" class="demo01">
            <single-item
            class="item"
            v-for="model in model.children"
            :model="model" @push-model-data="childPush" @delete-model-data="childDelete" :issingle="issingle" :isparment="isparment" :key="model.id">
            </single-item>
        </ul>
    </li>
    <li @click.stop='inputname($event,model)' :class="{'marl15':!isFolder}" v-else v-show="model.org_type == 1">
        <div
            :class="{'bold': isFolder}"
            @dblclick="changeType">
            <span v-if="isFolder" class="switch_text" @click.stop="toggle">
                <i class="icon iconfont icon_tabel icon_tabel_02" v-if="open">&#xe673;</i>
                <i class="icon iconfont icon_tabel icon_tabel_01" v-else >&#xe61b;</i>
            </span>
            <span class="switch_name">
                <img :src="model.artvar" v-if="model.artvar">
                <img src="~myassets/img/wenjian.png" v-if='model.org_type == 1'>
                <img :src="model.headimg | errImg" v-else>
                {{model.label}}
            </span>
        </div>
        <ul v-show="open" v-if="isFolder" class="demo01">
            <single-item
            class="item"
            v-for="model in model.children"
            :model="model" @push-model-data="childPush" @delete-model-data="childDelete" :ispeople="ispeople" :issingle="issingle" :isparment="isparment" :key="model.id">
            </single-item>
        </ul>
    </li>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		name: 'singleItem',
		props: {
	        ishref: {
	            type: Boolean,
	            default: true
	        },
	        model:{},
	        ispeople: { //是否显示部门里面的人
				type: Boolean,
				default: true
			},
			isparment: { //是否显示部门里面的人
				type: Boolean,
				default: false
			},
	    },
	    data(){
	    	return{
	    		open: false,
	            banji: [],
	            teacherid: [],
	            clickCount: '',
	            lmTeachers: '',
	            modelid: this.model.id
	    	}
	    },
	    computed: {
	        isFolder: function() {
	            return this.model.children &&
	                this.model.children.length
	        }
	
	    },
	    filters: {
	        errImg: function(src) {
	            return src ? src : require('myassets/img/default_people.png');
	        }
	    },
	    methods: {
	        toggle: function(e) {
	            if (this.isFolder) {
	                if (e.target && e.target.classList.contains("icon_tabel")) {
	                    this.open = !this.open
	                }
	            }
	        },
	        childPush: function(data) {
	            this.$emit("push-model-data", data);
	        },
	        childDelete: function(data) {
	            this.$emit("delete-model-data", data)
	        },
	        changeType: function(data) {
	            if (!this.isFolder) {
	                Vue.set(this.model, 'children', [])
	                //this.myschool_id()
	                this.open = true;
	            }
	        },
	        //把数据提交给父组件进行相关操作
	        inputname: function(event, model) {
	            if (!model.hasAdd) {
	                //如果是部门不可选则返回
	                if (this.isparment && model.org_type == 1) {
	                    return;
	                }
	                // this.jisuan(model);
	                this.$emit("push-model-data", model);
	                !this.issingle && (model.hasAdd = true); //设置不可以再次添加
	            }
	        },
	    }
	}
</script>

<style lang="scss" scoped>
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