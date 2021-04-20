exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (msg.type === "REPLY") {
        const to = await msg.channel.messages.fetch(msg.reference.messageID)
        const contents = args.join(" ")
        replytomsg(to,contents)
    }
}

function replytomsg(msg, content) {
    msg.reply(content)
}