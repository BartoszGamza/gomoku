import { allOccourencies } from '@/lib/game'

export function move (board, mark) {
  for (let rowIndex = 0; rowIndex < board.length; ++rowIndex) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; ++colIndex) {
      if (board[rowIndex][colIndex] === '') {
        if (isMarkAround(board, rowIndex, colIndex)) {
          board[rowIndex][colIndex] = mark
          return { board, rowIndex, colIndex }
        }
      }
    }
  }
}

function isMarkAround (board, x, y) {
  return ['W', 'B'].reduce((is, mark) => {
    if (allOccourencies(board, x, y, mark, 2).some(occ => occ > 0)) {
      is = true
    }
    return is
  }, false)
}
