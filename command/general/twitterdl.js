exports.execute = async function (msg, command, args, client, D, perm, color) {
    const {
        promisify
    } = require('util')
    const {
        instagram,
        twitter
    } = require('video-url-link')

    const igGetInfo = promisify(instagram.getInfo)
    const twtGetInfo = promisify(twitter.getInfo)

    const result = await twtGetInfo(args[0], {})
    msg.channel.send("Download success ", {
        files: [{
            attachment: result.variants[result.variants.length - 1].url 
        }]
    })
}