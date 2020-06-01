<template>
  <div class="container">
    <countdown
      :time="10 * 60 * 1000"
      @end="goAnswer"
      class="countdown"
      :transform="transform"
      ref="countdown"
    >
      <template slot-scope="props"
        >{{ props.minutes }}:{{ props.seconds }}</template
      >
    </countdown>
    <div class="fuwatto_btn yellow" @click="goAnswer">終了！</div>
  </div>
</template>

<script>
export default {
  name: "Playing",

  methods: {
    goAnswer() {
      this.$refs.countdown.abort();
      this.$whim.assignState({
        phase: "answer"
      });
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
.container {
  display: flex;
  justify-content: center;
}

.countdown {
  // display: inline-block;
  background: #000000;
  color: #fff;
  padding: 5px;
  margin: 0px;
  font: 40px "f5.6";
  width: 140px;
}

.fuwatto_btn {
  // display: inline-block;

  color: #fff;
  padding: 0.6em;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;

  margin: auto 20px;
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
