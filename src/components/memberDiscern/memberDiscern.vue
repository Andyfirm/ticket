<template>
  <div id="memberDiscern">
    <div class="topBox">
      <router-link :to="{name: 'getTicketType'}" class="back" v-if="type==='qupiao'">取消</router-link>
      <router-link :to="{name: 'index'}" class="back" v-else>取消</router-link>
      <span class="time">{{time}}s</span>
    </div>
    <h6>请将会员卡放到识别区</h6>
    <div class="card"><img src="/static/images/carddiscern.gif" alt=""></div>
    <!-- 隐藏域文本输入 -->
    <input type="text" class="hykInput" ref="hykInput" @keyup="autoComplete($event)">
    <!-- 验证支付结果 -->
    <div class="yanzheng" v-if="yanzheng">正在读取信息，请稍后</div>
  </div>
</template>

<script>
export default {
  name: 'memberDiscern',
  data() {
    return {
      time: 119,
      timer: null,
      yanzheng: false,
      type: this.$route.query.type
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
      this.$refs.hykInput.focus()
    }, 100)
  },
  methods: {
    // 读取会员卡信息
    async autoComplete(event) {
      if (event.keyCode === 13) {
        let value = event.target.value
        event.target.value = null
        this.yanzheng = true
        // 判断类型是否为取票
        if (this.type === 'qupiao') {
          // 验证卡号是否存在
          const { data: res1 } = await this.$http.get('ticket/getInfAcdByCard', {
            params: { cardIndex: value }
          })
          // 不存在 提示错误信息
          if (res1.msg === 'fail') {
            this.yanzheng = false
            this.$message.error(res1.data)
            return
          }
          // 存在 发送异步请求
          const { data: res } = await this.$http.get('ticket/getTicketHistoryByCard', {
            params: { cardIndex: value, pageNo: 0, pageSize: 5 }
          })
          this.yanzheng = false
          if (res.msg === 'success') {
            let data = res.data
            for (let i = 0; i < data.ticketInfo.length; i++) {
              data.ticketInfo[i].selected = false // 手动添加选中的状态
            }
            clearInterval(this.timer)
            this.$router.push({ name: 'getTicket', query: { cardIndex: value, data } })
          } else {
            this.$message.error(res.data)
          }
        }
        // 查询
        if (this.type === 'chaxun') {
          this.yanzheng = false
          // 验证卡号是否存在
          const { data: res } = await this.$http.get('ticket/getInfAcdByCard', {
            params: { cardIndex: value }
          })
          if (res.msg === 'success') {
            clearInterval(this.timer)
            this.$router.push({ name: 'information', query: { cardIndex: value } })
          } else {
            this.$message.error(res.data)
          }
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
#memberDiscern {
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
  top: 0.25rem;
  right: 0.35rem;
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #f39800;
}
h6 {
  margin-bottom: 0.85rem;
  font-size: 42px;
  line-height: 42px;
  font-weight: 500;
  color: #000;
  text-align: center;
}
.card {
  width: 5rem;
  height: 2.5rem;
  margin: 0 auto;
}
.card img {
  width: 100%;
}
.hykInput {
  position: absolute;
  outline: none;
  border: 0;
  color: #fff;
}
.yanzheng {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.1rem;
  line-height: 7.1rem;
  font-size: 26px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
