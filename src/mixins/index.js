const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const NG_WORD_PATTERNS = require("@/assets/ng_word_patterns.json");

export default {
  methods: {
    gameStart: function() {
      const shuffledPattern = shuffle(NG_WORD_PATTERNS);
      let ngWords = {};
      this.$whim.users.forEach((user, i) => {
        ngWords[user.id] = shuffledPattern[i];
      });
      this.$whim.assignState({
        phase: "shuffling",
        ngWords: ngWords
      });
    }
  }
};
