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

function getOtherMark (mark) {
  return ['W', 'B'].filter(_mark => _mark !== mark)[0]
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

// function evaluateWithShape (board, x, y, mark, isMaximizing, winningNumber) {
//   const total = Math.max(...allOccourencies(board, x, y, mark, winningNumber))
//   const ends = Math.max(...allEnds(board, x, y, mark, winningNumber))
//   if (ends === 0 && total < 5) {
//     return 0
//   }
//   switch (total) {
//     case 4:
//       switch(ends) {
//         case 1:
//           if (isMaximizing)
//             return 100000000
//           return 50
//         case 2:
//           if (isMaximizing)
//             return 100000000
//           return 500000
//       }
//       break
//     case 3:
//       switch(ends) {
//         case 1:
//           if (isMaximizing)
//             return 7
//           return 5
//         case 2:
//           if (isMaximizing)
//             return 10000
//           return 50
//       }
//       break
//     case 2:
//       switch(ends) {
//         case 1:
//           return 2
//         case 2:
//           return 5
//       }
//       break
//     case 1:
//       switch(ends) {
//         case 1:
//           return 0.5
//         case 2:
//           return 1
//       }
//       break
//     default:
//       return 200000000
//   }
// }

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
            const score = depth <= iterations
              ? setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), false, alpha, beta, ++depth, winningNumber, iterations, markAround), 0)
              : result
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
            const score = depth <= iterations
              ? setTimeout(() => minMax(boardClone, rowIndex, colIndex, getOtherMark(mark), true, alpha, beta, ++depth, winningNumber, iterations, markAround), 0)
              : result
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
