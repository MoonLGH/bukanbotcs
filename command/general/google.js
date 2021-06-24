exports.execute = async function (msg, command, args, client, D, perm, color) {
    const googleIt = require('google-it')

    let result = await googleIt({
        'query': args.join(" ")
    })
    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setTitle(result[index].title)
        .setURL(result[index].link)
        .setDescription(`[${result[index].title}](${result[index].link})`)
        .addField(`${result[index].title}`, result[index].snippet)
        .setFooter(`${index+1} / ${result.length}`, msg.guild.iconURL({dynamic:true}))
        .setColor(color);

    const embedsend = await msg.channel.send({embeds:[embed]})
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
        if (index + 1 <= result.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setTitle(result[index].title)
        .setURL(result[index].link)
        .setDescription(`[${result[index].title}](${result[index].link})`)
        .addField(`${result[index].title}`, result[index].snippet)
        .setFooter(`${index+1} / ${result.length}`, msg.guild.iconURL({dynamic:true}))
        .setColor(color);

        embedsend.edit({embeds:[embed]})
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setTitle(result[index].title)
        .setURL(result[index].link)
        .setDescription(`[${result[index].title}](${result[index].link})`)
        .addField(`${result[index].title}`, result[index].snippet)
        .setFooter(`${index+1} / ${result.length}`, msg.guild.iconURL({dynamic:true}))
        .setColor(color);

        embedsend.edit({embeds:[embed]})
    })
}