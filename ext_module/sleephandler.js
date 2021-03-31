const sleepcommand = require("../command/general/sleep.js")
const afk = require("../command/general/afk.js")
exports.sleep = function (msg) {
    sleepcommand.check(msg)
    afk.check(msg)
}