<template>
  <div id="app">
    <Main class="main" />

    <Player
      v-for="user in $whim.users"
      class="player"
      :key="user.id"
      :class="whimUserWindowClass(user)"
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
  position: relative;
  margin: 0px auto;
  text-align: center;
  z-index: 1;
  border-radius: 10px;
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
