const fetch = require("node-fetch")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    const res = await fetch(args.join(" "))

    const json = await res.json()

    msg.channel.send(JSON.stringify(json).substr(0,2000))

}