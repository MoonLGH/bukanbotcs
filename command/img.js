exports.execute = async function (msg, command, args, client, D, perm, color) {
    let image = []
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

    let index = 1
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setDescription(`Dari ${image[index].from}`)
        .setImage(image[index].imageurl)
        .setFooter(`${index} / ${image.length}`, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
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

    forwards.on("collect",async f =>{
        if(index <= image.length){
            index += 1
        }
        embedsend.edit(embed)
    })
    
    backwards.on("collect",async f =>{
        if(index => 1){
            index -= 1
        }
        embedsend.edit(embed)
    })
}