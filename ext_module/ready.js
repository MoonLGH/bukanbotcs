const activity = require("./act.js")
const slash = require("./slash.js")
const welcome = require("../command/welcomer.js")
exports.ready = async function (client, d) {
    const guildname = await client.guilds.fetch('801839309073678346')

    console.log('()=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log(`Discord Bot on. Loggined as ${client.user.tag}`)
    activity.activity(client)
    console.log(`Bot Activity Has Been Setted`)
    slash.slash(client, d)
    // welcome.welcome(client)
    console.log(`Bot Slash Command Has Been on ${guildname.name}`)
    console.log('()=-()-=-=()=--=()=--=()=--=x()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log();
}