exports.execute = async function (msg, command, args, client, D, perm, color) {
    try {
        const matches = msg.content.match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups || msg.content.match(/```(?<code>[^]+?)\s?```/)?.groups
        let evaled = eval(matches.code)
        
        if(evaled !== null){
            msg.channel.send(evaled)
        }
    } catch (error) {
        const embed = new D.MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .addField("Error Occured!", error)
            .addField("Error Stack", error.stack)
            .addField("Error Destination", error.dest)
            .addField("Error Line", error.lineNumber)
            .addField("Error Column Number", error.columnNumber)
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setTimestamp()
        client.channels.cache.get("827236403263569980").send(embed)
    }
}