<template>
  <div id="xfjl">
    <div class="contentBox">
      <ul v-if="list.length!==0" class="ticketInfo">
        <li v-for="(item,index) of list" :key="item.ticketId" @click="selected(index,item.selected,item.ticketId)">
          <p class="codeBox">订单号：{{item.billNum}}</p>
          <div class="li_content">
            <div class="name">{{item.Itemname}}</div>
            <div class="gettime">{{item.acTime}}</div>
            <div class="money">￥{{item.price}}</div>
          </div>
        </li>
      </ul>
      <!-- 为空的提示语 -->
      <div v-if="list.length===0" class="marked">
        您最近暂无任何消费记录
      </div>
      <div v-if="list.length!==0" class="pageBox">
        <!-- 分页器 -->
        <el-pagination background layout="prev, pager, next" :total="num" :page-size="5" prev-text="上一页" next-text="下一页" @current-change="getPageList">
        </el-pagination>
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
      num: null,
      list: []
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    async getPageList(pageNum) {
      let pageNums = pageNum - 1 || 0
      const { data: res } = await this.$http.get('taiji/getInfAcByCard', {
        params: {
          cardIndex: this.cardIndex,
          pageNo: pageNums,
          pageSize: 5
        }
      })
      if (res.msg === 'success') {
        this.num = res.data.num
        this.list = res.data.acInfo
      } else {
        this.$message.error('网络不稳定，请稍后再试')
      }
    }
  }
}
</script>

<style scoped>
#xfjl {
  width: 100%;
}
.contentBox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.2rem 0;
  box-sizing: border-box;
}
.ticketInfo {
  font-size: 20px;
  color: #333;
  height: 3.67rem;
}
.ticketInfo li {
  position: relative;
  overflow: hidden;
  height: 0.65rem;
  line-height: 0.65rem;
  padding: 0.125rem 0.18rem 0;
  margin-bottom: 0.1rem;
  background-color: #eee;
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
  margin: 0 0 0 1.48rem;
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
.codeBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.25rem;
  line-height: 0.25rem;
  font-size: 14px;
  color: #fff;
  padding: 0 0.18rem;
  background-color: #f39800;
  box-sizing: border-box;
}
.el-pagination {
  float: right;
  margin-top: 0.06rem;
}
.btn-next {
  margin-right: 0;
  margin-left: 0.05rem;
}
.marked {
  font-size: 40px;
  text-align: center;
  margin-top: 1.6rem;
  color: #ccc;
}
</style>
