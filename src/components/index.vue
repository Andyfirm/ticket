<template>
  <div id="index_container">
    <div class="contentBox">
      <div class="content">
        <div class="img1">
          <router-link :to="{name: 'buyTicket'}"><img
              src="/static/images/gp.png"
              alt=""
            ></router-link>
          <p>购票</p>
          <router-link :to="{name: 'memberDiscern', query: {type: 'chaxun'}}"><button class="btn_check">会员信息查询</button></router-link>
        </div>
        <div class="img2">
          <router-link :to="{name: 'getTicketType', query: {type: 'qupiao'}}"><img
              src="/static/images/qp.png"
              alt=""
            ></router-link>
          <p>取票</p>
          <button class="btn_free">领取优惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  created() {}
}
</script>

<style scoped>
#index_container {
  overflow: hidden;
  width: 100%;
  height: 6.09rem;
}
.contentBox {
  width: 100%;
  height: 6.1rem;
  padding: 0.77rem 1.59rem;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  /* background-color: skyblue; */
}
.content > div {
  overflow: hidden;
}
.content p {
  margin-top: 26.4%;
  font-size: 36px;
  text-align: center;
}
.content .img1 {
  float: left;
}
.content .img2 {
  float: right;
}
.content button {
  outline: none;
  background: orange;
  border-radius: 15px;
  font-size: 20px;
  color: #fff;
  width: 100%;
  padding: 20px;
  margin-top: 70%;
  text-align: center;
}
</style>
