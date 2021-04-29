const malScraper = require('mal-scraper');

exports.execute = async function (msg, command, args, client, D, perm, color) {
    const result = await malScraper.search.search('manga',{term: args.join(" ")})
    const ch = result.nbChapters
    const title = result.title
    const type = result.type
    const type = result.thumbnail

    if(!result) return msg.channel.send("No Anime Founded")

    const embed = new D.MessageEmbed()
    .setTitle(`${title}`)
    if(japaneseTitle){
        embed.addField("Japanese Title",`${japaneseTitle}`)
    }if(type){
        embed.addField("Type",`${type}`)
    }
    embed.setImage(image)
    msg.channel.send(embed)
}