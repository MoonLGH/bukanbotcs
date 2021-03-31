let afk = {}
exports.execute = function (msg, command, args, client, D, perm, color) {
    let reason
    if(!args[0]){
        reason = false
        msg.channel.send("Okay, " + msg.author.username + " Is Now Added To Afk List")
    }else{
        if(args.join(" ").includes("\n")){
            reason = "your afk reason contains new line"
        }
        reason = args.join(" ")
        msg.channel.send("Okay, " + msg.author.username + " Is Now Added To Afk List" + ` With Reason = ${reason}`)
    }
    afk[msg.author.id] = {reason:reason}
}

exports.check = function (msg) {
    if (afk[msg.author.id] !== undefined) {
        msg.channel.send(`Hey <@${msg.author.id}> I've Remove Your Afk Status!`)
        delete afk[msg.author.id]
    }

    if (msg.mentions.users.first() && afk[msg.mentions.users.first().id] !== undefined) {
        let id = msg.mentions.users.first().id
        if(afk[id].reason === false){
            msg.channel.send(`<@${msg.author.id}> , The Person that you mention is Afk, With Reason ${afk[id]}`)
        }if(afk[id].reason !== false){
            msg.channel.send(`<@${msg.author.id}> , The Person that you mention is Afk Right Now`)
        }
    }
}
