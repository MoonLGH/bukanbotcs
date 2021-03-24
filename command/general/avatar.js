exports.execute = function (msg, command, args, client, D, perm, color) {
    const user = msg.mentions.users.first() || await msg.guild.members.fetch({ query: args.join(' '), limit: 1 }).then(members => members.first().user).catch(() => null) || msg.author;
    const avatarEmbed = new D.MessageEmbed()
        .setColor(color)
        .setAuthor(user.username)
        .setDescription(`${user.username} Avatar Url is \`${user.displayAvatarURL({dynamic: true,size: 2048,format: 'png'})}\``)
        .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 2048,
            format: 'png'
        }))
    msg.channel.send(avatarEmbed);
}