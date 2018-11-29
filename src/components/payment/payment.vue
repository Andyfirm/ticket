<template>
  <div id="payment">
    <div class="topBox">
      <router-link
        :to="{name: 'buyTicket'}"
        class="back"
      >取消</router-link>
      <p>请选择支付方式</p>
      <span class="time">{{time}}s</span>
    </div>
    <!-- 会员卡选择区域 -->
    <div class="paymentMode">
      <div
        class="wx"
        @click="wxSelect"
      >
        <div
          class="icon_wx"
          v-show="wx === false"
        ><img
            src="/static/images/wx.png"
            alt=""
          ></div>
        <div
          class="icon_wx"
          v-show="wx === true"
        ><img
            src="/static/images/wx1.png"
            alt=""
          ></div>
      </div>
      <div
        class="zfb"
        @click="zfbSelect"
      >
        <div
          class="icon_zfb"
          v-show="zfb === false"
        ><img
            src="/static/images/zfb.png"
            alt=""
          ></div>
        <div
          class="icon_zfb"
          v-show="zfb === true"
        ><img
            src="/static/images/zfb1.png"
            alt=""
          ></div>
      </div>
      <div
        class="hyk"
        @click="hykSelect"
      >
        <div
          class="icon_hyk"
          v-show="hyk === false"
        ><img
            src="/static/images/hyk.png"
            alt=""
          ></div>
        <div
          class="icon_hyk"
          v-show="hyk === true"
        ><img
            src="/static/images/hyk1.png"
            alt=""
          ></div>
      </div>
    </div>
    <!-- 二维码 -->
    <div
      class="qrcodehyk"
      v-if="!wx && !zfb && !hyk"
    ></div>
    <div
      class="qrcode"
      v-if="wx"
    >
      请将微信付款码放置下方扫描窗口
      <img
        src="/static/images/wxpay.gif"
        alt=""
      >
      <!-- 隐藏域文本输入 -->
      <input
        type="text"
        class="hykInput"
        ref="hykInput"
        @keyup="autoComplete($event,'wx')"
      >
    </div>
    <div
      class="qrcode"
      v-if="zfb"
    >
      请将支付宝付款码放置下方扫描窗口
      <img
        src="/static/images/Alipay.gif"
        alt=""
      >
      <!-- 隐藏域文本输入 -->
      <input
        type="text"
        class="hykInput"
        ref="hykInput"
        @keyup="autoComplete($event,'zfb')"
      >
    </div>
    <div
      class="qrcodehyk"
      v-if="hyk"
    >
      请将会员卡放到识别区
      <div class="img"><img
          src="/static/images/carddiscern.gif"
          alt=""
        ></div>
      <!-- 隐藏域文本输入 -->
      <input
        type="text"
        class="hykInput"
        ref="hykInput"
        @keyup="autoComplete($event,'hyk')"
      >
    </div>
    <!-- 说明 -->
    <p class="shuoming">订单已生成，请尽快支付</p>
    <!-- 验证支付结果 -->
    <div
      class="yanzheng"
      v-if="yanzheng"
    >正在验证支付结果，请稍后</div>
  </div>
</template>

