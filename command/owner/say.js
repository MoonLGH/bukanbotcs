exports.execute = async function (msg, command, args, client, D, perm, color) {
msg.delete()
msg.channel.send(args.join(" "))
}