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
    .addField("Japanese Title",`${japaneseTitle}`)
    .addField("synonyms",`${synonyms}`)
    .addField("synopsis",`${synopsis}`)
    .addField("Episodes",`${episodes}`)
    .addField("Genres",`${genres}`)
    .addField("Studios",`${studios}`)
    .addField("Type",`${type}`)
    .setImage(image)
    msg.channel.send(embed)
}