<script>
export default {
  name: 'payment',
  data() {
    return {
      time: 119,
      yanzheng: false,
      paymentSuccess: true,
      wx: false,
      zfb: false,
      hyk: true,
      id: this.$route.query.id,
      totalMoney: this.$route.query.totalMoney,
      ticketNumber: this.$route.query.ticketNumber,
      ticketInfo: '',
      timer: null,
      isOpen: true
    }
  },
  created() {
    this.getTime()
    this.setDataFormat()
    setTimeout(() => {
      this.$refs.hykInput.focus()
    }, 100)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 将得到的idpush后转换成后台需要的格式
    setDataFormat() {
      let arr = []
      let obj = { ticketId: this.id }
      for (let i = 0; i < this.ticketNumber; i++) {
        arr.push(obj)
      }
      this.ticketInfo = JSON.stringify(arr)
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
    },
    wxSelect() {
      this.wx = true
      this.zfb = false
      this.hyk = false
      setTimeout(() => {
        this.$refs.hykInput.focus()
      }, 100)
    },
    zfbSelect() {
      this.wx = false
      this.zfb = true
      this.hyk = false
      setTimeout(() => {
        this.$refs.hykInput.focus()
      }, 100)
    },
    hykSelect() {
      this.wx = false
      this.zfb = false
      this.hyk = true
      setTimeout(() => {
        this.$refs.hykInput.focus()
      }, 100)
    },
    // 支付
    async autoComplete(event, str) {
      if (event.keyCode === 13 && this.isOpen) {
        this.isOpen = false
        let value = event.target.value
        event.target.value = null
        this.yanzheng = true
        if (str === 'wx') {
          let reg = /^([1][0|1|2|3|4|5])/
          let regValue = reg.test(value)
          if (regValue) {
            const { data: res } = await this.$http.get('taiji/passivePay', {
              params: {
                num: this.ticketNumber,
                total: this.totalMoney,
                authcode: value,
                ticketInfo: this.ticketInfo,
                payType: 'wx'
              }
            })
            console.log(res)
            this.yanzheng = false
            this.isOpen = true
            if (res.msg === 'success') {
              clearInterval(this.timer)
              this.$router.push({ name: 'succeed', query: { data: res.data } })
            } else {
              this.$message.error('支付失败')
            }
          } else {
            this.$message.error('二维码错误')
            this.yanzheng = false
            this.isOpen = true
          }
        }
        if (str === 'zfb') {
          let reg = /^([2][5|6|7|8|9])/
          let reg1 = /^([3][0])/
          let regValue = reg.test(value)
          let regValue1 = reg1.test(value)
          if (regValue || regValue1) {
            const { data: res } = await this.$http.get('taiji/passivePay', {
              params: {
                num: this.ticketNumber,
                total: this.totalMoney,
                authcode: value,
                ticketInfo: this.ticketInfo,
                payType: 'zfb'
              }
            })
            console.log(res)
            this.yanzheng = false
            this.isOpen = true
            if (res.msg === 'success') {
              clearInterval(this.timer)
              this.$router.push({ name: 'succeed', query: { data: res.data } })
            } else {
              this.$message.error('支付失败')
            }
          } else {
            this.$message.error('二维码错误')
            this.yanzheng = false
            this.isOpen = true
          }
        }
        if (str === 'hyk') {
          const { data: res } = await this.$http.get('taiji/memberBuyTicket', {
            params: {
              total: this.totalMoney,
              Cardindex: value,
              ticketInfo: this.ticketInfo
            }
          })
          console.log(res)
          this.yanzheng = false
          this.isOpen = true
          if (res.msg === 'success') {
            clearInterval(this.timer)
            this.$router.push({ name: 'succeed', query: { data: res.data } })
          } else {
            this.$message.error(res.data)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
#payment {
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
  font-size: 30px;
  line-height: 30px;
  color: #333;
  text-align: center;
  padding-bottom: 0.59rem;
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
.paymentMode {
  width: 100%;
  height: 1.05rem;
  padding: 0 1.13rem;
  box-sizing: border-box;
  margin-bottom: 0.45rem;
}
.paymentMode > div {
  float: left;
}
.paymentMode p {
  font-size: 16px;
  color: #999;
}
.qrcode {
  width: 100%;
  height: 2rem;
  font-size: 30px;
  text-align: center;
  margin: 0 auto 0.45rem;
  border-radius: 8px;
}
.qrcode img {
  width: 5rem;
  height: 2.5rem;
  margin: 0 auto;
}
.qrcodehyk {
  height: 2rem;
  font-size: 30px;
  color: #000;
  text-align: center;
  margin: 0 auto 0.45rem;
}
.shuoming {
  font-size: 30px;
  color: #333;
  text-align: center;
}
.yanzheng {
  position: absolute;
  bottom: 1.05rem;
  left: 0;
  width: 100%;
  height: 7.09rem;
  line-height: 7.09rem;
  font-size: 26px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.55);
}
.wx {
  width: 1.45rem;
  height: 1.45rem;
}
.zfb {
  width: 1.45rem;
  height: 1.45rem;
  margin: 0 0.4rem;
}
.hyk {
  width: 1.45rem;
  height: 1.45rem;
}
img {
  width: 100%;
}
.hykInput {
  outline: none;
  border: 0;
  color: #fff;
  position: absolute;
}
.img {
  width: 3rem;
  height: 1.5rem;
  margin: 0.3rem auto;
}
img {
  width: 100%;
  display: block;
}
</style>
