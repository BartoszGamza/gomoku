import { allOccourencies } from '@/lib/game'

export default function move (boardClone, mark, winningNumber, iterations) {
  let move
  let bestScore = -Infinity
  for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
    for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
      if (isMarkAround(boardClone, rowIndex, colIndex)) {
        if (boardClone[rowIndex][colIndex] === '') {
          boardClone[rowIndex][colIndex] = mark
          let score = minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), false, 0, winningNumber, iterations)
          boardClone[rowIndex][colIndex] = ''
          if (score > bestScore) {
            bestScore = score
            move = {rowIndex, colIndex}
          }
        }
      }
    }
  }
  console.log(bestScore, mark)
  return move
}

const markAroundEnabled = false

function isMarkAround (board, x, y) {
  return markAroundEnabled ? findMarkAround(board, x, y) : true
}

function findMarkAround (board, x, y) {
  return ['W', 'B'].reduce((is, mark) => {
    if (allOccourencies(board, x, y, mark, 2).some(occ => occ > 0)) {
      is = true
    }
    return is
  }, false)
}

// function isEnemyMarkAround (board, x, y, enemyMark) {
//     return allOccourencies(board, x, y, enemyMark, 2).some(occ => occ > 0)
// }

const valueDictionary = {
  0: 0,
  1: 10,
  2: 1000,
  3: 1000000,
  4: 1000000000,
  5: 10000000000000
}

function evaluate (board, x, y, mark, isMaximizing, winningNumber) {
  const total = Math.max(...allOccourencies(board, x, y, mark, winningNumber))
  return isMaximizing ? -valueDictionary[total] : valueDictionary[total]
}

function minMax (boardClone, rowIndex, colIndex, mark, isMaximizing, depth, winningNumber, iterations) {
  const result = evaluate(boardClone, rowIndex, colIndex, mark, isMaximizing, winningNumber)
  if (result > 1) {
    return result
  }
  if (isMaximizing) {
    let best = -Infinity
    for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
      for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
        if (isMarkAround(boardClone, rowIndex, colIndex)) {
          if (boardClone[rowIndex][colIndex] === '') {
            boardClone[rowIndex][colIndex] = mark
            let score = depth > iterations ? result : setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), false, ++depth), 0)
            boardClone[rowIndex][colIndex] = ''
            best = Math.max(score, best)
          }
        }
      }
    }
    return best
  } else {
    let best = Infinity
    for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
      for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
        if (isMarkAround(boardClone, rowIndex, colIndex)) {
          if (boardClone[rowIndex][colIndex] === '') {
            boardClone[rowIndex][colIndex] = mark
            let score = depth > iterations ? result : setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), true, ++depth), 0)
            boardClone[rowIndex][colIndex] = ''
            best = Math.min(score, best)
          }
        }
      }
    }
    return best
  }
}

function getOtherMark (mark) {
  return ['W', 'B'].filter(_mark => _mark !== mark)[0]
}
