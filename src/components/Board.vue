<template>
  <div v-if="currentGame" class="board">
    <div v-for="(row ,rowIndex) in board" :key="rowIndex" class="board__row">
      <div v-for="(col, colIndex) in board[rowIndex]" :key="colIndex">
        <Cell :value="board[rowIndex][colIndex]"
          @selected="tryStonePlacing(rowIndex, colIndex)" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Cell from '@/components/Cell'
import { checkWin } from '@/lib/game'
import move from '@/lib/ai'

export default {
  props: {
    currentPlayer: {
      type: Object
    },
    currentGame: {
      type: Object
    }
  },
  components: {
    Cell
  },
  data () {
    return {
      board: null
    }
  },
  methods: {
    checkWin,
    initializeBoard () {
      this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(''))
      if (this.currentGame && this.currentGame.name === 'The neurament') {
        this.nextTurn(this.boardCenter, this.boardCenter)
      }
    },
    tryStonePlacing (rowIndex, colIndex) {
      if (this.board[rowIndex][colIndex] === '' && this.currentPlayer.type === 'Human') {
        this.nextTurn(rowIndex, colIndex)
      }
    },
    moveAI () {
      let boardCopy = _.cloneDeep(this.board)
      const { rowIndex, colIndex } = move(boardCopy, this.currentPlayer.mark, this.wininngNumber)
      this.nextTurn(rowIndex, colIndex)
    },
    nextTurn (rowIndex, colIndex) {
      let board = [...this.board]
      board[rowIndex][colIndex] = this.currentPlayer.mark
      this.board = board
      const score = this.checkWin(board, rowIndex, colIndex, this.currentPlayer.mark, this.wininngNumber)
      if (score) {
        this.$emit('end', score)
      } else {
        this.$emit('nextTurn')
      }
    }
  },
  computed: {
    boardSize () {
      return this.currentGame && parseInt(this.currentGame.board)
    },
    wininngNumber () {
      return this.currentGame && parseInt(this.currentGame.winning)
    },
    boardCenter () {
      return this.boardSize && Math.round(this.boardSize / 2)
    }
  },
  mounted() {
    this.initializeBoard()
  },
  watch: {
    currentPlayer: {
      handler (currentPlayer) {
        if (currentPlayer.type === 'AI' && this.board) {
          setTimeout(() => this.moveAI(), 0)
        }
      }
    }
  }
}
</script>

<style>
.board {
  display: flex;
  flex-direction: column;
}

.board__row {
  display: flex;
}
</style>
