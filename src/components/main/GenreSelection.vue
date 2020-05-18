<template>
  <div>
    <div class="select">
    <img :src="require('../../assets/menu-left.svg')" class="icon" @click="prev">
    <div class="select_text text--subtitle">{{genreJa}}</div>
    <img :src="require('../../assets/menu-right.svg')" class="icon" @click="next">
    </div>
    <a 
      class="fuwatto_btn_yellow"
      @click="start"
    >スタート</a>
  </div>
</template>

<script>
const genres = {
   random: {
     ja: 'ランダム'
   },
   living: {
     ja: '生活'
   },
   play: {
     ja: '遊び'
   }
  }
const genreList = [
  'random', 'living', 'play'
]

export default {
  name: 'GenreSelection',
  props: {
    msg: String
  },
  data() {
    return {
      genre: 'random'
    }
  },
  computed: {
    genreJa() {
      return genres[this.genre]?.ja
    }
  },
  methods: {
    next() {
      this.genre = genreList[(genreList.findIndex(genre => genre == this.genre) + 1) % genreList.length]
    },
    prev() {
      this.genre = genreList[(genreList.findIndex(genre => genre == this.genre) - 1 + genreList.length)  % genreList.length]
    },
    start() {
       this.$store.dispatch('start', this.genre)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select {
  margin: 10px
}

.icon {
  cursor: pointer;
  width:40px;
    height:40px;
    vertical-align: middle;
}

.select_text{
  width: 200px;
  display: inline-block;
  vertical-align: middle;
}

.fuwatto_btn_yellow{
  display: block;
  background-color: #FFC605;
  color: #FFF;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  transition: .3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform : translate(-50%,-50%);
  width: 100px;
  text-align: center;/*一応BOX内の文字も中央寄せ*/
}
.fuwatto_btn_yellow:hover{
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.12), 0 3px 20px 0 rgba(0,0,0,0.12), 0 5px 6px -2px rgba(0,0,0,0.2);
}

</style>
