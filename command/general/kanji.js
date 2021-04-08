const cd = new Set()
let cool
let numb
const prefix = require("../../config.json").prefix
exports.execute = async function (msg, command, args, client, D, perm, color) {
    let kanjis = []

    if (args[0] === "cooldown" || args[0] == "cd") {
        if (args[1] === "true" || args[1] === "on") {
            if (perm.Sadmin || perm.host) {
                cool = true
                msg.channel.send(`Cooldown For ${command} Has Setted To true`)
                numb = 10000
                if(args[2] && isNaN(args[2]) === false){
                    numb = Number(args[2]) *1000
                }
                msg.channel.send("Cooldown Active for every " + numb/1000 + " second")
            } else {
                msg.channel.send(`You Are Not A Admin`)
            }
            return
        }
        if (args[1] === "false" || args[1] === "off") {
            if (perm.Sadmin || perm.host) {
                cool = false
                msg.channel.send(`Cooldown For ${command} Has Setted To false`)
            } else {
                msg.channel.send(`You Are Not A Admin`)
            }
            return
        }
    }
    const axios = require("axios")
    const cheerio = require("cheerio")

    const data = await axios.get("https://jisho.org/search/" + args.join(" "))

    let $ = cheerio.load(data.data)

    $("#primary > div.exact_block > div").each(function(){
        let text
        text = $(this).find("div.concept_light-wrapper.columns.zero-padding > div.concept_light-readings.japanese.japanese_gothic > div > span.text").text()
        kanjis.push({text})
    })

    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setDescription("Use command `"+prefix+ "jisho "+kanjis[index].text +"` To see the kanjis on jisho" )
        .addField("Kanji",kanjis[index].text)
        .setFooter(`${index+1} / ${kanjis.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);
if(cool === true){
    if (cd.has(msg.author.id)) {
        msg.delete({
            timeout: 5000
        })
        return msg.channel.send(`Cooldown For ${numb/1000} second!`).then(cod => cod.delete({
            timeout: 5000
        }))
    }

    cd.add(msg.author.id)
    setTimeout(() => {
        cd.delete(msg.author.id)
    }, numb)
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
        if (index+1 <= kanjis.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setDescription("Use command `"+prefix+ "jisho "+kanjis[index].text +"` To see the kanjis on jisho" )
        .addField("Kanji",kanjis[index].text)
        .setFooter(`${index+1} / ${kanjis.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
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
        .setDescription("Use command `"+prefix+ "jisho "+kanjis[index].text +"` To see the kanjis on jisho" )
        .addField("Kanji",kanjis[index].text)
        .setFooter(`${index+1} / ${kanjis.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

        embedsend.edit(embed)
    })
}