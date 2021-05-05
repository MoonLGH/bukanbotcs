let work = false
exports.execute = async function (msg, command, args, client, D, perm, color) {

    if(work === false){
        return msg.channel.send("This command dont work")
    }
    var ig = require('instagram-scraping');

    if (!args[0]) {
        return msg.channel.send("Provide Args stupid\n use @{username} to get user data \n https://www.instagram.com/p/postid to download things")
    }
    if (args[0].startsWith("@")) {
        try{
            const result = await ig.scrapeUserPage(args[0].replace("@", ""))

            const embed = new D.MessageEmbed()
                .setAuthor(result.user.username, result.user.profile_pic_url)
                if(result.user.biography){
                embed.addField("Bio", result.user.biography.substr(0, 1000))
                }
                embed.addField("Post", result.total)
                .addField("Full Name", result.user.full_name)
                .addField("Followers", result.user.edge_followed_by.count,true)
                .addField("Following", result.user.edge_follow.count,true)
    
            msg.channel.send(embed)
        }catch(error){
            msg.channel.send(error.message)
        }

    } else if (args[0].includes("/p/") || args[0]) {
        try{
            const result = await ig.scrapePostCode(args[0].replace("https://", "").replace("http://", "").replace("www.", "").replace("instagram.com", "").replace("/p/", "").replace("/", "")).catch(err =>{msg.channel.send(err)})

            const embed = new D.MessageEmbed()
            .setAuthor(result.owner.username, result.owner.profile_pic_url)
            .addField("User Page",`[Click Me](https://www.instagram.com/${result.owner.username})`)
    
            if (result.is_video === true) {
                msg.channel.send({
                    embed: embed,
                    files: [{
                        attachment: result.video_url
                    }]
                })
            } else if (result.is_video === false) {
                msg.channel.send({
                    embed: embed,
                    files: [{
                        attachment: result.display_url
                    }]
                })
            }
        }catch(error){
            msg.channel.send(error.message)
        }
        
    }
}