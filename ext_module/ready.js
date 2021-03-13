const activity = require("./act.js")
const slash = require("./slash.js")
const welcome = require("../command/welcomer.js")
exports.ready = async function (client, d) {
    const guildname = await client.guilds.fetch('801839309073678346')

    console.log('()=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log(`Discord Bot on. Loggined as ${client.user.tag}`)
    setInterval(() => {
        activity.activity(client)
    }, 2000);
    console.log(`Bot Activity Has Been Setted`)
    slash.slash(client, d)
    // welcome.welcome(client)
    console.log(`Bot Slash Command Has Been on ${guildname.name}`)
    console.log('()=-()-=-=()=--=()=--=()=--=x()=--=()=-()-=-=()=--=()=--=()=--=()=--=()')
    console.log();
}