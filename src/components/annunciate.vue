<template>
  <div id="annunciate">
    <div class="dateNav">
      <div class="text_l">{{date}}</div>
      <div class="text_r">{{time}}</div>
    </div>
    <div class="fb_bar">
      <span ref="scrolltext">欢迎光临太极体育中心</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'annunciate',
  data() {
    return {
      time: '',
      date: '',
      week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },
  mounted() {
    this.scrolltext()
    this.getDateTime()
  },
  methods: {
    scrolltext() {
      let scrolltext = this.$refs.scrolltext
      let num = 0
      let boxWidth = scrolltext.offsetWidth / 100
      let boundary = -7 - boxWidth
      setInterval(() => {
        num = num - 0.008
        scrolltext.style.transform = 'translateX(' + num + 'rem)'
        if (num < boundary) num = 0
      }, 30)
    },
    getDateTime() {
      setInterval(this.updateTime, 1000)
      this.updateTime()
    },
    updateTime() {
      let cd = new Date()
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2)
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        '-' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '-' +
        this.zeroPadding(cd.getDate(), 2) +
        ' ' +
        this.week[cd.getDay()]
    },
    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style scoped>
@import '../assets/font/font.css';
.dateNav {
  overflow: hidden;
  width: 100%;
  height: 0.66rem;
  background: rgba(0, 71, 157, 0.8);
  padding: 0 0.35rem;
  box-sizing: border-box;
  font-size: 20px;
  color: #fff;
}
.text_l {
  float: left;
  margin-top: 0.23rem;
}
.text_r {
  float: right;
  margin-top: 0.23rem;
  font-size: 26px;
  font-weight: 700;
  font-family: 'timeText';
}
.fb_bar {
  position: relative;
  padding-top: 0.09rem;
  width: 100%;
  height: 0.34rem;
  font-size: 16px;
  color: #fff;
  background-color: rgba(235, 97, 0, 0.77);
  box-sizing: border-box;
}
.fb_bar span {
  position: absolute;
  left: 7.42rem;
  white-space: nowrap;
}
</style>
