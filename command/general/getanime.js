const malScraper = require('mal-scraper');

exports.execute = async function (msg, command, args, client, D, perm, color) {
    const result = await malScraper.getInfoFromName(args.join(" "))
    const title = result.title
    const synopsis = result.synopsis
    const image = result.picture
    const japaneseTitle = result.japaneseTitle
    const synonyms = result.synonyms.join(",")
    const genres = result.genres.join(",")
    const studios = result.studios.join("/")
    const episodes = result.episodes
    const type = result.type

    if(!result) return msg.channel.send("No Anime Founded")

    const embed = new D.MessageEmbed()
    .setTitle(`${title}`)
    if(japaneseTitle){
        embed.addField("Japanese Title",`${japaneseTitle}`)
    }if(synonyms){
        embed.addField("synonyms",`${synonyms}`)
    }
    if(synopsis){
        embed.addField("synopsis",`${synopsis.substr(0,1000)}`)
    }if(episodes){
        embed.addField("Episodes",`${episodes}`)
    }if(genres){
        embed.addField("Genres",`${genres}`)
    }if(studios){
        embed.addField("Studios",`${studios}`)
    }if(type){
        embed.addField("Type",`${type}`)

    }
    embed.setImage(image)
    msg.channel.send(embed)
}
