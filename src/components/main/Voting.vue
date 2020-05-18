<template>
  <div>
    <div class="text--subtitle title">
      ウルフだと思うプレイヤー画面を選択しよう。
    </div>

    <progress id="video-progress" min="0" max="1000" value=""></progress>
  </div>
</template>

<script>
export default {
  name: "Discussing",
  data() {
    return {};
  },
  mounted() {
    var progressBar = document.getElementById("video-progress");

    var curr = progressBar.value;
    var update = setInterval(() => {
      if (curr > 1000) {
        clearInterval(update);
        this.finishVoting();
        // 他の人が終わらせた場合
      } else if (this.$store.getters.phase !== "voting") {
        clearInterval(update);
      }
      progressBar.value = curr++;
    }, 20);
  },
  methods: {
    finishVoting() {
      // 二重の遷移が起こらないように
      this.$store.dispatch("phase", "disclosuring");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  margin: 10px;
}

#video-progress {
  border: none;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 10px;
  width: 100%;
  z-index: 1;
}
</style>
