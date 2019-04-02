<template>
  <div id="myfooter">
    <div>
      <p ref="scrolltext">如有问题请联系我们：010-12345678</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myfooter',
  data() {
    return {}
  },
  mounted() {
    this.scrolltext()
  },
  methods: {
    // 轮播文字
    scrolltext() {
      let scrolltext = this.$refs.scrolltext
      let num = 0
      let boxWidth = scrolltext.offsetWidth / 100
      let boundary = -5.42 - boxWidth
      setInterval(() => {
        num = num - 0.008
        scrolltext.style.transform = 'translateX(' + num + 'rem)'
        if (num <= boundary) num = 0
      }, 30)
    }
  }
}
</script>

<style scoped>
#myfooter {
  width: 100%;
  height: 1.05rem;
  background: rgba(0, 71, 157, 0.5);
  box-sizing: border-box;
}
#myfooter > div {
  position: relative;
  width: 100%;
  height: 100%;
}
#myfooter p {
  position: absolute;
  top: 50%;
  left: 7.42rem;
  margin-top: -20px;
  font-size: 40px;
  white-space: nowrap;
  color: #fff;
}
</style>
