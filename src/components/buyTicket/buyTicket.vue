<template>
  <div id="buyTicket">
    <div class="contentBox">
      <div class="left_box">
        <router-link :to="{name: 'index'}" id="back">返回上一页</router-link>
        <p>{{tishiText}}</p>
      </div>
      <div class="top_box">
        <!-- 上侧项目一级选择 -->
        <ul class="top">
          <li v-if="item.tbWxTicketList.length!==0" v-for="(item,index) of topList" :key="item.id" :class="{bgyellow: iTop === index}" @click="selectTop(index,item.ticket_type,item.id)">{{item.ticket_type}}</li>
          <li v-if="item.tbWxTicketList.length===0" v-for="(item,index) of topList" :key="item.id" :class="{bgyellow: iTop === index}" style="background-color:#ccc;">{{item.ticket_type}}</li>
        </ul>
      </div>
      <!-- 中部项目二级选择 -->
      <div class="bottom_box">
        <ul class="bottom">
          <li v-for="(item,index) of bottomList" :key="index" :class="{bgblue: iBottom === index}" @click="selectBottom(index,item.name,item.price,item.id)">{{item.name}}</li>
        </ul>
        <div id="orderFrom" v-show="isShow">
          <div class="orderFrom_top">
            <!-- <div class="back_icon" @click="backOrder"></div> -->
            <h6>订单信息</h6>
          </div>
          <div class="content">
            <div class="xiangqing">
              <p>项目详情：</p>
              <span>数量</span>
            </div>
            <div class="ticketName">
              <span>{{ticketName}}</span>
              <div class="right_number">
                <div class="sub" @click="sub"><img :src="subImg" alt=""></div>
                <span class="text">{{number}}</span>
                <div class="add" @click="add"><img src="/static/images/add.png" alt=""></div>
              </div>
            </div>
            <p>结算详情：</p>
            <div class="ticketMoney">
              <span>￥{{money}}</span>
              <span class="right_number">x{{number}}</span>
            </div>
            <div id="totalMoney">总计：￥{{totalMoney}}</div>
          </div>
          <button id="comfirm" @click="paymentBtn">确认并支付</button>
          <button id="cancel" @click="backOrder">取 消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buyTicket',
  data() {
    return {
      topList: [],
      bottomList: [],
      iNumber: null,
      iTop: null,
      iBottom: null,
      number: 1,
      money: 0,
      id: '',
      tickeToptName: '',
      tickeBottomtName: '',
      subImg: '/static/images/sub - false.png',
      tishiText: '请选择项目'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('taiji/getAllTicketInfo')
      if (res.msg === 'success') {
        this.topList = res.data
      }
    },
    // 提交订单
    paymentBtn() {
      this.$router.push({
        name: 'payment',
        query: { id: this.id, totalMoney: this.totalMoney, ticketNumber: this.number }
      })
    },
    // 加减操作
    sub() {
      if (this.number <= 1) {
        this.number = 1
        this.subImg = '/static/images/sub - false.png'
      } else {
        this.number--
        if (this.number === 1) {
          this.subImg = '/static/images/sub - false.png'
        } else {
          this.subImg = '/static/images/sub.png'
        }
      }
    },
    add() {
      this.subImg = '/static/images/sub.png'
      this.number++
    },
    // 项目选择
    selectTop(index, item, id) {
      this.iTop = index
      this.iBottom = null
      this.tickeToptName = item
      this.tickeBottomtName = ''
      let List = this.topList.filter(item => {
        return item.id === id
      })
      this.bottomList = List[0].tbWxTicketList
      this.tishiText = '请选择票类型'
    },
    // 二级项目选择
    selectBottom(index, item, price, id) {
      this.iBottom = index
      this.tickeBottomtName = item
      this.money = price
      this.id = id
    },
    // 返回清空
    backOrder() {
      this.iTop = null
      this.iBottom = null
      this.number = 1
      this.tickeToptName = ''
      this.tickeBottomtName = ''
      this.bottomList = []
      this.tishiText = '请选择项目'
    }
  },
  computed: {
    // 订单显示
    isShow() {
      return this.iTop !== null && this.iBottom !== null
    },
    // 票拼接
    ticketName() {
      return this.tickeToptName + '----' + this.tickeBottomtName
    },
    // 价格总数计算
    totalMoney() {
      let total = this.money * this.number
      return total.toFixed(2)
    }
  }
}
</script>

