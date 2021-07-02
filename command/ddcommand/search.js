const config = require("./ddconfig.json")
const prefix = require("../../config.json")
const axios = require("axios")
const cheerio = require("cheerio")
exports.execute = async (msg, command, args, client, D, perm, color) => {
    if (!msg.channel.nsfw)
        return msg.channel
            .send(`NSFW channel please.`)
            .then(msg => msg.delete({
                timeout: 5000
            }));
    if (!args[0]) {
        return msg.channel
            .send(
                `the command you are using is incorrect\nExample: \`${config.prefix}${command} search <Query>\``
            )
            .then(msg => msg.delete({
                timeout: 10000
            }));
    }

    const data = await axios.get(config.search + args.join(" "))
    const $ = cheerio.load(data.data)
    let list = []
    $("#main > article").each(function () {
        let name = $(this).find("div > div > a").attr("alt")
        let type = $(this).find("div > div > a > div.content-thumb > div.type").text()
        let id = $(this).find("div > div > a").attr("href").replace(config.url, "")
        let score = $(this).find("div > div > a > div.data > div.score").text()
        let status = $(this).find("div > div > a > div.data > div.type").text()
        let imageurl = $(this).find("div > div > a > div.content-thumb > img").attr("src").replace("//", "https://")
        list.push({
            name,
            type,
            id,
            score,
            status,
            imageurl
        })
    })

    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(list[index].name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .addField(`Nama`, list[index].name)
        .addField(`ID `, list[index].id)
        .addField(`Tipe`, list[index].type)
        .addField(`Score`, list[index].score)
        .addField(`Status`, list[index].status)
        .addField("\u200b", "\u200b")
        .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
        .setImage(list[index].imageurl)
        .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

    const embedsend = await msg.channel.send({embeds:[embed]})
    await embedsend.react("🗑️")
    await embedsend.react("⬅");
    await embedsend.react("➡");
    await embedsend.react("📚")

    const deleteFilter = (reaction, user) =>
        reaction.emoji.name === `🗑️` && user.id === msg.author.id;

    const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === `⬅` && user.id === msg.author.id;

    const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === `➡` && user.id === msg.author.id;

    const backwards = embedsend.createReactionCollector(backwardsFilter);
    const deletes = embedsend.createReactionCollector(deleteFilter);
    const forwards = embedsend.createReactionCollector(forwardsFilter);

    const chapterlist = (reaction, user) =>
        reaction.emoji.name === `📚` && user.id === msg.author.id;
    const clist = embedsend.createReactionCollector(chapterlist);
    clist.on("collect", async f => {
        embedsend.delete();
        require("./chapterlist.js").info(msg, command, args, client, D, perm, color, list[index].id)
    })

    deletes.on("collect", async f => {
        embedsend.delete();
    })

    forwards.on("collect", async f => {
        if (index + 1 <= list.length) {
            index += 1
        }
        console.log(index)
        embed = new D.MessageEmbed()
            .setAuthor(list[index].name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .addField(`Nama`, list[index].name)
            .addField(`ID `, list[index].id)
            .addField(`Tipe`, list[index].type)
            .addField(`Score`, list[index].score)
            .addField(`Status`, list[index].status)
            .addField("\u200b", "\u200b")
            .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
            .setImage(list[index].imageurl)
            .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        // embedsend.edit(embed)
        embedsend.edit({embeds:[embed]})
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed()
            .setAuthor(list[index].name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .addField(`Nama`, list[index].name)
            .addField(`ID `, list[index].id)
            .addField(`Tipe`, list[index].type)
            .addField(`Score`, list[index].score)
            .addField(`Status`, list[index].status)
            .addField("\u200b", "\u200b")
            .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
            .setImage(list[index].imageurl)
            .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        console.log(index)
        // embedsend.edit(embed)
        embedsend.edit({embeds:[embed]})
    })

}