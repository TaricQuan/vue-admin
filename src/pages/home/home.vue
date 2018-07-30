<template>
	<el-main class="content_cencent">
		<el-row>
			<el-col :span="19" class="content_left">
				<h5>{{periodoftime}}，{{$store.state.userInfo.username ? $store.state.userInfo.username:'超级管理员'}}</h5>
				<div class="news">
					<div class="news-title">
						<h3>您有{{msg_count}}条消息</h3>
						<router-link to="/systemSettings/msgList" class="moreMsg">更多</router-link>
					</div>
					<ul>
						<li v-for="(item,index) in msg_list" v-if="index < maxMsgCount" @click="goDetial(item)">
							<p>{{item.title}}</p>
							<i class="iconfont icon-liebiaojiantouxiangyou"></i>
						</li>
					</ul>
				</div>
				<div class="application">
					<h3>常用功能入口</h3>
					<ul class="commonlyused">
						<li v-for="item in app_list">
							<img :src="item.img_src" alt="" />
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="5" class="content_right">
				<div class="content_cenent_con">
					<div class="content_cenent_con_a">
						<div class="img" :style="{ backgroundImage: 'url('+$store.state.schoolInfo.logo+')'}"></div>
						<p>{{school_name}}</p>
					</div>
					<dl>
						<dd>教职工</dd>
						<dd>已加入{{teachernumeral}}人</dd>
					</dl>
					<dl>
						<dd>班级数</dd>
						<dd>已创建{{classnumeral}}个</dd>
					</dl>
					<dl>
						<dd>学生数</dd>
						<dd>已加入{{studentnumeral}}人</dd>
					</dl>
					<dl>
						<dd>家长数</dd>
						<dd>已加入{{parentnumeral}}人</dd>
					</dl>
					<dl>
						<dd>绑定学生数</dd>
						<dd>已加入{{bindstudentnumeral}}人</dd>
					</dl>
				</div>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import { getSysmsg, getUserInfo, getConunt, addReadCount } from '@/const/course'
	import { getCookie, isFullSite } from '@/const/my.ext'
	export default {
		name: 'home',
		data() {
			return {
				token: getCookie("token"),
				user_id: getCookie("user_id"),
				school: getCookie("school_id"),
				school_name: getCookie("school_name"),
				school: '',
				msg_count: 0,
				periodoftime: '',
				classnumeral: 0,
				studentnumeral: 0,
				teachernumeral: 0,
				parentnumeral: 0,
				bindstudentnumeral: 0,
				//公告
				notice: false,
				//审批
				approve: false,
				//打卡
				clockin: false,
				//工资
				wages: false,
				//社团报名
				clubtosignup: false,
				//成绩
				score: false,
				//微官网
				wgw: false,
				//超级表单
				superform: false,
				msg_list: [],
				maxMsgCount: 3,
				readMoreText: "显示全部",
				//
				permissions: '', //权限列表,
				is_superuser: 0, //是否是超级管理
				app_list: [{
						name: '公告',
						img_src: require('@/assets/images/admin.notice.png'),
						type: 'admin.notice',
						href: '../../html/application/notice/announcementofthelist.html?code=1',
						checkShow() {
							return false
						},
					},
					{
						name: '审批',
						img_src: require('@/assets/images/admin.approve.png'),
						type: 'admin.approve',
						href: '../../html/application/approve/approveType.html',
						checkShow() {
							return false
						},
					},
					{
						name: '打卡',
						img_src: require('@/assets/images/admin.playcard.png'),
						type: 'admin.playcard',
						href: '../../html/application/clockin/statistical.html',
						checkShow() {
							return false
						},
					},
					/*{
					    name: '微智宝',
					    img_src: '@/images/admin_wzb.png',
					    type: 'admin.form',
					    href: '../../html/application/wzb/index.html',
					    checkShow: function() {return false},
					},
					{
					    name: '学生在校表现',
					    img_src: '@/images/choolperformance.png',
					    type: '_none_',
					    href: 'window.location.href',
					    checkShow: function() {return false},
					},*/
					{
						name: '超级表单',
						img_src: require('@/assets/images/superform.png'),
						type: 'admin.form',
						href: '../../html/application/superform/superformIndex.html',
						checkShow() {
							return false
						},
					},
					{
						name: '工资',
						img_src: require('@/assets/images/admin.pay.png'),
						type: 'admin.pay',
						href: '../../html/application/wage/salarylist.html',
						checkShow() {
							return false
						},
					},
					{
						name: '社团报名',
						img_src: require('@/assets/images/admin.community.png'),
						type: 'admin.community',
						href: '../../html/application/clubtosignup/courseselection.html',
						checkShow() {
							return false
						},
					},
					/*{
					    name: '走班选课',
					    img_src: '@/images/arranging.png',
					    type: '_none_',
					    href: '../../html/application/arranginggoclass/index.html',
					    checkShow: function() {return false},   //school_id=261941，显示
					},*/
					{
						name: '微官网',
						img_src: require('@/assets/images/micronetwork.png'),
						type: 'admin.website',
						href: '../../html/thewebsite/programmanagement.html',
						checkShow() {
							return false
						},
					},
					{
						name: '成绩',
						img_src: require('@/assets/images/admin.score.png'),
						type: 'admin.score',
						href: '../../html/application/score/score.html',
						checkShow() {
							return false
						},
					},
					{
						name: '沟通管理',
						img_src: require('@/assets/images/admin.chat.png'),
						type: 'admin.chat',
						href: '../../html/application/talk/talk-main.html',
						checkShow() {
							return false
						},
					},
					{
						name: '教务管理',
						img_src: require('@/assets/images/jwgl.png'),
						type: '_none_',
						href: "http://test-fuyao.jcweixiaoyuan.com/actr-gateways/token_auth?token=" + this.token + "&user_id=" + this.user_id,
						checkShow() {
							return false
						}, //test-weixin.jcweixiaoyuan.com   只在测试环境下显示
					},
					{
						name: '班屏管理',
						img_src: require('@/assets/images/classScreenicon.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/classScreen/screenInfo.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生考勤统计',
						img_src: require('@/assets/images/admin.playcard.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/attendance-info/attendance-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '班级评比',
						img_src: require('@/assets/images/admin.classCompare.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/class-compare/compare-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生德育',
						img_src: require('@/assets/images/admin.studentMorality.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/student-morality/morality-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生接送记录',
						img_src: require('@/assets/images/admin.schoolbus.png'),
						type: 'admin.schoolbus',
						href: '../../html/application/schoolbus-record/schoolbus-record.html',
						checkShow() {
							return false
						},
					},
				]
			}
		},
		computed: {
			filteredMsgList: function() {
				return this.msg_list.splice(0, this.maxMsgCount);
			}
		},
		created() {
			let _self = this;
			let myDate = new Date();
			let hoursdata = myDate.getHours() + 1;
			let inthemorning = [7, 8, 9, 10, 11, 12];
			let intheafternoon = [12, 13, 14, 15, 16, 17, 18, 19];
			let intheevening = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];

			if(inthemorning.indexOf(hoursdata) != -1) {
				_self.periodoftime = '早上好';
			}
			if(intheafternoon.indexOf(hoursdata) != -1) {
				_self.periodoftime = '下午好';
			}
			if(intheevening.indexOf(hoursdata) != -1) {
				_self.periodoftime = '晚上好';
			}

			let _data = {};
			_data.token = getCookie("token");
			_data.push_port = 3;
			getSysmsg(_data).then(respones => {
				if(respones.data.code == 0) {
					_self.msg_list = respones.data.data.list;
				}
			})

			_data.school_id = _self.school_id
			getConunt(_data).then(respones => {
				if(respones.data.code == 0) {
					_self.classnumeral = respones.data.data.list.class_count; //班级数
					_self.studentnumeral = respones.data.data.list.student_count; //学生数
					_self.teachernumeral = respones.data.data.list.teacher_staff_count; //教职工
					_self.parentnumeral = respones.data.data.list.parent_count; //家长数
					_self.bindstudentnumeral = respones.data.data.list.bind_student_count; //绑定学生数
				}
			})
		},
		methods:{
			goDetial(item){
        		let _self = this;
        		let _data = {
        			token: _self.token,
        			tweet_id: item.id,
                    user_id: _self.user_id,
                    push_port: 3
        		}
        		addReadCount(_data).then(respones => {
        			if (item.type == 2) {
	                    location.href = item.link ? item.link : 'javascript:void(0)';
	                } else {
	                	_self.$router.push(`/systemSettings/msgDetail/${item.id}`)
	                }
        		})
        	}
		}
	}
</script>

<style lang="scss" scoped>
	.content_cencent {
		width: 1080px;
		margin: 25px auto 0;
		border: 1px solid #DEE1E6;
		box-shadow: 0 1px 8px 0 rgba(46, 59, 79, 0.10);
		background: #FFFFFF;
		height: 730px;
		padding: 0;
		.content_left {
			padding: 30px 30px 50px 60px;
			border-right: 1px dashed #DFE1E7;
			h5 {
				margin-bottom: 30px;
				font-size: 24px;
				font-weight: normal;
				color: #333333;
			}
			.news {
				.news-title {
					border-bottom: 1px solid #E8EBEF;
					line-height: 46px;
					text-decoration: none;
					display: flex;
					justify-content: space-between;
					h3 {
						font-size: 12px;
						color: #888888;
						font-weight: 500;
					}
					.moreMsg {
						display: block;
						font-size: 12px;
						color: #4597E0;
						cursor: pointer;
					}
				}
				ul {
					li {
						display: flex;
						border-bottom: 1px solid #E8EBEF;
						line-height: 46px;
						text-decoration: none;
						cursor: pointer;
						p {
							flex: 1;
							font-size: 14px;
							color: #333333;
						}
						i {
							color: #D9DEE2;
						}
					}
				}
			}
			.application {
				h3 {
					font-size: 12px;
					color: #888888;
					margin-top: 50px;
					margin-bottom: 0px;
					font-weight: 500;
				}
				.commonlyused {
					margin-top: 10px;
					height: 320px;
					overflow: auto;
					&::-webkit-scrollbar {
						width: 6px;
						background-color: #F5F5F5;
					}
					&::-webkit-scrollbar-thumb {
						background-color: #999;
						-webkit-border-radius: 4px;
						border-radius: 4px;
					}
					li {
						float: left;
						width: 210px;
						padding: 15px;
						margin-right: 10px;
						margin-bottom: 10px;
						cursor: pointer;
						background: #F7F9FB;
						img {
							float: left;
							width: 60px !important;
							height: 60px !important;
							margin-right: 10px;
						}
						p {
							line-height: 60px;
							color: #3c3c3c;
						}
						&:nth-child(3n) {
							margin-right: 0;
						}
					}
				}
			}
		}
		.content_right {
			.content_cenent_con {
				text-align: center;
				.content_cenent_con_a {
					width: 150px;
					display: inline-block;
					border-bottom: 1px solid #E8EBEE;
					padding: 60px 0px 30px 0px;
					margin-bottom: 15px;
					text-decoration: none;
					.img {
						width: 100px;
						height: 100px;
						border-radius: 50%;
						margin-bottom: 10px;
						background-size: cover;
						background-position: center center;
						margin: 0 auto 10px;
					}
					p {
						font-size: 18px;
						color: #333333;
					}
				}
				dl {
					padding: 10px 0px 10px 0px;
					dd {
						font-size: 18px;
						color: #333333;
						&:nth-child(2n) {
							font-size: 14px;
							color: #888888;
						}
					}
				}
			}
		}
	}
</style>