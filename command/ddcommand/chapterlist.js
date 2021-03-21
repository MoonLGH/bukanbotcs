const config = require("./ddconfig.json")
const prefix = require("../../config.json")
const axios = require("axios")
const cheerio = require("cheerio")
exports.execute = async (msg, command, args, client, D, perm, color) => {
    let id = args[0]
    getinfo(msg, D, color, command, id)
}

exports.info = async (msg, command, args, client, D, perm, color, ID) => {
    getinfo(msg, D, color, command, ID)
}
async function getinfo(msg, D, color, command, ID) {

    if (!ID.startsWith("/") && ID == "") return msg.channel.send(`Please enter an valid Chapter List ID\nExample :\`${prefix}${command} /manga/your-situation/\``)
    const data = await axios.get(config.url + ID)
    const $ = cheerio.load(data.data)

    let info = []
    let name = $("#infoarea > div > div.infoanime.widget_senction > div.infox > h1").text()
    $("#infoarea > div > div.infoanime.widget_senction > div.infox > div.spe").each(function () {
        key = $(this).find("span > b").text()
        value = $(this).find("span").text().replace(key, "")
        info.push({
            key,
            value
        })
    })

    let img = $("#infoarea > div > div.infoanime.widget_senction > div.thumb > img").attr("src")

    let chapterlist = []
    $("#mCSB_1_container > li").each(function () {
        chapter = $(this).find("div.epsleft > div.lchx > a").text()
        chapterID = $(this).find("div.epsleft > div.lchx > a").attr("href")
        date = $(this).find("div.epsleft > div.date").text()
        chapterlist.push({
            chapter,
            chapterID,
            date
        })
    })

    let index = 0
    let embed = new D.MessageEmbed();
    embed.setAuthor(name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    embed.setTimestamp()
    embed.addField(`Nama`, name)
    embed.addField(`ID `, ID)
    if (info[0]) {
        embed.addField(info[0].key, info[0].value)
    }
    if (info[1]) {
        embed.addField(info[1].key, info[1].value)
    }
    if (info[2]) {
        embed.addField(info[2].key, info[2].value)
    }
    embed.addField("Chapter", chapterlist[index].chapter)
    embed.addField("ChapterID", chapterlist[index].chapterID)
    embed.addField("Date", chapterlist[index].date)
    console.log(chapterlist)
    embed.addField("\u200b", "\u200b")
    embed.addField("Command", `:book: : Read at the this Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
    embed.setImage(img)
    embed.setFooter(`${index+1} / ${chapterlist.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    embed.setColor(color);

    const embedsend = await msg.channel.send(embed)
    await embedsend.react("🗑️")
    await embedsend.react("⬅");
    await embedsend.react("➡");
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

    deletes.on("collect", async f => {
        embedsend.delete();
    })

    forwards.on("collect", async f => {
        if (index + 1 <= list.length) {
            index += 1
        }
        console.log(index)
        embed = new D.MessageEmbed();
        embed.setAuthor(name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        embed.setTimestamp()
        embed.addField(`Nama`, name)
        embed.addField(`ID `, ID)
        if (info[0]) {
            embed.addField(info[0].key, info[0].value)
        }
        if (info[1]) {
            embed.addField(info[1].key, info[1].value)
        }
        if (info[2]) {
            embed.addField(info[2].key, info[2].value)
        }
        embed.addField("Chapter", chapterlist[index].chapter)
        embed.addField("ChapterID", chapterlist[index].chapterID)
        embed.addField("Date", chapterlist[index].date)
        embed.addField("\u200b", "\u200b")
        embed.addField("Command", `:book: : Read at the this Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
        embed.setImage(img)
        embed.setFooter(`${index+1} / ${chapterlist.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        embed.setColor(color);
        embedsend.edit(embed)
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed();
        embed.setAuthor(name, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        embed.setTimestamp()
        embed.addField(`Nama`, name)
        embed.addField(`ID `, ID)
        if (info[0]) {
            embed.addField(info[0].key, info[0].value)
        }
        if (info[1]) {
            embed.addField(info[1].key, info[1].value)
        }
        if (info[2]) {
            embed.addField(info[2].key, info[2].value)
        }
        embed.addField("Chapter", chapterlist[index].chapter)
        embed.addField("ChapterID", chapterlist[index].chapterID)
        embed.addField("Date", chapterlist[index].date)
        embed.addField("\u200b", "\u200b")
        embed.addField("Command", `:book: : Read at the this Chapter \n :wastebasket: : Remove This Message \n :arrow_left: : Previous on the list \n :arrow_right: : Next on the list`)
        embed.setImage(img)
        embed.setFooter(`${index+1} / ${chapterlist.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        embed.setColor(color);

        console.log(index)
        embedsend.edit(embed)
    })

}