<template>
  <div id="qrcodeScan">
    <div class="topBox">
      <router-link
        :to="{name: 'getTicketType'}"
        class="back"
      >取消</router-link>
      <span class="time">{{time}}s</span>
    </div>
    <h6>请将二维码放到识别区</h6>
    <div class="card"><img
        src="/static/images/ticketScan.gif"
        alt=""
      ></div>
    <!-- 隐藏域文本输入 -->
    <input
      type="text"
      class="qrcodeInput"
      ref="qrcodeInput"
      @keyup="autoComplete($event)"
    >
    <!-- 验证支付结果 -->
    <div
      class="yanzheng"
      v-if="yanzheng"
    >正在读取信息，请稍后</div>
  </div>
</template>

<script>
export default {
  name: 'qrcodeScan',
  data() {
    return {
      time: 119,
      timer: null,
      yanzheng: false,
      isOpen: true
    }
  },
  created() {
    this.getTime()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted() {
    setTimeout(() => {
      this.$refs.qrcodeInput.focus()
    }, 100)
  },
  methods: {
    async autoComplete(event) {
      // 二维码取票请求
      if (event.keyCode === 13) {
        let value = event.target.value
        event.target.value = null
        this.yanzheng = true
        this.isOpen = false
        const { data: res } = await this.$http.get(
          'ticket/getTicketHistoryByCode',
          {
            params: { serialnumber: value, pageNo: 0, pageSize: 5 }
          }
        )
        this.isOpen = true
        if (res.msg === 'success') {
          // 若长度为1的话，请求成功后开始打印
          if (res.data.ticketInfo.length === 1) {
            let dataObj = {
              type: 'getTicket',
              ticketInfo: res.data.ticketInfo
            }
            this.$router.push({
              name: 'succeed',
              query: { data: dataObj, type: 'get' }
            })
          } else {
            // 大于1则跳转至分页
            let data = res.data
            for (let i = 0; i < data.ticketInfo.length; i++) {
              data.ticketInfo[i].selected = false // 手动添加选中的状态
            }
            clearInterval(this.timer)
            this.$router.push({
              name: 'getTicket',
              query: { serialnumber: value, data, type: 'qrcode' }
            })
          }
        } else {
          this.yanzheng = false
          this.$message.error(res.data)
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
#qrcodeScan {
  position: relative;
  width: 100%;
  height: 6.1rem;
  background-color: #fff;
}
.topBox {
  position: relative;
  height: 1rem;
  padding-top: 0.33rem;
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
  text-align: center;
  text-decoration: none;
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
h6 {
  line-height: 42px;
  margin-bottom: 0.85rem;
  font-size: 42px;
  text-align: center;
  font-weight: 500;
  color: #000;
}
.card {
  width: 5rem;
  height: 2.5rem;
  margin: 0 auto;
}
.card img {
  width: 100%;
}
.qrcodeInput {
  position: absolute;
  outline: none;
  border: 0;
  color: #fff;
}
.yanzheng {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 7.1rem;
  line-height: 7.1rem;
  font-size: 26px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
