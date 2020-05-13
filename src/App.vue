<template>
  <div id="app">
    <Board v-if="gameOngoing" @nextTurn="changePlayer" @end="resetGameState" :player="currentPlayer" />
    <template v-else>
      Winner: {{ currentPlayer }}
      <button @click="resetGameState">Restart</button>
    </template>
  </div>
</template>

<script>
import Board from './components/Board.vue'


export default {
  name: 'App',
  components: {
    Board
  },
  data () {
    return {
      currentPlayer: 'W',
      gameOngoing: true
    }
  },
  methods: {
    changePlayer () {
      this.currentPlayer = this.currentPlayer === 'W' ? 'B' : 'W'
    },
    resetGameState () {
      this.gameOngoing = !this.gameOngoing
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
