let ytdl = require("ytdl-core")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (ytdl.validateURL(args[0]) === false) return msg.channel.send("Put An Valid Youtube Link")
    let info = await ytdl.getBasicInfo(args[0])

    let fileOptions = {
        filename: info.videoDetails.title.replaceAll("[^a-zA-Z0-9\\.\\-]", "_"),
    };
    let bufs = [];
    let stream = ytdl(args[0], {
        filter: format => format.container === 'mp4'
    });
    stream.on('data', function (d) {
        bufs.push(d);
    });
    stream.on('end', function () {
        let vid = Buffer.concat(bufs);
        msg.channel.send("Download Sucsess", {
            files: [{
                attachment: vid,
                name: info.videoDetails.title.replaceAll("[^a-zA-Z0-9\\.\\-]", "_")
            }]
        })
    })

}