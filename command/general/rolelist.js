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
      .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
      .setTitle(Mentuser.nickname)
      .addField(`What Roles do he have ?`, had)
      .setTimestamp()
      .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
      .setColor(color)
    msg.channel.send(embed)
}