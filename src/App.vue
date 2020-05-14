<template>
  <div id="app">
    <Board v-if="gameOngoing" @nextTurn="changePlayer" @end="endGame" :player="currentPlayer" />
    <template v-else>
      <button v-for="(mode, index) in gameModes"
        :key="index"
        @click="setGame(mode)">
          {{ mode.name }}
      </button>
    </template>
     <template v-if="winner">
      Winner: {{ currentPlayer }}
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
      currentGame: null,
      currentPlayer: null,
      gameOngoing: false,
      winner: null,
      gameModes: [
        {
          name: 'Human vs Human',
          players: [{
            type: 'Human',
            name: 'Player 1',
            mark: 'W'
          },{
            type: 'Human',
            name: 'Player 2',
            mark: 'B'
          }]
        },
        {
          name: 'Human vs AI',
          players: [{
            type: 'Human',
            name: 'Human',
            mark: 'W'
            },{
            type: 'AI',
            name: 'Samantha',
            mark: 'B'
          }]
        },
        {
          name: 'The neurament',
          players: [{
            type: 'AI',
            name: 'Samantha',
            mark: 'W'
            },{
            type: 'AI',
            name: 'HAL 9000',
            mark: 'B'
          }]
        }
      ]
    }
  },
  methods: {
    changePlayer () {
      this.currentPlayer = this.currentPlayer.name === this.currentGame.players[0].name
        ? this.currentGame.players[1] : this.currentGame.players[0]
    },
    setGame (mode) {
      this.winner = null
      this.currentGame = mode
      this.currentPlayer = this.currentGame.players[0]
      this.gameOngoing = true
    },
    endGame () {
      this.winner = this.currentPlayer && this.currentPlayer.name
      this.gameOngoing = false
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
