exports.execute = async function (msg, command, args, client, D, perm, color) {
    const alexa = require('alexa-bot-api')
    const ai = new alexa()
    
    const reply = await ai.getReply(args.join(" "));
    
    msg.channel.send(reply)
}