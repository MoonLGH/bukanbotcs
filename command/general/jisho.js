const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();

exports.execute = async function (msg, command, args, client, D, perm, color) {

    let result = await jisho.searchForKanji(args.join())
    if (result.found == false) return msg.channel.send("No Kanji Founded With That Query")

    const embed = new D.MessageEmbed()
        .addField('Taught in: ', result.taughtIn)
        .addField('JLPT level: ', result.jlptLevel)
        .addField('Newspaper frequency rank: ', result.newspaperFrequencyRank) 
        .addField('Stroke count: ', result.strokeCount)
        .addField('Meaning: ', result.meaning)
        .addField('Kunyomi: ', result.kunyomi.join(","))
    if (result.kunyomiExamples[0]) {
        embed.addField('Kunyomi example: ', result.kunyomiExamples[0].example + " Example\n" + result.kunyomiExamples[0].reading + " Reading\n" + result.kunyomiExamples[0].meaning + " Meaning")
    }
    embed.addField('Onyomi: ', result.onyomi.join(","))
    if (result.onyomiExamples[0]) {
        embed.addField('Onyomi example: ', result.onyomiExamples[0].example + " Example\n" + result.onyomiExamples[0].reading + " Reading\n" + result.onyomiExamples[0].meaning + " Meaning")
    }
    embed.addField('Radical: ', `${result.radical.symbol} Symbol \n ${result.radical.forms} Forms \n ${result.radical.meaning}`)
        .addField('Parts: ', result.parts.join(","))
        .setImage(result.strokeOrderGifUri)
        .addField('Jisho Uri: ', result.uri)

    // msg.channel.send(embed)
    msg.channel.send({embeds:[embed]})
}