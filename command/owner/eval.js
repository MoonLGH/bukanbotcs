exports.execute = async function (msg, command, args, client, D, perm, color) {
    const code = args.join(" ")
    msg.channel.send(eval(code))
}