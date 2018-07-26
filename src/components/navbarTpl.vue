<template>
  <nav class="navbar">
      <div class="fun rel">
				  <ul class="left abs">
						 <slot name="left"></slot>
					</ul>
					<ul class="center itemList">
						 <slot name="center"></slot>
					</ul>
					<ul class="right abs">
						  <slot name="right"></slot>
					</ul>
			</div>
  </nav>
</template>

<script>
export default {
  name: 'navbarTpl'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/variables.less';
@navH:44px;
.navbar{
	.fixed;
	top:0;
	left:0;
	width:100%;
	z-index:99999;
	background:rgba(238,238,238,0.95);
	height:@navH;
	box-sizing: content-box;
	border-bottom:1px solid @c1;

}
ul li{
	display: inline-block;
}
.center{
	font-size: 15px;
	.vc-hc;
	line-height:@navH;
}
.left{
	top:0;
	left:0;
	height:@navH;
	.vc;
	justify-content:flex-start;
}
.right{
	top:0;
  right:0;
	height:@navH;
	.vc;
	justify-content:flex-end;
}
.left,.right{
	 li{
		 padding:0 10px;
	 }
}
.itemList{
	li{
		 .ml10;
		 .mr10;
		 .c5;
		 .rel;
	}
}
</style>
