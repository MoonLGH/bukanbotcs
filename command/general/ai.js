const translate = require('@vitalets/google-translate-api');
const fetch = require("node-fetch")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    let translated = await translate(args.join(" "), {
        to: 'en',
        from: 'auto'
    })

    const res = await fetch(`https://api.udit.gq/api/chatbot?message=${translated.text}`)
    const result = await res.json()

    msg.channel.send(result.message)

}