<template>
	<view :class="getClass" :style="getStyle" style="background-color: rgb(245, 245, 241);">
	</view>
</template>

<script>
	export default{
		name:'model',
		props:{
			width:{
				type:[Number,String],
				default:""
			},
			height:{
				type:[Number,String],
				default:""
			},
			oClass:{
				type:String,
				default:""
			},
			circle:{
				type:Boolean,
				default:false
			},
		},
		computed:{
			getStyle(){
				return `width:${this.width};height:${this.height}`
			},
			getClass(){
				let c = ''
				if(this.circle){
					c += 'rounded-circle'
				}
				return `${c} ${this.oClass}`
			},
		}
	}
</script>

<style>
</style>