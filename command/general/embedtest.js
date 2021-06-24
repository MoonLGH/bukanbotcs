exports.execute = async function (msg, command, args, client, D, perm, color) {
    const embed = new D.MessageEmbed()
    .setColor(color)
    .setTitle("Test")
// msg.channel.send(embed)
msg.channel.send({embeds:[embed]})
}