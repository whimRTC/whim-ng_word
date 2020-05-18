<template>
  <div class="container" @click="vote">
    <div v-if="status === 'hidden'" class="card hidden">
      <img :src="require('@/assets/wolf_icon.svg')" width="40" class="img" />
    </div>
    <div v-else-if="status === 'shuffling'" class="card">
      <img :src="require('@/assets/shuffling.gif')" class="shuffling" />
    </div>
    <div v-else-if="status === 'visible'" class="card">
      <span class="text--subtitle">{{
        $store.state.appState.userTopic[displayUser.id]
      }}</span>
    </div>
    <div v-else-if="status === 'wolf'" class="card wolf">
      <span class="text--subtitle">{{
        $store.state.appState.userTopic[displayUser.id]
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Player",
  props: ["displayUser"], // 表示されているUserの情報
  computed: {
    status() {
      console.log(this.$store.getters.accessUser);
      if (this.$store.getters.phase === "shuffling") {
        return "shuffling";
      }
      if (
        (this.$store.getters.phase === "discussing" ||
          this.$store.getters.phase === "voting" ||
          this.$store.getters.phase === "disclosuring") &&
        this.$store.getters.accessUser === this.displayUser
      ) {
        return "visible";
      }

      if (this.$store.getters.phase === "result") {
        if (this.$store.state.appState.minorityUserId === this.displayUser.id) {
          return "wolf";
        } else {
          return "visible";
        }
      }

      return "hidden";
    }
  },
  methods: {
    vote() {
      if (this.$store.getters.phase === "voting") {
        console.log("vote");
        this.$store.dispatch("vote", {
          from: this.$store.state.accessUserId,
          to: this.displayUser.id
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 100px auto;
  width: 200px;
  height: 50px;

  border-radius: 4px;
  position: relative;
  background: #ffffff;
  text-align: center;

  .shuffling {
    width: 200px;
    height: 50px;
  }
}

.hidden {
  background: #ffba49;
}
.wolf {
  background: #ffba49;
  color: white;
}

.img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto; /*上下左右中央に*/
  width: 40px; /*widthの指定は必須*/
  height: 40px; /*heightの指定は必須*/
}
</style>
