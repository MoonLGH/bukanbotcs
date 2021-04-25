exports.execute = async function (msg, command, args, client, D, perm, color) {
    const ud = require('urban-dictionary')

    let index = 0

    const result = await ud.define(args[0])
    if (!result) {
        msg.channel.send("No Results Founded")
    }
    let embed = new D.MessageEmbed()
        .setAuthor("Urban Dictionary", 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setURL(result[index].permalink.substr(0, 1000))
        .setTitle(result[index].word.substr(0, 1000))
        .addField("Definiton", result[index].definition.substr(0, 1000))
        .addField("Written On", result[index].written_on.substr(0, 1000))
        .addField("Up/Down Vote", `${result[index].thumbs_up}/${result[index].thumbs_down}`)
        .setFooter(`${index+1} / ${result.length} - Urban Dictionary`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);
    if (result[index].example) {
        embed.addField("Examples", `${result[index].example}`)
    }

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
        if (index + 1 <= result.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
            .setAuthor("Urban Dictionary", 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setURL(result[index].permalink.substr(0, 1000))
            .setTitle(result[index].word.substr(0, 1000))
            .addField("Definiton", result[index].definition.substr(0, 1000))
            .addField("Written On", result[index].written_on.substr(0, 1000))
            .setFooter(`${index+1} / ${result.length} - Urban Dictionary`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);
        if (result[index].example) {
            embed.addField("Examples", `${result[index].example}`)
        }

        embedsend.edit(embed)
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed()
            .setAuthor("Urban Dictionary", 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setURL(result[index].permalink.substr(0, 1000))
            .setTitle(result[index].word.substr(0, 1000))
            .addField("Definiton", result[index].definition.substr(0, 1000))
            .addField("Written On", result[index].written_on.substr(0, 1000))
            .setFooter(`${index+1} / ${result.length} - Urban Dictionary`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);
        if (result[index].example) {
            embed.addField("Examples", `${result[index].example}`)
        }

        embedsend.edit(embed)
    })
}