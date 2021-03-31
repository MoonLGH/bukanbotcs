const sleepcommand = require("../command/general/sleep.js")
exports.sleep = function (msg) {
    sleepcommand.check(msg)
}