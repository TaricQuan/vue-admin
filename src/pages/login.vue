<template>
	<div class="login-container">
		<div class="logo"></div>
		<el-form class="login-form" autoComplete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">微智校园学校管理后台</h3>
			</div>
			<el-form-item prop="username">
				<el-input name="username" v-model='account' type="text" autoComplete="on" placeholder="请输入账号" @blur="checkAccount" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input name="password" v-model='passworda' type="password" autoComplete="on" placeholder="请输入密码" @blur="checkPass" />
			</el-form-item>
			<el-form-item prop="code">
				<el-input class="code" v-model='verificationcode' name="code" autoComplete="on" placeholder="请输入验证码" @blur="checkCode" />
				<span class="code-prompt">验证码为空</span>
				<img class="verifyImg" alt="点击刷新验证码" title="点击刷新验证码" @click="errora" :src="imagepaths" />
			</el-form-item>
			<el-button type="primary" @click='verification'>登陆</el-button>
		</el-form>
	</div>
</template>

<script>
	import { getUuid,getCheckcode,postLand } from '@/const/course'
	import { setCookie } from '@/const/my.ext'
	export default {
		name:'login',
		data() {
			return{
				account: '',
	            verificationcode: '',
	            account_error: false,
	            password_error:false,
	            code_error:false,
	            passworda: '',
	            imagecode: '', 
	            imagepaths: ''
			}
		},
		created (){
			this.errora();
		},
		methods:{
			errora: function () {
                let self = this;
                getUuid().then(response => {
                	if(response.data.code==0){
                		self.imagecode = response.data.data.result.uuid;
                		self.imagepaths = getCheckcode + self.imagecode;
                	}
            	});
            },
            checkAccount:function(){
                !this.account ? (this.account_error = true) : (this.account_error = false);
            },
            checkPass:function(){
                !this.passworda ? (this.password_error = true) : (this.password_error = false);
            },
            checkCode:function(){
                !this.verificationcode ? (this.code_error = true) : (this.code_error = false);
            },
            verification: function () {
                let _self = this;
                if (!_self.account || !_self.passworda) {
                    alert("请填写用户名和密码！");
                    return;
                }
                if (!_self.verificationcode) {
                    alert("请填写验证码！");
                    return;
                }
                var _data = {};
                _data.login = _self.account;
                _data.password = _self.passworda;
                _data.code = _self.verificationcode;
                _data.uuid = _self.imagecode;
                postLand(_data).then(response => {
                	if(response.data.code == 0){
                		if(response.data.data.list.is_superuser == 1){
                         	_self.$router.push('/home');
                         	_self.setALlCoolies(response.data);
                        }
                	}else if(response.data.code == 403){
                		alert("账号或密码错误");
                		_self.errora();
                	}else{
                		var msgs = response.data.msg;
                		alert(msgs);
                		_self.errora();
                	}
            	});
            },
            //设置cookie
            setALlCoolies: function (obj) {
                setCookie("school_id", obj.data.list.school_id);
                setCookie("user_id", obj.data.list.id);
                setCookie("user_name", obj.data.list.username);
                setCookie("school_name", obj.data.list.school_name);
                setCookie("token", obj.data.result);
            }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.login-container{
		position: absolute;
		background: url(../assets/images/bj.jpg) no-repeat;
		background-size: cover;
		background-position: center;
		height: 100%;
		width: 100%;
		.logo{
		    position: fixed;
		    top: 50px;
		    left: 100px;
		    width: 184px;
		    height: 46px;
		    background: url(../assets/images/logo.png) no-repeat;
		    background-size: contain;
		}
		.login-form{
			width: 500px;
			height: 400px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: #fff;
		    padding-top: 36px;
		    border-radius: 2px;
	        box-shadow: 0 16px 45px 0 rgba(17, 108, 190, 0.5);
			.title-container{
				.title{
				    font-size: 30px;
				    color: #4597E0;
				    font-weight: bold;
				    padding-bottom: 30px;
				    display: block;
				    text-align: center;
				}
			}
			.el-form-item{
				width: 400px;
				margin: 0 auto 12px;
				.el-input{
					display: block;
				    line-height: 44px;
				    font-size: 15px;
				    color: #C1C1C1;
				    border: 1px solid #DEDFE0;
				    padding: 0 20px 0 15px;
				    box-sizing: border-box;
					input{
						border: none;
						padding: 0;
					    outline: none;
					}
				}
				.code{
					width: 285px;
					float: left;
				}
				.code-prompt{
					position: absolute;
				    right: 150px;
				    top: 3px;
				    color: #FE4444;
				    display: none;
				}
				.verifyImg{
					width: 104px;
				    height: 44px;
				    margin-left: 10px;
				    vertical-align: middle;
				    display: block;
				    float: left;
				    cursor: pointer;
				}
			}
			.el-button{
				width: 400px;
				line-height: 46px;
				margin: 0 auto;
				display: block;
				box-sizing: border-box;
				padding: 0;
			}
		}
	}
</style>