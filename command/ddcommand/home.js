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
    $("#main > div").eq(1).find("div.post-show2 > article").each(function(){
        let name = $(this).find("div > div > a").attr("alt")
        let type = $(this).find("div > div > a > div > div.type").text()
        let chapter = $(this).find("div > div > div > div > div.plyepisode > a").text()
        let id = $(this).find("div > div > a").attr("href").replace(config.url,"")
        let chapterid = $(this).find("div > div > div > div > div.plyepisode > a").attr("href").replace(config.url,"")
        list.push({name,type,chapter,id,chapterid})
    })

    const send = new D.MessageEmbed()
    .setTitle('DoujinDesu Home')
    .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    .setTimestamp()
    .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    .addField(`${list[0].name}`, `Nama : ${list[0].name}\n ID : ${list[0].id}\n Tipe : ${list[0].type}\n Chapter : ${list[0].chapter}\n Chapter ID : ${list[0].chapterid}`, true)
    .addField(`${list[1].name}`, `Nama : ${list[1].name}\n ID : ${list[1].id}\n Tipe : ${list[1].type}\n Chapter : ${list[1].chapter}\n Chapter ID : ${list[1].chapterid}`, true)
    .addField(`${list[2].name}`, `Nama : ${list[2].name}\n ID : ${list[2].id}\n Tipe : ${list[2].type}\n Chapter : ${list[2].chapter}\n Chapter ID : ${list[2].chapterid}`, true)
    .addField(`${list[3].name}`, `Nama : ${list[3].name}\n ID : ${list[3].id}\n Tipe : ${list[3].type}\n Chapter : ${list[3].chapter}\n Chapter ID : ${list[3].chapterid}`, true)
    .addField(`${list[4].name}`, `Nama : ${list[4].name}\n ID : ${list[4].id}\n Tipe : ${list[4].type}\n Chapter : ${list[4].chapter}\n Chapter ID : ${list[4].chapterid}`, true)

    msg.channel.send(send)
}