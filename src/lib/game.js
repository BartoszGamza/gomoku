import _ from 'lodash'

export function checkWin (board, x, y, mark, winningCount) {
  const nothingToFill = !board.flat().some(cell => cell === '')
  const hasWinningCount = allOccourencies(board, x, y, mark, winningCount).some(occurence => occurence === winningCount)
  if (hasWinningCount) {
    return mark
  } else if (nothingToFill) {
    return 'Tie'
  }
  return null
}

export function allOccourencies (board, x, y, mark, scope = 3) {
  const range = _.range(-scope + 1, scope)
  return [
    countOccurence(_.map(range, (i) => {
      return _.get(board, [x, y - i])
    }), mark),
    countOccurence(_.map(range, (i) => {
      return _.get(board, [x + i, y - i])
    }), mark),
    countOccurence(_.map(range, (i) => {
      return _.get(board, [x + i, y])
    }), mark),
    countOccurence(_.map(range, (i) => {
      return _.get(board, [x + i, y + i])
    }), mark)
  ]
}

export function allEnds (board, x, y, mark, scope) {
  const range = _.range(-scope, scope + 1)
  return [
    countEnds(_.map(range, (i) => {
      return _.get(board, [x, y - i])
    }), mark),
    countEnds(_.map(range, (i) => {
      return _.get(board, [x + i, y - i])
    }), mark),
    countEnds(_.map(range, (i) => {
      return _.get(board, [x + i, y])
    }), mark),
    countEnds(_.map(range, (i) => {
      return _.get(board, [x + i, y + i])
    }), mark)
  ]
}

function countOccurence (direction, mark) {
  let maxCount = 0
  const count = direction.reduce((count, element) => {
    if (element === mark) {
      ++count
    } else {
      maxCount = Math.max(count, maxCount)
      count = 0
    }
    return count
  }, 0)
  return Math.max(count, maxCount)
}

export function countEnds (direction, mark) {
  let longestShape = []
  direction.reduce((shape, element, index) => {
    if (element === mark) {
      shape.push(index)
    } else {
      if (shape.length > longestShape.length) {
        longestShape = shape
      }
      shape = []
    }
    return shape
  }, [])
  const begining = direction[longestShape[0] - 1]
  const end = direction[longestShape[longestShape.length -1] + 1]
  return [begining, end].reduce((sum, part) => {
    if (part === '') {
      ++sum
    }
    return sum
  }, 0)
}
