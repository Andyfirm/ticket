<template>
  <div id="information">
    <div class="topBox">
      <router-link :to="{name: 'index'}" class="back">取消</router-link>
      <p class="tishi">*本机只能查询最近一个月的购票记录，完整消费记录请到中心前台查询</p>
      <span class="time">{{time}}s</span>
    </div>
    <div class="container">
      <div class="tab">
        <router-link :to="{name: 'personalInfo', query: {cardIndex}}"><span>个人信息</span></router-link>
        <router-link :to="{name: 'xfjl', query: {cardIndex}}"><span>消费记录</span></router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'information',
  data() {
    return {
      time: 119,
      timer: null,
      cardIndex: this.$route.query.cardIndex
    }
  },
  created() {
    this.getTime()
    this.$router.push({ name: 'personalInfo', query: { cardIndex: this.cardIndex } })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 倒计时
    getTime() {
      this.timer = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearInterval(this.timer)
          this.$router.push({ name: 'index' })
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
#information {
  width: 100%;
  height: 6.09rem;
}
.topBox {
  position: relative;
  padding-top: 0.33rem;
  height: 0.48rem;
}
.back {
  position: absolute;
  left: 0.35rem;
  top: 0.25rem;
  display: block;
  width: 0.9rem;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 26px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: #f39800;
  border-radius: 8px;
}
.time {
  position: absolute;
  right: 0.35rem;
  top: 0.25rem;
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #f39800;
}
.container {
  width: 6.72rem;
  height: 4.95rem;
  margin: 0 auto;
  padding: 0 0.27rem;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
}
.tab {
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
}
.tab a {
  width: 50%;
  float: left;
  display: block;
  padding-top: 0.15rem;
  font-size: 26px;
  color: #333;
  text-align: center;
  text-decoration: none;
}
.tab a span {
  display: block;
  width: 105px;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 0.1rem;
}
.router-link-active span {
  color: #f39800;
  border-bottom: 4px solid #f39800;
}
.tishi {
  font-size: 16px;
  color: #999;
  text-align: center;
}
</style>
