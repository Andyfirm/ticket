<template>
  <div>
    <!-- 轮播图 -->
    <keep-alive>
      <router-view class="view one"></router-view>
    </keep-alive>
    <div class="bottom_bg">
      <!-- 时间公告区域 -->
      <keep-alive>
        <router-view class="view two" name="annunciate"></router-view>
      </keep-alive>
      <!-- 内容区域 -->
      <keep-alive>
        <router-view name="index" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view name="index" v-if="!$route.meta.keepAlive"></router-view>
      <!-- 底部广告位 -->
      <keep-alive>
        <router-view  name="myfooter"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
</style>
