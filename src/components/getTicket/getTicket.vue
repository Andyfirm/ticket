<template>
  <div id="getTicket">
    <div class="topBox">
      <router-link :to="{name: 'index'}" class="back">取消</router-link>
      <p>请选择要打印的票</p>
      <span class="time">{{time}}s</span>
    </div>
    <div class="container">
      <div class="contentBox">
        <ul v-if="list.length!==0" class="ticketInfo">
          <li v-for="(item,index) of list" :key="item.ticketId" @click="selected(index,item.selected,item.ticketId)">
            <div class="name">{{item.ticketName}}</div>
            <div class="icon" :class="{selected: item.selected === true}"></div>
            <div class="gettime">{{item.printingTime}}</div>
            <div class="money">￥{{item.ticketPrice}}</div>
          </li>
        </ul>
        <!-- 为空的提示语 -->
        <div v-if="list.length===0" class="marked">
          暂无购买记录
        </div>
        <div v-if="list.length!==0" class="pageBox">
          <div class="qbxz" @click="qbxz">全部选择</div>
          <div class="qbqx" @click="qbqx">全部取消</div>
          <!-- 分页器 -->
          <el-pagination background layout="prev, pager, next" :total="num" :page-size="5" prev-text="上一页" next-text="下一页" @current-change="getPageList">
          </el-pagination>
        </div>
        <button v-if="list.length!==0" id="btn" @click="print">打印</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getTicket',
  data() {
    return {
      cardIndex: this.$route.query.cardIndex,
      time: 119,
      i: null,
      num: this.$route.query.data.num,
      list: this.$route.query.data.ticketInfo,
      selectList: [],
      timer: null
    }
  },
  created() {
    this.getTime()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async getPageList(pageNum) {
      const { data: res } = await this.$http.get('taiji/getTicketHistoryByCard', {
        params: { cardIndex: this.cardIndex, pageNo: pageNum - 1, pageSize: 5 }
      })
      if (res.msg === 'success') {
        let data = res.data
        for (let i = 0; i < data.ticketInfo.length; i++) {
          data.ticketInfo[i].selected = false
          for (let j = 0; j < this.selectList.length; j++) {
            if (data.ticketInfo[i].ticketId === this.selectList[j].ticketId) {
              data.ticketInfo[i].selected = true
            }
          }
        }
        this.num = data.num
        this.list = data.ticketInfo
      }
    },
    // 打印
    async print() {
      let dataObj = {
        type: 'getTicket',
        ticketInfo: this.selectList
      }
      this.$router.push({ name: 'succeed', query: { data: dataObj, type: 'get' } })
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
    selected(index, selected, id) {
      if (selected === false) {
        this.list[index].selected = true
        // 将当前数据追加到新数组中
        this.selectList.push(this.list[index])
      } else {
        this.list[index].selected = false
        // 过滤掉所选择的数据
        this.selectList = this.selectList.filter(item => {
          return item.ticketId !== this.list[index].ticketId
        })
      }
      console.log(this.selectList)
    },
    // 全选
    qbxz() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].selected = true
        // 预留追加所需数据到新数组中
        this.selectList.push(this.list[i])
      }
      let arr = this.selectList
      let len = arr.length
      for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].ticketId === arr[j].ticketId) {
            arr.splice(j, 1)
            j--
          }
        }
      }
      this.selectList = arr
      console.log(this.selectList)
    },
    // 取消全选
    qbqx() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].selected = false
      }
      // 去除掉本页所需数据
      for (let j = 0; j < this.list.length; j++) {
        this.selectList = this.selectList.filter(item => {
          return item.ticketId !== this.list[j].ticketId
        })
      }
      console.log(this.selectList)
    }
  }
}
</script>

<style scoped>
#getTicket {
  width: 100%;
  background-color: #fff;
}
.topBox {
  position: relative;
  height: 0.47rem;
  padding-top: 0.33rem;
}
.topBox p {
  font-size: 30px;
  line-height: 30px;
  color: #333;
  text-align: center;
  padding-bottom: 0.22rem;
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
  padding: 0 1.43rem;
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
.container {
  width: 100%;
  height: 5.3rem;
  padding: 0 0.35rem 0.35rem;
  box-sizing: border-box;
}
.contentBox {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 0.2rem;
  box-sizing: border-box;
}
.ticketInfo {
  font-size: 20px;
  color: #333;
  height: 3.78rem;
}
.ticketInfo li {
  height: 0.65rem;
  line-height: 0.55rem;
  padding: 0 0.18rem;
  margin-bottom: 0.1rem;
  background-color: #eee;
  border-top: 0.1rem solid #f39800;
  box-sizing: border-box;
}
.ticketInfo li .name {
  float: left;
}
.ticketInfo li .money,
.ticketInfo li .gettime,
.ticketInfo li .icon {
  float: right;
}
.ticketInfo li .gettime {
  margin: 0 0.48rem 0 1.1rem;
}
.icon {
  width: 0.26rem;
  height: 0.26rem;
  margin-top: 0.145rem;
  background: url('/static/images/disselect.png') no-repeat center/contain;
}
.icon.selected {
  background: url('/static/images/selected.png') no-repeat center/contain;
}
.pageBox {
  overflow: hidden;
  font-size: 16px;
  color: #fff;
}
.qbxz,
.qbqx {
  float: right;
  width: 0.6rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  background-color: #f39800;
  border-radius: 3px;
}
.qbqx {
  margin: 0 0.2rem;
}
#btn {
  display: block;
  outline: none;
  width: 0.9rem;
  height: 0.45rem;
  margin: 0.04rem auto 0;
  font-size: 26px;
  color: #fff;
  background-color: #f39800;
  border: 0;
  border-radius: 8px;
}
.marked {
  font-size: 40px;
  text-align: center;
  margin-top: 1.6rem;
  color: #ccc;
}
</style>
