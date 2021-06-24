exports.execute = async function (msg, command, args, client, D, perm, color) {
    let user
    if (!args[0]) {
        user = msg.author;
    } else {
        user = msg.mentions.users.first() || await msg.guild.members.fetch({
            query: args.join(' '),
            limit: 1
        }).then(members => members.first().user).catch(() => null) || await client.users.fetch(args[0]) || msg.author
    }
    let useravatar = user.displayAvatarURL({dynamic: true,size: 2048,format: 'png'})
    const avatarEmbed = new D.MessageEmbed()
        .setColor(color)
        .setAuthor(user.username)
        .setDescription(`${user.username} Avatar Url is \`${useravatar}\``)
        .setImage(useravatar)
    msg.channel.send({embeds:[avatarEmbed]});
}