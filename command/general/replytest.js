exports.execute = async function (msg, command, args, client, D, perm, color) {

    reply(msg, args.join(" "))

}

let Dmaster = require("djsmaster")
let { APIMessage } = Dmaster

function reply(msg, content, options) {
    return msg.channel.send(
        content instanceof APIMessage ?
        content :
        APIMessage.transformOptions(content, options, {
            replyTo: msg,
        }),
    );
}
