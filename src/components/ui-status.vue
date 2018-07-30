<template lang="html">
	<div class="toggleBtn" ref="nowDiv">
		<div class="myStatus" :class="isopen==1 ? 'active':''" @mousedown="dragging" @mouseup="draggings" @click.stop="status">
			<div class="myStatus_but"></div>
		</div>
		<span v-show="isopen==1">启用</span>
		<span v-show="isopen==0">禁用</span>
	</div>
</template>

<script>
	import { config, consts } from "rootSrc/const/my.const";
	import { delCookie } from "rootSrc/util/my.ext";
	export default {
		props: ['open', 'indexid', 'inputid'],
		data() {
			return {
				isopen: this.open,
				isindex: this.indexid,
				isinputid: this.inputid
			}
		},
		methods: {
			status: function() {
				var self = this;
				self.$refs.nowDiv.classList.add('myStatus_dragging');
				//关闭开关
				if(self.isopen) {
					swal({
						title: "确定停用吗？",
						text: "停用后，前端将看不到表单填写入口，不会删除已收集到的数据,确定停用吗？",
						icon: "warning",
						buttons: true,
						dangerMode: true,
						buttons: ["取消", "确定!"],
					})
					.then((willDelete) => {
						if(willDelete) {
							self.isopen = !self.isopen;
							self.$emit('getstatus', self.isopen, self.isindex, self.isinputid);
							swal.close();
						} else {
							swal.close();
						}
					});
				} else {
					self.isopen = !self.isopen;
					self.$emit('getstatus', self.isopen, self.isindex, self.isinputid);
				}
			},
			dragging: function() {
				this.$refs.nowDiv.classList.add('myStatus_dragging');
			},
			draggings: function() {
				var _self = this;
				setTimeout(function() {
					_self.$refs.nowDiv.classList.remove('myStatus_dragging');
				}, 200)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.myStatus {
		display: inline-block;
		vertical-align: middle;
		width: 36px;
		height: 21px;
		border-radius: 33px;
		border: 1px solid #BEC2C9;
		background: #BEC2C9;
		position: relative;
		box-sizing: border-box;
		cursor: pointer;
		transition: 0.2s;
		.myStatus_but {
			border-radius: 13px;
			background: #fff;
			width: 18px;
			height: 18px;
			position: absolute;
			left: 0px;
			top: 0px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, .4);
			transition: 0.4s;
		}
		&.active {
			background-color: #4cd964;
			border-color: #4cd964;
			.myStatus_but {
				transform: translate(17px, 0px);
			}
			&.myStatus_dragging {
				.myStatus_but {
					left: -10px;
					width: 26px;
				}
			}
		}
		&.myStatus_dragging {
			.myStatus_but {
				left: 0px;
				width: 26px;
			}
		}
	}
</style>