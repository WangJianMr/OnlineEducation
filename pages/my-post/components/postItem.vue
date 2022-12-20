<template>
	<view class="">
		<bbsContent :bbsList="testList" :post="true" @give="give" @delBbs="delBbs"></bbsContent>
	</view>
</template>

<script>
	import bbsContent from "@/pages/bbs/components/bbsContent.vue"
	export default{
		name:"postItem",
		components:{
			bbsContent
		},
		props:{
			testList:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			give(val){
				this.$emit('give',val)
			},
			delBbs(val){
				this.$emit('delBbs',val)
			}
		}
	}
</script>

<style>
</style>