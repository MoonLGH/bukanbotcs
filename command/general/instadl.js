exports.execute = async function (msg, command, args, client, D, perm, color) {
    const {
        promisify
    } = require('util')
    const {
        instagram,
        twitter
    } = require('video-url-link')

    const igGetInfo = promisify(instagram.getInfo)

    const result = await igGetInfo(args[0], {})
    console.log(result)
    // msg.channel.send("Download success ", {
    //     files: [{
    //         attachment: result.variants[result.variants.length - 1].url,
    //         name: result.full_text + ".mp4"
    //     }]
    // })
}