<template>
  <div id="realName">
    <div class="topBox">
      <router-link :to="{name: 'buyTicket'}" class="back">取消</router-link>
      <span class="time">{{time}}s</span>
    </div>
    <div class="container">
      <p>因场馆方相关规定，在您购票前需要验证您的身份，谢谢您的配合！</p>
      <h6>请将身份证放到识别区</h6>
      <div class="imgBox">
        <img src="../../../static/images/id.gif" alt>
      </div>
    </div>
    <!-- 验证读取结果 -->
    <div class="yanzheng" v-if="yanzheng">信息读取中，请稍后</div>
  </div>
</template>

<script>
export default {
  name: 'realName',
  data() {
    return {
      time: 119,
      yanzheng: false,
      timer: null,
      id: this.$route.query.id,
      totalMoney: this.$route.query.totalMoney,
      ticketNumber: this.$route.query.ticketNumber,
      socket: new WebSocket('ws://172.19.4.142:8080/printTicket/websocket')
    }
  },
  created() {
    this.getTime()
    this.webSocket()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.socket.close()
  },
  methods: {
    webSocket() {
      // 建立websocket连接
      if (typeof WebSocket == 'undefined') {
        this.$message({
          showClose: true,
          message: '系统故障，请联系工作人员',
          type: 'error'
        })
      } else {
        //打开事件
        this.socket.onopen = () => {
          console.log('已打开')
        }
        //获得消息事件
        this.socket.onmessage = res => {
          console.log(res)
          this.socket.close()
          let dataObj = JSON.parse(res.data)
          // 拿到获取的身份信息 跳转页面
          this.$router.push({
            name: 'payment',
            query: {
              id: this.id,
              totalMoney: this.totalMoney,
              ticketNumber: this.ticketNumber,
              userName: dataObj.name
            }
          })
        }
        //关闭事件
        this.socket.onclose = () => {}
        //发生了错误事件
        this.socket.onerror = () => {
          this.$message({
            showClose: true,
            message: '网络繁忙，请稍后再试',
            type: 'error'
          })
        }
      }
    },
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
#realName {
  overflow: hidden;
  width: 100%;
  height: 6.09rem;
  background-color: #fff;
}
.topBox {
  position: relative;
  padding-top: 0.33rem;
}
.topBox p {
  padding-bottom: 0.59rem;
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
  text-align: center;
  text-decoration: none;
  font-size: 26px;
  color: #fff;
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
  margin-top: 60px;
  text-align: center;
}
.container p {
  font-size: 20px;
  color: #333;
}
.container h6 {
  font-size: 30px;
  color: #000;
  margin: 36px 0 30px;
}
.container .imgBox {
  width: 2.54rem;
  height: 2.65rem;
  margin: 0 auto;
}
.container .imgBox img {
  width: 100%;
}
</style>

