exports.execute = async function (msg, command, args, client, D, perm, color) {
    let Mentuser
    if (!args[0]) {
      Mentuser = msg.author;
    } else {
      Mentuser = msg.mentions.members.first() || await msg.guild.members.fetch({
            query: args.join(' '),
            limit: 1
        }).then(members => members.first()).catch(() => null) || msg.author
    }
    const had = Mentuser.roles.cache.map(r => r.name).join('\n')

    const embed = new D.MessageEmbed()
      .setAuthor(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
      .setTitle(Mentuser.nickname)
      .addField(`What Roles do he have ?`, had)
      .setTimestamp()
      .setFooter(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
      .setColor(color)
    msg.channel.send(embed)
}