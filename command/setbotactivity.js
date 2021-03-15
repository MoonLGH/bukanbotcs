exports.execute = function (msg, command, args, client, D, perm, color) {
    let input
    if (!args.includes('"')) {
         input = [args, ""]
    } else {
         input = args.match(/"(.*?)"/g) || args.match(/\w+|('|")([^"]|[^'])+('|")/g)
    }
    let string = input[0]
    
    let type = input[1]
    console.log(input)
    if (!type) type = "PLAYING"
    if (type == "PLAYING") {
        type = "PLAYING"
    } else if (type == "STREAMING") {
        type = "STREAMING"
    } else if (type == "LISTENING") {
        type = "LISTENING"
    } else if (type == "WATCHING") {
        type = "WATCHING"
    } else if (type == "COMPETING") {
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