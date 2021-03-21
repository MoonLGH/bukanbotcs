const config = require("../../config.json")
exports.execute = function (msg, command, args, client, D, perm, color) {
    if (msg.author.id !== config.MoonLID) {
       return msg.channel.send("Kamu Bukan <@" + config.MoonLID + ">")
    }

    if(args[9])

    let type = args.shift().toLowerCase();
    console.log(input)
    if (!type) type = "PLAYING"
    if (type == "playing") {
        type = "PLAYING"
    } else if (type == "streaming") {
        type = "STREAMING"
    } else if (type == "listening") {
        type = "LISTENING"
    } else if (type == "watching") {
        type = "WATCHING"
    } else if (type == "competing") {
        type = "COMPETING"
    } else {
        return msg.channel.send("Tipe yang kamu masukan tidak valid!. \n Tipe yang valid adalah: \n-PLAYING \n-STREAMING\n-LISTENING\n-COMPETING")
    }

    client.user.setActivity(
        string, {
            type: type
        }
    )

    msg.channel.send(`New Activity Setted!. \n \`${string}\` With \`${type}\` As The Type of Activity`)
}