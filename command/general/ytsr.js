exports.execute = async function (msg, command, args, client, D, perm, color) {
    let ytsr = require('ytsr');
    let availableFilters = await ytsr.getFilters(args.join(" "));
    let filter = availableFilters.get('Type').get('Video');
    let searchResults = await ytsr(filter.url);
    let video = searchResults;
    if (!video) return msg.channel.send(`Aku Tidak Menemukan apapun`);


    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setTitle(video.items[index].title)
        .setImage(video.items[index].bestThumbnail.url)
        .addField("Video Channel : ",video.items[index].author.name)
        .addField("Views : ", video.items[index].views)
        .addField("Url : ", video.items[index].url)
        .addField("Duration : ", video.items[index].duration)
        .setFooter(`${index+1} / ${video.items.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
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
        if (index+1 <= video.items.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setTitle(video.items[index].title)
        .setImage(video.items[index].bestThumbnail.url)
        .addField("Video Channel : ",video.items[index].author.name)
        .addField("Views : ", video.items[index].views)
        .addField("Url : ", video.items[index].url)
        .addField("Duration : ", video.items[index].duration)
        .setFooter(`${index+1} / ${video.items.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
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
        .setTitle(video.items[index].title)
        .setImage(video.items[index].bestThumbnail.url)
        .addField("Video Channel : ",video.items[index].author.name)
        .addField("Views : ", video.items[index].views)
        .addField("Url : ", video.items[index].url)
        .addField("Duration : ", video.items[index].duration)
        .setFooter(`${index+1} / ${video.items.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

        embedsend.edit(embed)
    })
}