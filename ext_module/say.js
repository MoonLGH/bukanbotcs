exports.execute = async function (msg, command, args, client, D, perm, color) {
    let newargs = []
    let delthis = false
    args.forEach(str => {
        if (str === "-d" || str == "-del") {
            delthis = true
            return
        }
        newargs.push(str)
    });
    if(delthis == true){
        msg.delete()
        msg.channel.send(`${newargs.join(" ")}`)
    }else{
        msg.channel.send(`${newargs.join(" ")}`)
    }

    const logembed = new D.MessageEmbed()
    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
    .addField("Sayed!",newargs.join(" "))
    .setTimestamp()
    .setFooter(client.user.username)
    client.channels.cache.get("835446723459547146").send(logembed)
}