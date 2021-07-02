const cd = new Set()
let cool
let numb
exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (args[0] === "cooldown" || args[0] == "cd") {
        if (args[1] === "true" || args[1] === "on") {
            if (perm.Sadmin || perm.host) {
                cool = true
                msg.channel.send(`Cooldown For ${command} Has Setted To true`)
                numb = 10000
                if (args[2] && isNaN(args[2]) === false) {
                    numb = Number(args[2]) * 1000
                }
                msg.channel.send("Cooldown Active for every " + numb / 1000 + " second")
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

    const data = await axios.get("https://tenor.com/search/" + args.join(" "))

    let $ = cheerio.load(data.data)
    let image = []
    $("#view > div > div > div > div.GifList > div").each(function () {
        $(this).find("figure").each(function () {
            imageurl = $(this).find("a > div.Gif > img").attr("src")
            from = $(this).find("a > div.Gif > img").attr("src")
            image.push({
                imageurl,
                from
            })
        })
    })

    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor(args.join(" "), msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setDescription(`Dari: \n${image[index].from}`)
        .setImage(image[index].imageurl)
        .setFooter(`${index+1} / ${image.length}`, msg.guild.iconURL({dynamic:true}))
        .setColor(color);
    if (cool === true) {
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
        if (index + 1 <= image.length) {
            index += 1
        }
        console.log(index)
        embed = new D.MessageEmbed()
            .setAuthor(args.join(" "), msg.guild.iconURL({dynamic:true}))
            .setTimestamp()
            .setDescription(`Dari ${image[index].from}`)
            .setImage(image[index].imageurl)
            .setFooter(`${index+1} / ${image.length}`, msg.guild.iconURL({dynamic:true}))
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
            .setDescription(`Dari: \n${image[index].from}`)
            .setImage(image[index].imageurl)
            .setFooter(`${index+1} / ${image.length}`, msg.guild.iconURL({dynamic:true}))
            .setColor(color);

        console.log(index)
        embedsend.edit({embeds:[embed]})
    })
}