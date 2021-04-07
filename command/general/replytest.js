exports.execute = async function (msg, command, args, client, D, perm, color) {

reply(msg,args.join(" "))

}
let { APIMessage } = require("discord.js")
function reply(msg,content, options) {
    return msg.channel.send(
        content instanceof APIMessage ?
        content :
        APIMessage.transformOptions(content, options, {
            replyTo: msg,
        }),
    );
}