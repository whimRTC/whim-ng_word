<template>
  <div>
    <a class="fuwatto_btn_yellow" @click="start">シャッフル開始</a>
  </div>
</template>

<script>
export default {
  name: "Result",
  methods: {
    start() {
      this.$gameStart();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select {
  margin: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.select_text {
  width: 200px;
  display: inline-block;
  vertical-align: middle;
}

.fuwatto_btn_yellow {
  display: block;
  background-color: #ffc605;
  color: #fff;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  text-align: center; /*一応BOX内の文字も中央寄せ*/
}
.fuwatto_btn_yellow:hover {
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.12), 0 3px 20px 0 rgba(0, 0, 0, 0.12),
    0 5px 6px -2px rgba(0, 0, 0, 0.2);
}
</style>
