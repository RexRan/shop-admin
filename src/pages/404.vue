<script setup>

</script>

<template>
  <el-col :sm="12" :lg="6">
    <el-result
        icon="warning"
        title="404 Not Found"
        sub-title="您的页面走丢了~"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">Back</el-button>
      </template>
    </el-result>
  </el-col>
</template>

<style scoped>

</style>