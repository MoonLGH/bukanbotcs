exports.execute = function (msg, command, args, client, D, prem, color) {

    if (args[0] === "test") {
        const channelId = '801839309073678350' // welcome channel
        const targetChannelId = '805752210922537030' // rules and info
        const message = `Selamat Datang <@${msg.member.id}> Di ${msg.member.guild.name}\nAmbil Role Di ${msg.member.guild.channels.cache.get(targetChannelId).toString()} Yaa`

        const channel = msg.member.guild.channels.cache.get(channelId)
        channel.send(message)
    }

}

exports.welcome = function (client) {
    console.log("guildMemberAdd Activated")
    client.on('guildMemberAdd', (member) => {
        const channelId = '801839309073678350' // welcome channel
        const targetChannelId = '805752210922537030' // rules and info
        const message = `Selamat Datang <@${member.id}> Di ${member.guild.name}\nAmbil Role Di ${member.guild.channels.cache.get(targetChannelId).toString()} Yaa`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}