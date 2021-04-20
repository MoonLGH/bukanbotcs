exports.execute = function (msg, command, args, client, D, perm, color) {
    const googleIt = require('google-it')

    let result = await googleIt({
        'query': args.join(" ")
    })
    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setTitle(result[index].title)
        .addField(`[${result[index].title}](${result[index].link})`, result[index].snippet)
        .setFooter(`${index+1} / ${result.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

    const embedsend = await msg.channel.send(embed)
    await embedsend.react("🗑️")
    await embedsend.react("⬅");
    await embedsend.react("➡");

    const deleteFilter = (reaction, user) =>
        reaction.emoji.name === `🗑️` && user.id === msg.author.id;

    const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === `⬅` && user.id === msg.author.id;

    const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === `➡` && user.id === msg.author.id;

    const backwards = embedsend.createReactionCollector(backwardsFilter);
    const deletes = embedsend.createReactionCollector(deleteFilter);
    const forwards = embedsend.createReactionCollector(forwardsFilter);

    deletes.on("collect", async f => {
        embedsend.delete();
    })

    forwards.on("collect", async f => {
        if (index + 1 <= kanjis.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
            .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setTitle(result[index].title)
            .addField(`[${result[index].title}](${result[index].link})`, result[index].snippet)
            .setFooter(`${index+1} / ${result.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        embedsend.edit(embed)
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed()
            .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setTitle(result[index].title)
            .addField(`[${result[index].title}](${result[index].link})`, result[index].snippet)
            .setFooter(`${index+1} / ${result.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        embedsend.edit(embed)
    })
}