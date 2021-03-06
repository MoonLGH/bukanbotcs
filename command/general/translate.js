const translate = require('@vitalets/google-translate-api');
const lang = require("./langs")
const config = require("../../config.json")
exports.execute = async function (msg, command, args, client, D, perm, color) {


    if (args[0] == "code-name") {
        return msg.reply("https://github.com/MoonLGH/bukanbotcs/blob/main/command/general/langs.js \nFor List of Languages(and their code)")
    }

    if (!args[0]) return msg.reply(`Do ${config.prefix}${command} [From Language] [To Language] "What you want to translate"`)
    let from
    if (lang.isSupported(args[0]) == false) return msg.reply("No Language Founded By That Type\nTry Doing " + `${config.prefix}${command} code-name`)
    from = args.shift()

    let to
    if (lang.isSupported(args[0]) == false) return msg.reply("No Language Founded By That Type\nTry Doing " + `${config.prefix}${command} code-name`)
    to = args.shift()
    // if(lang.isSupported(args[0]) && lang.isSupported(args[1]))

    let late = await translate(args.join(" "), {
        to: to,
        from: from
    })

    const tosent = new D.MessageEmbed()
        .setAuthor(msg.author.username, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .addField("From", lang.getname(late.from.language.iso), true)
        .addField("To", lang.getname(to), true)
        .addField("Result", late.text)
        .setFooter(msg.author.username, 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setColor(color);

    msg.channel.send({embeds:[tosent]})
}