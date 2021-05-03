const tiktok = require('tiktok-scraper')
exports.execute = async function (msg, command, args, client, D, perm, color) {
    let url = args[0]

    if (!url.includes('tiktok.com')) return msg.channel.send("Not an valid link founded")
    let result = await tiktok.getVideoMeta(url, {
        noWaterMark: true,
        hdVideo: true
    })
    if (result.collector[0].videoUrlNoWaterMark) {
        result.url = result.collector[0].videoUrlNoWaterMark
        result.NoWaterMark = true
    } else {
        result.url = result.collector[0].videoUrl
        result.NoWaterMark = false
    }
    title = result.collector[0].text

    msg.channel.send("Download success ", {
        files: [{
            attachment: result.url,
            name: title+".mp4"
        }]
    })
}