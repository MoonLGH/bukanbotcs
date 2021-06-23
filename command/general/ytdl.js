let ytdl = require("ytdl-core")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (ytdl.validateURL(args[0]) === false) return msg.channel.send("Put An Valid Youtube Link")
    try {
        let info = await ytdl.getBasicInfo(args[0])
        let title = info.videoDetails.title
        let bufs = [];
        let stream = ytdl(args[0], {
            filter: format => format.container === 'mp4'
        });
        stream.on('data', function (d) {
            bufs.push(d);
        });
        stream.on('end', function () {
            let vid = Buffer.concat(bufs);
            
            if((msg.guild.premiumTier === "NONE" || msg.guild.premiumTier === "TIER_1" || msg.channel.type === "dm")&& Buffer.byteLength(vid) >= 8388608) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            if(msg.guild.premiumTier === "TIER_2" && Buffer.byteLength(vid) >= 52428800) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            if(msg.guild.premiumTier === "TIER_3" && Buffer.byteLength(vid) >= 104857600) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            
            msg.channel.send("Download success ", {
                files: [{
                    attachment: vid,
                    name: title+".mp4"
                }]
            })
        })
    
    } catch (err){
        if(err){
            msg.channel.send("There Is Error When Fetching This Video Url")
            msg.channel.send("Is This Video Privated Or Region Locked ??")
            console.log(err)
        }
    }
    
}
