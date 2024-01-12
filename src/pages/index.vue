<template>
  <div>

    <el-row :gutter="20">
<!--      骨架屏优化-->
      <template v-if="panels.length === 0">
        <el-col :span="6" :offset='0' v-for="index in 4" :key="index">
          <el-skeleton animated >
            <template #template>
              <el-card class="border-0" shadow="hover">
                <template #header>
                  <div class="card-header flex justify-between">
                    <el-skeleton-item variant="text" style="width: 40%" />
                    <el-skeleton-item variant="text" style="width: 20%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 50%" />
                <el-divider/>
                <div class="flex justify-between text-gray-500">
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :offset='0' v-for="(item, index) in panels" :key="index">
        <el-card class="border-0" shadow="hover">
          <template #header>
            <div class="card-header flex justify-between">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <count-to :value="item.value "></count-to>
          </span>
          <el-divider/>
          <div class="flex justify-between text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <index-navs></index-navs>
    <el-row :gutter="20">
      <el-col :span="12" :offset="0" style="margin-top: 20px">
        <index-chart></index-chart>
      </el-col>
      <el-col :span="12" :offset="0" style="margin-top: 20px">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3"/>
        <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {getStatistics1, getStatistics2} from "~/api/index.js";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/IndexNavs.vue";
import IndexChart from "~/components/IndexChart.vue";
import IndexCard from "~/components/IndexCard.vue";

const panels = ref([])
getStatistics1().then(res => {
  panels.value = res.panels
  console.log(panels.value)
})

const order = ref([])
const goods = ref([])
getStatistics2().then(res => {
  goods.value = res.goods
  order.value = res.order
})

</script>

<style>

</style>