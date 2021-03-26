const cd = new Set()
let cool
exports.execute = async function (msg, command, args, client, D, perm, color) {
    let image = []

    if (args[0] === "cooldown" || args[0] == "cd") {
        if (args[1] === "true" || args[1] === "on") {
            if (perm.Sadmin || perm.host) {
                cool = true
                msg.channel.send(`Cooldown For ${commannd} Has Setted To true`)
            }
            return
        }
        if (args[1] === "false" || args[1] === "off") {
            if (perm.Sadmin || perm.host) {
                cool = false
                msg.channel.send(`Cooldown For ${commannd} Has Setted To false`)
            }
            return
        }
    }
    const axios = require("axios")
    const cheerio = require("cheerio")

    const data = await axios.get("https://results.dogpile.com/serp?qc=images&q=" + args.join(" "))

    let $ = cheerio.load(data.data)

    $("body > div.layout > div.layout__body > div.layout__mainline > div.mainline-results.mainline-results__images > div > div > div.image").each(function () {
        let imageurl = $(this).find("a.link > img").attr("src")
        let from = $(this).find("div.details > a.site").attr("href")
        image.push({
            imageurl,
            from
        })
    })

    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setDescription(`Dari: \n${image[index].from}`)
        .setImage(image[index].imageurl)
        .setFooter(`${index+1} / ${image.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

    if (cd.has(msg.author.id)) {
        msg.delete({
            timeout: 5000
        })
        return msg.channel.send("Cooldown For 10 second!").then(cod => cod.delete({
            timeout: 5000
        }))
    }

    cd.add(msg.author.id)
    setTimeout(() => {
        cd.delete(msg.author.id)
    }, 10000)
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
        if (index <= image.length) {
            index += 1
        }
        console.log(index)
        embed = new D.MessageEmbed()
            .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setDescription(`Dari ${image[index].from}`)
            .setImage(image[index].imageurl)
            .setFooter(`${index+1} / ${image.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
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
            .setDescription(`Dari: \n${image[index].from}`)
            .setImage(image[index].imageurl)
            .setFooter(`${index+1} / ${image.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        console.log(index)
        embedsend.edit(embed)
    })
}