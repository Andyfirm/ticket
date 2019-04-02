<template>
  <div class="bann">
    <swipe class="my-swipe">
      <swipe-item class="slide1"></swipe-item>
      <swipe-item class="slide2"></swipe-item>
      <swipe-item class="slide3"></swipe-item>
      <swipe-item class="slide4"></swipe-item>
    </swipe>
    <img class="logo" src="/static/images/logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'banner',
  data() {
    return {}
  }
}
</script>

<style scoped>
@import 'vue-swipe/dist/vue-swipe.css';
.my-swipe {
  width: 100%;
  height: 5.05rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.slide1 {
  background: url('/static/images/banner1.png') no-repeat center/cover;
  color: #fff;
}
.slide2 {
  background: url('/static/images/banner2.png') no-repeat center/cover;
  color: #000;
}
.slide3 {
  background: url('/static/images/banner3.png') no-repeat center/cover;
  color: #fff;
}
.slide4 {
  background: url('/static/images/banner4.png') no-repeat center/cover;
  color: #fff;
}
.contentBox {
  width: 100%;
  height: 100%;
  padding: 18% 24%;
  box-sizing: border-box;
}
.logo {
  position: absolute;
  right: 0.36rem;
  bottom: 0.5rem;
  width: 2.62rem;
  height: 0.43rem;
  z-index: 1;
}
</style>
