<template>
	<div class="box">
		<div class='box_heade'>
			<div class="box_heade_select">
				<span>年级</span>
				<el-select v-model="grade_id" placeholder="请选择" @change="getdataByGradeId">
					<el-option label="全部" value=""></el-option>
					<el-option v-for="item in gradesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
			<div class='box_right' style="float:left;">
				<input type="text" value="搜索班级名称、班主任" class="searchsupervisor" name="txtName" placeholder="搜索班级名称" style="display:none;" />
				<input type="password" value="搜索班级名称、班主任" class="searchsupervisor" name="txtName" placeholder="搜索班级名称" style="display:none;" />
				<input type="text" name="txtName" v-model='msgserch' value="搜索班级名称、班主任" class="searchsupervisor" placeholder="搜索班级名称" autocomplete="off" />
				<button type="button" v-on:click='searchlistings()'>搜索</button>
			</div>
			<div class="theimp" style="float: right;">
				<a style="margin-right: 10px;">新建班级</a>
				<a @click='deleteBtn'>删除</a>
			</div>
		</div>
		<el-table ref="multipleTable" :data="classList" tooltip-effect="dark" :max-height="520" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="25"></el-table-column>
			<el-table-column prop="grade_name" label="年级"></el-table-column>
			<el-table-column prop="name" label="班级名称" width="95"></el-table-column>
			<el-table-column prop="master_name" label="班主任"></el-table-column>
			<el-table-column prop="student_count" label="学生数" width="46"></el-table-column>
			<el-table-column prop="parent_count" label="家长数" width="46"></el-table-column>
			<el-table-column prop="bind_student_count" label="绑定学生数"></el-table-column>
			<el-table-column prop="place_name" label="所在场地"></el-table-column>
			<el-table-column prop="machine_number" label="班牌号" width="112"></el-table-column>
			<el-table-column label="操作" width="148">
				<template slot-scope="scope">
					<el-button @click.native.prevent="goto(1,scope.row)" type="text" size="small">
						班级详情
					</el-button>
					<el-button @click.native.prevent="goto(2,scope.row)" type="text" size="small">
						修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { getClassList, getGradeList } from '@/const/course'
	import { getCookie } from '@/const/my.ext'
	export default {
		name: 'classManagement',
		data() {
			return {
				token: getCookie("token"),
				user_id: getCookie("user_id"),
				school_id: getCookie("school_id"),
				page: 0,
				pageSize: 20,
				classList: [],
				gradesList: [],
				mycheckbox: [],
				grade_id: '',
				msgserch: ''
			}
		},
		created() {
			let _self = this;
			let _data = {
				token: _self.token,
				school_id: _self.school_id
			}
			const asyncReadFile = async function () {
				await getGradeList(_data).then(respones => {
									if(respones.data.code == 0) {
										_self.gradesList = respones.data.data.list;
									}
								})
			  	_self.getClassList();
			};
			asyncReadFile();
		},
		methods: {
			getClassList() {
				let _self = this;
				let _data = {
					token: _self.token,
					school_id: _self.school_id,
					grade_id: _self.grade_id,
					pageSize: _self.pageSize,
					page: _self.page
				};
				getClassList(_data).then(respones => {
					if(respones.data.code == 0) {
						_self.classList = respones.data.data.list;
						_self.classList.forEach(function(val, i) {
							val.master_name = val.master_name ? val.master_name : "暂无"
							val.machine_number = val.machine_number ? val.machine_number : "暂无"
							val.place_name = val.place_name ? val.place_name : "暂无"
							_self.gradesList.forEach(function(vals, i) {
								if(val.grade_id == vals.id) {
									val.grade_name = vals.name;
								}
							})
						})
						console.log(2)
					}
				})
			},
			handleSelectionChange(val) {
				this.mycheckbox = val;
			},
			goto(i, val) {
				if(i == 1) {
					this.$router.push(`/school_info/classManagement/classDetails/${val.id}`)
				} else {
					this.$router.push(`/school_info/classManagement/modifythe/${val.id}`)
				}
			},
			deleteBtn() {
				if(this.mycheckbox.length < 1){
					this.$message({
						type: 'warning',
						message: '请先勾选要删除的选项!'
					});
					return;
				}
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getdataByGradeId() {
				this.page = 0;
				this.getClassList();
			},
			searchlistings() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding: 35px;
		height: 728px;
		box-sizing: border-box;
		.box_heade {
			height: 32px;
			margin-bottom: 20px;
			.box_heade_select {
				float: left;
				font-size: 14px;
				margin-right: 10px;
			}
			.box_right {
				float: left;
				input {
					width: 220px;
					height: 30px;
					border: 1px solid #DEE1E6;
					padding: 0 10px;
					box-sizing: border-box;
				}
				button {
					width: 56px;
					height: 29px;
					line-height: 30px;
					text-align: center;
					font-size: 13px;
					color: #FFFFFF;
					background: #4597E0;
					border: 1px solid #4597E0;
					border-radius: 3px;
					cursor: pointer;
				}
			}
			.theimp {
				a {
					background: #4597E0;
					border: 1px solid #4597E0;
					border-radius: 3px;
					line-height: 30px;
					color: #fff;
					text-align: center;
					width: 84px;
					height: 30px;
					display: inline-block;
					cursor: pointer;
					font-size: 14px;
				}
			}
		}
	}
</style>
<style type="text/css">
	.el-table .cell {
		padding: 0 5px;
		font-size: 12px;
		line-height: 36px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.el-table td,
	.el-table th {
		padding: 0;
	}
	
	.el-table th {
		background: #F7F9FB;
	}
	
	.el-input__inner {
		height: 30px;
		line-height: 30px;
	}
</style>