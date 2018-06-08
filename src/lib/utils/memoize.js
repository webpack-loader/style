function memoize (fn) {
  let memo

  return function () {
    if (typeof memo === 'undefined') {
    	memo = fn.apply(this, arguments)
    }

    return memo
  }
}

module.exports = memoize
