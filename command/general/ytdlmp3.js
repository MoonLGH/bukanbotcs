let ytdl = require("ytdl-core")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (ytdl.validateURL(args[0]) === false) return msg.channel.send("Put An Valid Youtube Link")
    let info = await ytdl.getBasicInfo(args[0])

    let title = info.videoDetails.title
    let bufs = [];
    let stream = ytdl(args[0], {
        filter: 'audioonly'
    });
    stream.on('data', function (d) {
        bufs.push(d);
    });
    stream.on('end', function () {
        let vid = Buffer.concat(bufs);
        if(Buffer.byteLength(vid) >= 8388608) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
        msg.channel.send({content:"Download Success",
            files: [{
                attachment: vid,
                name: title+".mp3"
            }]
        })
    })

}