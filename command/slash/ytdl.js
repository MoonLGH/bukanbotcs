module.exports = {
    name: "ytdl",
    description: "Download A Youtube Video",
    options: [{
        type: 3,
        name: "link",
        description: "Link the video url/ID",
        default: false,
        required: true
    }],
    interaction: function (msg, client) {
        msg.reply("Slash Interaction Sucsses")
        dl(msg.options[0].value)
    }
}

let ytdl = require("ytdl-core")

async function dl(msg) {
    if (ytdl.validateURL(msg.options[0].value) === false) return msg.channel.send("Put An Valid Youtube Link")
    let info = await ytdl.getBasicInfo(msg.options[0].value)

    let title = info.videoDetails.title
    let bufs = [];
    let stream = ytdl(msg.options[0].value, {
        filter: format => format.container === 'mp4'
    });
    stream.on('data', function (d) {
        bufs.push(d);
    });
    stream.on('end', function () {
        let vid = Buffer.concat(bufs);
        if (Buffer.byteLength(vid) >= 8388608) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
        msg.channel.send("Download success ", {
            files: [{
                attachment: vid,
                name: title + ".mp4"
            }]
        })
    })

}