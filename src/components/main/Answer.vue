<template>
  <div>
    <a class="fuwatto_btn_yellow" @click="start">シャッフル開始</a>
  </div>
</template>

<script>
import Mixin from "@/mixins";

export default {
  name: "Answer",
  methods: {
    start() {
      this.gameStart();
    }
  },
  mixins: [Mixin]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fuwatto_btn_yellow {
  display: block;
  background-color: #ffc60580;
  color: #fff;
  margin: 0px auto;
  padding: 0.5em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;
  position: relative;
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
