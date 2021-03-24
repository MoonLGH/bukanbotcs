exports.execute = function (msg, command, args, client, D, perm, color) {
    const user = msg.mentions.users.first() || msg.guild.members.cache.find(user => user.username === `${args.join(" ")}`)|| msg.author;
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