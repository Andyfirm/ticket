<template>
  <div id="succeed">
    <router-link :to="{name: 'index'}" class="back" v-if="success">首页</router-link>
    <div class="back" @click="back" v-else>取消</div>
    <div class="successBox">
      <div class="successimg" v-if="success">
        <img src="/static/images/success.gif" alt>
      </div>
      <div class="successimg" v-if="error">
        <img src="/static/images/error.png" alt>
      </div>
      <div class="successimg" v-if="success === false">
        <img src="/static/images/success1.gif" alt>
      </div>
      <span v-if="success">出票成功</span>
      <span v-if="error">出票失败</span>
      <span v-if="success === false&&type!=='get'">支付成功，正在出票</span>
      <span v-if="success === false&&type==='get'">正在出票</span>
    </div>
    <p class="tishi" v-if="success">请拿好您的票</p>
    <p class="tishi" v-if="error&&!jksbh">请联系服务人员</p>
    <p class="tishi error" v-if="error&&jksbh">打印二维码时出现错误
      <br>
      （错误码:{{jksbh}}）
      <br>请联系服务人员以获得帮助
    </p>
    <p class="tishi" v-if="success === false">正在打印，请稍候</p>
  </div>
</template>

<script>
export default {
  name: 'succeed',
  data() {
    return {
      success: false,
      error: false,
      data: this.$route.query.data,
      type: this.$route.query.type,
      jksbh: null,
      timeout: null
    }
  },
  created() {
    this.print()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    // 发送打印请求
    async print() {
      let dataStr = JSON.stringify(this.data)
      try {
        const { data: res } = await this.$http.post(
          'weixinPay?method=wechatpayment',
          this.qs.stringify({ data: dataStr }),
          {
            baseURL: 'http://172.19.5.154:8080/printTicket/' // 
          }
        )
        if (res.msg === 'success') {
          this.success = true
          this.timeout = setTimeout(() => this.$router.push({ name: 'index' }), 10000)
        } else if (res.msg === 'fail') {
          this.jksbh = res.jksbh
          this.error = true
          this.success = null
          this.timeout = setTimeout(() => this.$router.push({ name: 'index' }), 60000)
        }
      } catch (error) {
        this.jksbh = this.data.jksbh
        this.error = true
        this.success = null
      }
    },
    back() {
      // 预留进行取消操作
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>
#succeed {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 6.09rem;
  background-color: #fff;
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
.successBox {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1rem;
  padding: 0 1.9rem;
  margin-bottom: 2.19rem;
  margin-top: 1.94rem;
  box-sizing: border-box;
}
.successimg {
  float: left;
  width: 1rem;
  height: 1rem;
}
.successimg img {
  width: 100%;
}
.successBox span {
  float: left;
  margin-top: 0.32rem;
  margin-left: 0.36rem;
  font-size: 36px;
  line-height: 56px;
  color: #333;
}
.tishi {
  font-size: 30px;
  color: #333;
  text-align: center;
}
.tishi.error {
  margin-top: -1rem;
  line-height: 0.4rem;
}
</style>
