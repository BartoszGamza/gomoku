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
import { checkWin } from '@/lib/game'
import { move } from '@/lib/ai'

export default {
  props: {
    player: {
      type: Object,
      required: true
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
    move,
    initializeBoard () {
      this.board = Array(15).fill().map(() => Array(15).fill(''))
    },
    tryStonePlacing (rowIndex, colIndex) {
      if (this.board[rowIndex][colIndex] === '' && this.player.type === 'Human') {
        let board = [...this.board]
        board[rowIndex][colIndex] = this.player.mark
        this.nextTurn({board, rowIndex, colIndex})
      }
    },
    moveAI () {
      this.nextTurn(this.move(this.board, this.player.mark))
    },
    nextTurn ({board, rowIndex, colIndex}) {
      this.board = board
      if (this.checkWin(board, rowIndex, colIndex, this.player.mark)) {
        this.$emit('end')
      } else {
        this.$emit('nextTurn')
      }
    }
  },
  mounted() {
    this.initializeBoard()
  },
  watch: {
    player: {
      immediate: true,
      handler (player) {
        if (player.type === 'AI') {
          this.moveAI()
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
