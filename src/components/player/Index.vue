<template>
  <div class="container" :class="containerClass" @click="vote">
    <div v-if="status === 'hidden'" class="card hidden">
      <span class="text--subtitle"> NGワード</span>
    </div>
    <div v-else-if="status === 'shuffling'" class="card">
      <img :src="require('@/assets/shuffling.gif')" class="shuffling" />
    </div>
    <div v-else-if="status === 'visible'" class="card">
      <span class="text--subtitle">{{ appState.ngWords[displayUser.id] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Player",
  props: {
    displayUser: Object // 表示されているUserの情報
  },
  computed: {
    phase() {
      return this.$whim.state.phase;
    },
    isMe() {
      return this.displayUser.id === this.$whim.accessUser.id;
    },
    appState() {
      return this.$whim.state;
    },
    status() {
      if (this.phase === "shuffling") {
        return "shuffling";
      }
      if ((this.phase === "playing" && !this.isMe) || this.phase === "answer") {
        return "visible";
      }
      return "hidden";
    },
    voted() {
      return this.appState.votes?.some(
        vote =>
          vote.from === this.$whim.accessUserId &&
          vote.to === this.displayUser.id
      );
    },
    votedNames() {
      const votes = this.appState.votes;
      if (!votes || this.phase === "voting") {
        return [];
      }

      return votes
        .filter(vote => vote.to === this.displayUser.id)
        .map(vote => this.$whim.users.find(user => user.id === vote.from).name);
    },
    containerClass() {
      if (this.phase === "voting") {
        if (this.voted) {
          return "voted";
        }
        if (
          this.appState.votes?.some(
            vote => vote.from === this.$whim.accessUserId
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
      if (this.phase === "voting" && !this.voted) {
        this.$gameVote({
          from: this.$whim.accessUserId,
          to: this.displayUser.id
        });
        // 終了判定
        if (this.appState.votes.length >= this.$whim.users.length) {
          this.$whim.assignState({
            phase: "disclosuring"
          });
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
