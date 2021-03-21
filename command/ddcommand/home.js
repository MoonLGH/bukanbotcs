const config = require("./ddconfig.json")
const axios = require("axios")
const cheerio = require("cheerio")
exports.execute = async (msg, command, args, client, D, perm, color) => {
    if (!msg.channel.nsfw)
        return msg.channel
            .send(`NSFW channel please.`)
            .then(msg => msg.delete({
                timeout: 5000
            }));

    const data = await axios.get(config.url)
    const $ = cheerio.load(data.data)
    let list = []
    $("#main > div").eq(1).find("div.post-show2 > article").each(function () {
        let name = $(this).find("div > div > a").attr("alt")
        let type = $(this).find("div > div > a > div > div.type").text()
        let chapter = $(this).find("div > div > div > div > div.plyepisode > a").text()
        let id = $(this).find("div > div > a").attr("href").replace(config.url, "")
        let chapterid = $(this).find("div > div > div > div > div.plyepisode > a").attr("href").replace(config.url, "")
        let imageurl = $(this).find("div > div > a > div > img").attr("src")
        list.push({
            name,
            type,
            chapter,
            id,
            chapterid,
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
        .addField(`Highlited Chapter`, list[index].chapter)
        .addField(`Highlited Chapter ID`, list[index].chapterid)
        .addField("\u200b", "\u200b")
        .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :book: : Read at the Highlited Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
        .setImage(list[index].imageurl)
        .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

    const embedsend = await msg.channel.send(embed)
    await embedsend.react("🗑️")
    await embedsend.react("⬅");
    await embedsend.react("➡");
    await embedsend.react("📚")
    await embedsend.react("📖");

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
        require("./chapterlist.js").info(msg,command,args,client,D,perm,color,list[index].id)
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
            .addField(`Highlited Chapter`, list[index].chapter)
            .addField(`Highlited Chapter ID`, list[index].chapterid)
            .addField("\u200b", "\u200b")
            .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :book: : Read at the Highlited Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
            .setImage(list[index].imageurl)
            .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        embedsend.edit(embed)
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
            .addField(`Highlited Chapter`, list[index].chapter)
            .addField(`Highlited Chapter ID`, list[index].chapterid)
            .addField("\u200b", "\u200b")
            .addField("Command", `:books: : Look at the chapter list for ${list[index].name} \n :book: : Read at the Highlited Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
            .setImage(list[index].imageurl)
            .setFooter(`${index+1} / ${list.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color);

        console.log(index)
        embedsend.edit(embed)
    })

}