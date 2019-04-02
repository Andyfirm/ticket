<template>
  <div id="getTicketType">
    <div class="topBox">
      <router-link :to="{name: 'index'}" class="back">取消</router-link>
      <p>请点击选择取票方式</p>
      <span class="time">{{time}}s</span>
    </div>
    <div class="container">
      <div class="leftBox">
        <p>会员卡取票</p>
        <router-link :to="{name: 'memberDiscern', query: {type: 'qupiao'}}" class="imgBox">
          <img src="/static/images/hykScan.png" alt>
        </router-link>
      </div>
      <div class="rightBox">
        <p>二维码取票</p>
        <router-link :to="{name: 'qrcodeScan'}" class="imgBox">
          <img src="/static/images/qrcodeScan.png" alt>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getTicketType',
  data() {
    return {
      time: 119,
      timer: null,
      yanzheng: false
    }
  },
  created() {
    this.getTime()
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
#getTicketType {
  width: 100%;
  height: 6.1rem;
  background-color: #fff;
}
.topBox {
  position: relative;
  height: 0.95rem;
  padding-top: 0.33rem;
  box-sizing: border-box;
}
.topBox p {
  font-size: 30px;
  line-height: 30px;
  color: #333;
  text-align: center;
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
  height: 4.57rem;
  margin: 0 auto;
  padding: 0.26rem 0;
  border: 1px solid #f39800;
  box-sizing: border-box;
}
.leftBox,
.rightBox {
  width: 50%;
  height: 100%;
  float: left;
  padding-top: 0.48rem;
  font-size: 32px;
  line-height: 24px;
  color: #000;
  text-align: center;
  box-sizing: border-box;
}
.rightBox {
  border-left: 1px solid #f39800;
  box-sizing: border-box;
}
.imgBox {
  display: block;
  width: 2.58rem;
  height: 2.18rem;
  margin: 0.57rem auto 0;
}
.imgBox img {
  width: 100%;
}
</style>
