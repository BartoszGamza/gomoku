import { allOccourencies } from '@/lib/game'

export default function move (boardClone, mark, winningNumber, iterations, markAround) {
  let move
  let bestScore = -Infinity
  for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
    for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
      if (isMarkAround(boardClone, rowIndex, colIndex, markAround)) {
        if (boardClone[rowIndex][colIndex] === '') {
          boardClone[rowIndex][colIndex] = mark
          const score = minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), false, -Infinity, Infinity, 0, winningNumber, iterations, markAround)
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


function isMarkAround (board, x, y, enabled) {
  return enabled ? findMarkAround(board, x, y) : true
}

function findMarkAround (board, x, y) {
  return ['W', 'B'].reduce((is, mark) => {
    if (allOccourencies(board, x, y, mark, 2).some(occ => occ > 0)) {
      is = true
    }
    return is
  }, false)
}

function getOtherMark (mark) {
  return ['W', 'B'].filter(_mark => _mark !== mark)[0]
}

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

function minMax (boardClone, rowIndex, colIndex, mark, isMaximizing, alpha, beta, depth, winningNumber, iterations, markAround) {
  const result = evaluate(boardClone, rowIndex, colIndex, mark, isMaximizing, winningNumber)
  if (result > 1) {
    return result
  }
  if (isMaximizing) {
    let best = -Infinity
    for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
      for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
        if (isMarkAround(boardClone, rowIndex, colIndex, markAround)) {
          if (boardClone[rowIndex][colIndex] === '') {
            boardClone[rowIndex][colIndex] = mark
            const score = depth > iterations
              ? result : setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), false, alpha, beta, ++depth, winningNumber, iterations, markAround), 0)
            boardClone[rowIndex][colIndex] = ''
            best = Math.max(score, best)
            alpha = Math.max(alpha, score)
            if (beta <= alpha) {
              break
            }
          }
        }
      }
    }
    return best
  } else {
    let best = Infinity
    for (let rowIndex = 0; rowIndex < boardClone.length; ++rowIndex) {
      for (let colIndex = 0; colIndex < boardClone[rowIndex].length; ++colIndex) {
        if (isMarkAround(boardClone, rowIndex, colIndex, markAround)) {
          if (boardClone[rowIndex][colIndex] === '') {
            boardClone[rowIndex][colIndex] = mark
            const score = depth > iterations
              ? result : setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), true, alpha, beta, ++depth, winningNumber, iterations, markAround), 0)
            boardClone[rowIndex][colIndex] = ''
            best = Math.min(score, best)
            beta = Math.min(beta, score)
            if (beta <= alpha) {
              break
            }
          }
        }
      }
    }
    return best
  }
}
