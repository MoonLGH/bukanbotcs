exports.execute = function (msg, command, args, client, D, perm, color) {
msg.channel.send(`${args.join(" ")}`)
}