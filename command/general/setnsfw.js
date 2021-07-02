exports.execute = function (msg, command, args, client, D, perm, color) {
    const suconn = new D.MessageEmbed()
        .setDescription(`Sucsess :white_check_mark:. You just Made this channel nsfw `)
        .setAuthor(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setFooter(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setColor(color)

    if (perm.Sadmin || perm.host) {
        msg.channel.send(suconn)
        msg.channel.setNSFW(true);
    } else {
        msg.delete({
            timeout: 5000
        })
        msg.channel.send({embeds:[perm.hostmsg]}).then(hostmsg => hostmsg.delete({
            timeout: 5000
        }))
    }
}