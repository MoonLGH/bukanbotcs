exports.execute = async function (msg, command, args, client, D, perm, color) {
    const hepburn = require("hepburn")
    var cleaned = hepburn.cleanRomaji(args.join(" "))
    var katakana = hepburn.toKatakana(cleaned)
    
    msg.channel.send(katakana.toUpperCase())
    }