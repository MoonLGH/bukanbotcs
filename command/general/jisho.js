const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();

exports.execute = async function (msg, command, args, client, D, perm, color) {

    let result = await jisho.searchForKanji(args.join())
    if (result.found == false) return msg.channel.send("No Kanji Founded With That Query")

    const embed = new D.MessageEmbed()
    .addField('Taught in: ' + result.taughtIn)
    .addField('JLPT level: ' + result.jlptLevel)
    .addField('Newspaper frequency rank: ' + result.newspaperFrequencyRank)
    .addField('Stroke count: ' + result.strokeCount)
    .addField('Meaning: ' + result.meaning)
    .addField('Kunyomi: ' + JSON.stringify(result.kunyomi))
    .addField('Kunyomi example: ' + JSON.stringify(result.kunyomiExamples[0]))
    .addField('Onyomi: ' + JSON.stringify(result.onyomi))
    .addField('Onyomi example: ' + JSON.stringify(result.onyomiExamples[0]))
    .addField('Radical: ' + JSON.stringify(result.radical))
    .addField('Parts: ' + result.parts.join(","))
    .setImage(result.strokeOrderGifUri)
    .addField('Jisho Uri: ' + result.uri)

    msg.channel.send(embed)
}