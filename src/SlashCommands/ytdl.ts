import ytdl,{videoFormat} from "ytdl-core"
import {CommandInteraction} from "discord.js"
module.exports = {
    name: "ytdl",
    description: "Download Youtube Video",
    options: [{
        "name": "url",
        "type": "STRING",
        "required": true,
        "description": "YT Video URL"
    }],
    interaction: async function (interaction:CommandInteraction) {

        let url = interaction.options.getString("url",true)
        if (!ytdl.validateURL(url)) return interaction.reply("Put An Valid Youtube Link")
        interaction.reply("Downloading...")
        try {
            let info = await ytdl.getBasicInfo(url)
            let title = info.videoDetails.title
            let bufs:any = [];
            let stream = ytdl(url, {
                filter: (format:videoFormat) => format.container === 'mp4'
            });
            stream.on('data', function (d:any) {
                bufs.push(d);
            });
            stream.on('end', function () {
                let vid = Buffer.concat(bufs);
                
                if((interaction.guild?.premiumTier === "NONE" || interaction.guild?.premiumTier === "TIER_1" || interaction.channel?.type === "DM")&& Buffer.byteLength(vid) >= 8388608) return interaction.channel?.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
                if(interaction.guild?.premiumTier === "TIER_2" && Buffer.byteLength(vid) >= 52428800) return interaction.channel?.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
                if(interaction.guild?.premiumTier === "TIER_3" && Buffer.byteLength(vid) >= 104857600) return interaction.channel?.send(`The Video Is Too Big Try Download It Yourself in \n https://ssyoutube.com/`)
                
                interaction.channel?.send({content:"Download Succsess",
                    files: [{
                        attachment: vid,
                        name: title+".mp4"
                    }]
                })
            })
        } catch (err){
            if(err){
                interaction.channel?.send("There Is Error When Fetching This Video Url")
                console.log(err)
            }
        }
    }
}