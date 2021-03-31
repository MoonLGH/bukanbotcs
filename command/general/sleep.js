let isusersleep = new Set()
exports.execute = function (msg, command, args, client, D, perm, color) {
 msg.channel.send("Okay, "+msg.author.userame+" Is Now Sleeping")
 isusersleep.add(msg.author.id)
}

exports.check = function(msg){
    if(isusersleep.has(msg.author.id)){
        msg.channel.send(`Hey <@${msg.author.id}> I've Remove Your Sleep Status`)
        isusersleep.delete(msg.author.id)
    }

    if(msg.mentions.users.first() && isusersleep.has(msg.mentions.users.first().id)){
       msg.channel.send(`<@${msg.author.id}> , The Person that you mention is sleeping right now`) 
    }
}