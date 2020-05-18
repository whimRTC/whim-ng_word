<template>
  <div>
    <Shuffling v-if="phase === 'shuffling'" />
    <Discussing v-else-if="phase === 'discussing'" />
    <Voting v-else-if="phase === 'voting'" />
    <Disclosuring v-else-if="phase === 'disclosuring'" />
    <Result v-else-if="phase === 'result'" />
    <GenreSelection v-else />
  </div>
</template>
<script>
export default {
  name: "Main",
  components: {
    GenreSelection: () => import("@/components/main/GenreSelection"),
    Shuffling: () => import("@/components/main/Shuffling"),
    Discussing: () => import("@/components/main/Discussing"),
    Disclosuring: () => import("@/components/main/Disclosuring"),
    Voting: () => import("@/components/main/Voting"),
    Result: () => import("@/components/main/Result")
  },
  computed: {
    phase() {
      return this.$store.getters.phase;
    }
  }
};
</script>
<style lang="scss" scoped></style>
