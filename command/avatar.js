exports.execute = function (msg, command, args, client, D, perm, color) {
    const user = msg.mentions.users.first() || msg.author;
    const avatarEmbed = new D.MessageEmbed()
        .setColor(color)
        .setAuthor(user.username)
        .setDescription(`${user.username} Avatar Url is \`${user.avatarURL()}\``)
        .setImage(user.avatarURL()+"?size=512");
    msg.channel.send(avatarEmbed);
}