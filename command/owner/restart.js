exports.execute = async function (msg, command, args, client, D, perm, color) {
    let e = new D.MessageEmbed()
        .addDescription("The Bot Is Restarting...")
    msg.chanenl.send(e)
    process.exit()
}