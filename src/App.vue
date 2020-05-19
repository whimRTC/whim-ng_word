<template>
  <div id="app">
    <Main class="main" />

    <Player
      v-for="user in $store.state.users"
      :key="user.id"
      class="box"
      :class="`pos${user.positionNumber}`"
      :displayUser="user"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Main: () => import("@/components/main/Index"),
    Player: () => import("@/components/player/Index")
  },
  mounted() {
    // for standalone devtools
    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute("src", "http://localhost:8098");
    // document.head.appendChild(recaptchaScript);
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  text-align: center;
  background: rgba(256, 256, 256, 0.7);
  z-index: 1;
  border-radius: 10px;
}

.box {
  width: 50%;
  height: 50%;
  position: absolute;
  text-align: center;

  &.pos1 {
    top: 0%;
    left: 0%;
  }

  &.pos2 {
    top: 0%;
    left: 50%;
  }

  &.pos3 {
    top: 50%;
    left: 0%;
  }

  &.pos4 {
    top: 50%;
    left: 50%;
  }
}
</style>

<style lang="scss">
.text {
  font-family: "Noto Sans JP", sans-serif;
  &--title {
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
  }
  &--subtitle {
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
  }
  &--body {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
  }
  &--annotation {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
  }
}
</style>
