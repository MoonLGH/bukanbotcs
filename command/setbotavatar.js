const config = require('../config.json')
exports.execute = function (msg, command, args, client, D, perm, color) {
  if (msg.author.id !== config.MoonLID) {
    return msg.channel.send('Kamu Bukan <@' + config.MoonLID + '>')
  }
  client.user.setAvatar('./nao.gif')
}
