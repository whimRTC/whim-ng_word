<template>
  <div class="container" :class="containerClass" @click="vote">
    <div v-if="status === 'hidden'" class="card hidden">
      NGワード
    </div>
    <div v-else-if="status === 'shuffling'" class="card">
      <img :src="require('@/assets/shuffling.gif')" class="shuffling" />
    </div>
    <div v-else-if="status === 'visible'" class="card">
      <span class="text--subtitle">{{
        appState.ngWord[displayUser.id]
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Player",
  props: ["displayUser"], // 表示されているUserの情報
  computed: {
    phase() {
      return this.$store.getters.phase
    },
    isMe() {
      return this.displayUser.id === this.$store.getters.accessUser.id
    },
    appState() {
      return this.$store.state.appState
    },
    status() {
      console.log(this.$store.getters.accessUser);
      if (this.$store.getters.phase === "shuffling") {
        return "shuffling";
      }
      if  (this.phase === "playing" && !this.isMe || this.phase === "answer" ) {
        return "visible";
      }
      return "hidden";
    },
    voted() {
      return this.$store.state.appState.votes?.some(
        vote =>
          vote.from === this.$store.state.accessUserId &&
          vote.to === this.displayUser.id
      );
    },
    votedNames() {
      const votes = this.$store.state.appState.votes;
      if (!votes || this.$store.getters.phase === "voting") {
        return [];
      }

      return votes
        .filter(vote => vote.to === this.displayUser.id)
        .map(
          vote =>
            this.$store.state.users.find(user => user.id === vote.from).name
        );
    },
    containerClass() {
      if (this.$store.getters.phase === "voting") {
        if (this.voted) {
          return "voted";
        }
        if (
          this.$store.state.appState.votes?.some(
            vote => vote.from === this.$store.state.accessUserId
          )
        ) {
          return "";
        }
        return "voting";
      }
      return "";
    }
  },
  methods: {
    vote() {
      if (this.$store.getters.phase === "voting" && !this.voted) {
        this.$store.dispatch("vote", {
          from: this.$store.state.accessUserId,
          to: this.displayUser.id
        });
        // 終了判定
        if (
          this.$store.state.appState.votes.length >=
          this.$store.state.users.length
        ) {
          this.$store.dispatch("phase", "disclosuring");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.vote {
  display: none;
  color: white;
}

.voted {
  background: rgba(0, 0, 0, 0.4);
  .vote {
    display: block;
  }
}

.voting {
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    .vote {
      display: block;
    }
  }
}

.card {
  margin: 80px auto;
  width: 300px;
  height: 50px;

  border-radius: 4px;
  position: relative;
  background: #ffffff;
  text-align: center;

  .shuffling {
    width: 300px;
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
.names {
  position: absolute;
  bottom: 0;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
}
.name {
  background: rgba(256, 256, 256, 0.4);
  border-radius: 8px;
  border: medium solid #000000;
  margin: 0px;
  font-size: 20px;
  width: 200px;
}
</style>
