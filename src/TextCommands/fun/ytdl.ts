import {Message} from "discord.js"
import ytdl from "ytdl-core"
module.exports = {
    "name": "ytdl",
    "usage": `${require("../../default").defaultprefix}ytdl url`,
    "description": "download a youtube video",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        if (ytdl.validateURL(args[0]) === false) return msg.channel.send("Put An Valid Youtube Link")
    try {
        let info = await ytdl.getBasicInfo(args[0])
        let title = info.videoDetails.title
        let bufs:any = [];
        let stream = ytdl(args[0], {
            filter: format => format.container === 'mp4'
        });
        stream.on('data', function (d) {
            bufs.push(d);
        });
        stream.on('end', function () {
            let vid = Buffer.concat(bufs);
            
            if((msg.guild?.premiumTier === "NONE" || msg.guild?.premiumTier === "TIER_1" || msg.channel?.type === "DM")&& Buffer.byteLength(vid) >= 8388608) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            if(msg.guild?.premiumTier === "TIER_2" && Buffer.byteLength(vid) >= 52428800) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            if(msg.guild?.premiumTier === "TIER_3" && Buffer.byteLength(vid) >= 104857600) return msg.channel.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
            
            msg.channel.send({content:"Download Success",
                files: [{
                    attachment: vid,
                    name: title+".mp4"
                }]
            })
        })
        stream.on("error", (err) =>{
            msg.channel.send("Error " + err.message.substr(0,1000))
        })
    
    } catch (err){
        if(err){
            msg.channel.send("There Is Error When Fetching This Video Url")
            // msg.channel.send("Is This Video Privated Or Region Locked ??")
            console.log(err)
        }
    }
    }
}