<style scoped>
#buyTicket {
  overflow: hidden;
  width: 100%;
  height: 6.09rem;
}
.contentBox {
  position: relative;
  width: 100%;
  height: 6.1rem;
  box-sizing: border-box;
}
.left_box {
  position: relative;
  width: 100%;
  padding: 0.25rem 0.21rem 0 0.35rem;
  box-sizing: border-box;
}
.top_box {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 0.25rem;
  padding: 0 0.35rem;
  box-sizing: border-box;
}
.bottom_box {
  float: right;
  width: 100%;
  height: 4.75rem;
  padding: 0.15rem 0.35rem 0 0.35rem;
  box-sizing: border-box;
}
#back {
  position: absolute;
  display: block;
  width: 0.9rem;
  height: 0.45rem;
  line-height: 0.45rem;
  color: #fff;
  font-size: 14px;
  background: #f39800;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 0.24rem;
}
ul.top li {
  float: left;
  width: 0.9rem;
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background-color: #f39800;
  box-sizing: border-box;
  border-radius: 8px;
  margin-right: 0.26rem;
  margin-bottom: 0.2rem;
}
.bottom li {
  float: left;
  color: #fff;
  width: 0.9rem;
  height: 0.45rem;
  line-height: 0.45rem;
  margin-right: 0.26rem;
  margin-bottom: 0.1rem;
  text-align: center;
  font-size: 16px;
  border-radius: 8px;
  background-color: #00c8f3;
  box-sizing: border-box;
}
ul.top li:nth-child(6n) {
  margin-right: 0;
}
.bottom li:nth-child(6n) {
  margin-right: 0;
}
.top_box::after {
  position: absolute;
  left: 0.35rem;
  bottom: 0;
  width: 6.72rem;
  height: 0.05rem;
  content: '';
  display: block;
  background-color: #dcdcdc;
}
.bgblue {
  color: #fff !important;
  background-color: #2098ca !important;
}
.bgyellow {
  color: #fff !important;
  background-color: #33c482 !important;
}
#orderFrom {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 3.85rem;
  height: 4.2rem;
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 0 0.25rem;
  box-sizing: border-box;
}
.orderFrom_top {
  position: relative;
  overflow: hidden;
}
.orderFrom_top .back_icon {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -0.15rem;
  width: 0.3rem;
  height: 0.3rem;
  background: url('/static/images/back.png') no-repeat center/contain;
}
.orderFrom_top h6 {
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin: 0.22rem 0.09rem;
  color: #f39800;
}
.content p {
  font-size: 16px;
  color: #666;
}
.ticketName,
.ticketMoney {
  overflow: hidden;
  font-size: 16px;
  color: #666;
  line-height: 0.25rem;
  margin: 0.17rem 0 0.25rem 0;
}
.ticketName span,
.ticketMoney span {
  float: left;
}
.ticketName .right_number,
.ticketMoney .right_number {
  float: right;
}
.ticketMoney {
  margin: 0.17rem 0 0 0;
}
#totalMoney {
  text-align: right;
  font-size: 16px;
  color: #f39800;
  margin-top: 0.18rem;
}
#comfirm,
#cancel {
  position: absolute;
  bottom: 0.2rem;
  outline: none;
  border: 0;
  width: 1rem;
  height: 0.4rem;
  font-size: 16px;
  color: #fff;
  background-color: #00b7ee;
  border-radius: 8px;
}
#comfirm {
  right: 0.25rem;
}
#cancel {
  left: 0.25rem;
  background-color: #fc6f6f;
}
.sub,
.add {
  width: 0.25rem;
  height: 0.25rem;
  float: left;
}
.sub img,
.add img {
  width: 100%;
}
.sub,
.text,
.add {
  float: left;
}
.text {
  font-size: 22px;
  margin: 0 0.18rem;
}
.left_box {
  font-size: 30px;
}
.left_box p {
  margin-top: 0.05rem;
  margin-bottom: 0.34rem;
  color: #f39800;
  text-align: center;
}
.xiangqing {
  overflow: hidden;
}
.xiangqing p {
  float: left;
}
.xiangqing span {
  float: right;
  font-size: 16px;
}
</style>
