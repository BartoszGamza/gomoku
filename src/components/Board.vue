<template>
  <div class="board">
    <div v-for="(row ,rowIndex) in board" :key="rowIndex" class="board__row">
      <div v-for="(col, colIndex) in board[rowIndex]" :key="colIndex">
        <Cell :value="board[rowIndex][colIndex]"
          @selected="tryStonePlacing(rowIndex, colIndex)" />
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/components/Cell'
import _ from 'lodash'

export default {
  props: {
    player: {
      type: String,
      default: 'W'
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
    initializeBoard () {
      this.board = Array(15).fill().map(() => Array(15).fill(''))
    },
    tryStonePlacing (rowIndex, colIndex) {
      if (this.board[rowIndex][colIndex] === '') {
        let tempBoard = [...this.board]
        tempBoard[rowIndex][colIndex] = this.player
        this.board = tempBoard
        if (this.checkWin(tempBoard, rowIndex, colIndex)) {
          this.endGame()
        } else {
          this.nextTurn()
        }
      }
    },
    checkWin (board, x, y) {
      const range = _.range(-5 + 1, 5)
      return _.some([
        this.checkDirection(_.map(range, (i) => {
          return _.get(board, [x, y - i])
        }), this.player),
        this.checkDirection(_.map(range, (i) => {
          return _.get(board, [x + i, y - i])
        }), this.player),
        this.checkDirection(_.map(range, (i) => {
          return _.get(board, [x + i, y])
        }), this.player),
        this.checkDirection(_.map(range, (i) => {
          return _.get(board, [x + i, y + i])
        }), this.player)
      ])
    },
    checkDirection (arr, val) {
      let r = 0
      for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === val) {
          ++r
        } else {
          r = 0
        }
        if (r === 5) {
          return true
        }
      }
      return false
    },
    endGame () {
      this.$emit('end')
    },
    nextTurn () {
      this.$emit('nextTurn')
    }
  },
  mounted() {
    this.initializeBoard()
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
