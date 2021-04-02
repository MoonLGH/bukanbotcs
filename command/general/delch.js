exports.execute = async function (msg, command, args, client, D, perm, color) {
    const mentionedChannel = msg.mentions.channels.first() || msg.channel

    if (perm.Sadmin || perm.host) {
      mentionedChannel.delete()
    } else {
      msg.delete({
        timeout: 5000
      })
      msg.channel.send(perm.hostmsg).then(hostmsg => hostmsg.delete({
        timeout: 5000
      }))
    }
}