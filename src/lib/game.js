import _ from 'lodash'

export function checkWin (board, x, y, mark) {
  return allOccourencies(board, x, y, mark).some(occurence => occurence === 5)
}

export function allOccourencies (board, x, y, mark, scope = 5) {
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

export function countOccurence (direction, mark) {
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
