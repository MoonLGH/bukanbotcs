const config = require("../config.json")
exports.activity = async function (client) {
    let guildid = await client.guilds.fetch('801839309073678346')
    let MoonL = (await guildid.members.fetch("460361291962515457")).displayName

    client.user.setStatus(`online`)
    client.user.setActivity(
      `with ${MoonL}` + ` | Untuk bantuan ${config.prefix}help`,
      { type: "PLAYING" }
    )
}   