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
    newargs = newargs.join(" ").replaceAll("@everyone","everyone")
    if (msg.mentions.members.size > 0) {
        msg.mentions.members.each(member => {
            if(member.nickname){
                newargs = newargs.replace(`<@!${member.id}>`, `${member.nickname}`)
            }else{
                newargs = newargs.replace(`<@!${member.id}>`, `${member.displayName}`)
            }
        })
    }

    if (msg.mentions.users.size > 0) {
        msg.mentions.users.each(user => {
            if(member.nickname){
                newargs = newargs.replace(`<@!${user.id}>`, `${user.username}`)
            }else{
                newargs = newargs.replace(`<@!${user.id}>`, `${member.username}`)
            }
        })
    }
    if (delthis == true) {
        msg.delete()
        msg.channel.send(`${newargs}`)
    } else {
        msg.channel.send(`${newargs}`)
    }
    log(client, msg, D, newargs)
}

function log(client, msg, D, newargs) {
    const logembed = new D.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .addField("Sayed!", newargs)
        .setTimestamp()
        .setFooter(client.user.username)
    client.channels.cache.get("835446723459547146").send(logembed)
}