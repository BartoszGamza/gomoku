<template>
  <div id="app">
     <template v-if="winner">
      Winner: {{ winner }}
    </template>
    <Board
      v-if="gameStarted"
      @nextTurn="changePlayer"
      @end="endGame"
      v-bind="{
        currentPlayer,
        currentGame
      }"
    />
    <div class="form" v-else>
      <button v-for="(mode, index) in gameModes"
        :key="index"
        @click="setGame(mode)">
          {{ mode.name }}
      </button>
      <label for="boardSize">Board Size</label>
      <input
        id="boardSize"
        type="number"
        min="3"
        max="15"
        v-model="boardSize"
      >
      <label for="wininngNumber">Winning Number</label>
      <input
        id="wininngNumber"
        type="number"
        min="3"
        max="5"
        v-model="wininngNumber"
      >
      <label for="iterations">Iterations</label>
      <input
        id="iterations"
        type="number"
        min="1"
        max="100"
        v-model="iterations"
      >
    </div>
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
      gameStarted: false,
      gameOngoing: false,
      winner: null,
      boardSize: 15,
      wininngNumber: 5,
      iterations: 3,
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
      this.currentGame = {
        ...mode,
        board: this.boardSize,
        winning: this.wininngNumber
      }
      this.currentPlayer = this.currentGame.players[0]
      this.gameOngoing = true
      this.gameStarted = true
    },
    endGame (result) {
      // this.gameOngoing = false
      this.gameOngoing = false
      this.winner = result
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form {
  max-width: 300px;
}
</style>
