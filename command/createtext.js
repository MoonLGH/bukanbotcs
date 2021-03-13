exports.execute = function (msg, command, args, client, D, perm, color) {
    const name = args.join(" ")
    const suc = new D.MessageEmbed()
        .setDescription(`Sucsess :white_check_mark:. You just Made an new Text Channel Named \`${name}\``)
        .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color)
    if (perm.Sadmin || perm.host) {
        msg.channel.send(suc)
        msg.guild.channels.create(name, {
            type: 'text'
        })
    } else {
        msg.delete({
            timeout: 5000
        })
        msg.channel.send(perm.hostmsg).then(hostmsg => hostmsg.delete({
            timeout: 5000
        }))
    }
}