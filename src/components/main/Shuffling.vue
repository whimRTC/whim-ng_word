<template>
  <div>
    <a class="fuwatto_btn_yellow">シャッフル中...</a>
  </div>
</template>

<script>

export default {
  name: 'Shuffling',
  mounted() {
    setTimeout(() => {this.$store.dispatch('phase', 'discussing')}, 2000)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select {
  margin: 10px
}

.icon {
  width:40px;
  height:40px;
  vertical-align: middle;
}

.select_text{
  width: 200px;
  display: inline-block;
  vertical-align: middle;
}

.fuwatto_btn_yellow{
  display: block;
  background-color: #000000;
  color: #FFF;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  transition: .3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform : translate(-50%,-50%);
  width: 140px;
  text-align: center;/*一応BOX内の文字も中央寄せ*/
}
</style>
