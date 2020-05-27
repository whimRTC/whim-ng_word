<template>
  <div>
    <Shuffling v-if="phase === 'shuffling'" />
    <Playing v-else-if="phase === 'playing'" />
    <Answer v-else-if="phase === 'answer'" />
    <GenreSelection v-else />
  </div>
</template>
<script>
export default {
  name: "Main",
  components: {
    GenreSelection: () => import("@/components/main/GenreSelection"),
    Shuffling: () => import("@/components/main/Shuffling"),
    Playing: () => import("@/components/main/Playing"),
    Answer: () => import("@/components/main/Answer")
  },
  computed: {
    phase() {
      return this.$whim.state.phase;
    }
  }
};
</script>
<style lang="scss" scoped></style>
