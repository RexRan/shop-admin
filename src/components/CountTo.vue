<script setup>
import {reactive, ref, watch} from "vue";
import gsap from 'gsap'

const props = defineProps({
  value:{
    type:Number,
    default:0
  }
})
const count = ref({
  num:0
})

function AnimateToValue() {
  gsap.to(count.value,{
    duration:0.5,
    num:props.value
  })
}

AnimateToValue()
// watch(()=> props.value, ()=> AnimateToValue())


</script>

<template>
 {{count.num.toFixed(0)}}
</template>

<style scoped>

</style>