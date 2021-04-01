const activity = require("./act.js")
const slash = require("./slash.js")
const welcome = require("../command/general/welcomer.js")
exports.ready = async function (client, d) {
    const guildname = await client.guilds.fetch('801839309073678346')

    console.log('()=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log(`Discord Bot on. Loggined as ${client.user.tag}`)
    activity.activity(client)
    console.log(`Bot Activity Has Been Setted`)
    slash.slash(client, d)
    sendmsg(client,d)
    // welcome.welcome(client)
    console.log(`Bot Slash Command Has Been on ${guildname.name}`)
    console.log('()=-()-=-=()=--=()=--=()=--=x()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log();
}
const now = new Date()
function sendmsg(client,D){
    const embed = new D.MessageEmbed()
    .setAuthor(client.user.tag,client.user.displayAvatarURL())
    .setDescription(`<@${client.user.id}> Just Turned On At ${now.getHours()}:${now.getMinutes()}`)
    .addField("Ready!","Bot Just Got On")
    .setFooter(client.user.tag,client.user.displayAvatarURL())
    client.channels.cache.get("827236403263569980").send(embed)
}