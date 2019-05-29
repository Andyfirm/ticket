<template>
  <div id="personalInfo">
    <ul>
      <li>
        <div class="left">姓名</div>
        <div class="right">{{data.name}}</div>
      </li>
      <li>
        <div class="left">卡号</div>
        <div class="right">{{data.cardIndex}}</div>
      </li>
      <li>
        <div class="left">余额</div>
        <div class="right">￥{{data.cardCash}}</div>
      </li>
      <li>
        <div class="left">绑定手机号</div>
        <div class="right">{{data.mobile}}</div>
      </li>
      <li>
        <div class="left">开卡日期</div>
        <div class="right">{{data.buyTime}}</div>
      </li>

      <li style="height:auto;display: flex;justify-content: space-between;align-items:center;" v-if="data.project">
        <div style="color:#1f68bf;float:left;">项目余次</div>
        <div style="float:right;">
          <div style="color: #666;" v-for="(item, index) of data.project" :key="index">{{item.type}}: {{item.num}}次</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'personalInfo',
  data() {
    return {
      data: {},
      cardIndex: this.$route.query.cardIndex
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { data: res } = await this.$http.get('ticket/getInfAcdByCard', {
        params: { cardIndex: this.cardIndex }
      })
      if (res.msg === 'success') {
        this.data = res.data
      }
    }
  }
}
</script>

<style scoped>
#personalInfo {
  width: 100%;
}
#personalInfo li {
  overflow: hidden;
  font-size: 26px;
  height: 0.82rem;
  line-height: 0.82rem;
  padding: 0 0.45rem;
  border-bottom: 1px solid #dcdcdc;
  box-sizing: border-box;
}
#personalInfo li .left {
  float: left;
  color: #1f68bf;
}
#personalInfo li .right {
  float: right;
  color: #666;
}
</style>
