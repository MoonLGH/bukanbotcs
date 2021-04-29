exports.execute = async function (msg, command, args, client, D, perm, color) {
const hepburn = require("hepburn")
var cleaned = hepburn.cleanRomaji(args.join(" "))
var hiragana = hepburn.toHiragana(cleaned)

msg.channel.send(hiragana.toLowerCase())
}