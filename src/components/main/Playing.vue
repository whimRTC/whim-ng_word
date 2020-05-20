<template>
  <div>
    <div class="text--subtitle title">投票まで</div>
    <countdown
      :time="3 * 60 * 1000"
      @end="goAnswer"
      class="countdown"
      :transform="transform"
      ref="countdown"
    >
      <template slot-scope="props"
        >{{ props.minutes }}:{{ props.seconds }}</template
      >
    </countdown>
    <a class="fuwatto_btn yellow" @click="goAnswer">NGワード！</a>
    <a class="fuwatto_btn grey" @click="goAnswer">ALLシャッフル</a>
  </div>
</template>

<script>
export default {
  name: "Playing",

  methods: {
    goAnswer() {
      this.$refs.countdown.abort();
      this.$store.dispatch("phase", "answer");
    },

    transform(props) {
      props.seconds = props.seconds.toString().padStart(2, "0");
      return props;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select {
  margin: 10px;
}
.title {
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

.countdown {
  display: block;
  background: #000000;
  color: #fff;
  padding: 5px;
  margin: 10px auto;
  font: 40px "f5.6";
  width: 140px;
}

.fuwatto_btn {
  display: block;

  color: #fff;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;

  width: 140px;
  margin: 30px auto;
  text-align: center; /*一応BOX内の文字も中央寄せ*/

  &.yellow {
    background-color: #ffc605;
  }

  &.grey {
    background-color: #4b4b4b;
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.12),
      0 3px 20px 0 rgba(0, 0, 0, 0.12), 0 5px 6px -2px rgba(0, 0, 0, 0.2);
  }
}
</style>
