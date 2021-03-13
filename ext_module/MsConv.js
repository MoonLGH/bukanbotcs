exports.ms = function (number, unit) {
  let d, h, m, s , ms

  if (isNaN(number)) {
    throw new TypeError('Value must be a number.')
  }

  if (unit === 'sec' || unit === 'seconds') {
    s = number
  } else if (unit === 'ms' || unit === 'milliseconds' || !unit) {
    s = Math.floor(number / 1000)
  } else {
    throw new TypeError("Unit must be 'sec' or 'ms'")
  }

  ms = Math.floor(number)
  ms = ms % 1000
  m = Math.floor(s / 60)
  s = s % 60
  h = Math.floor(m / 60)
  m = m % 60
  d = Math.floor(h / 24)
  h = h % 24

  return {milis: ms, days: d, hours: h, minutes: m, seconds: s}
}
