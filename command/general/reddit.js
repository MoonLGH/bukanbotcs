exports.execute = async function (msg, command, args, client, D, perm, color) {
    const api = require('imageapi.js');
    
    if(!args[0])return msg.channel.send("enter An Subreddit Name")

    const advanced = await api.advanced(args[0]);

    const embed = new D.MessageEmbed()
    .addField("EndPoint",`https://reddit.com/r/${args[0]}`)
    .addField("Upvote/DownVote",`${advanced.upvotes}/${advanced.downvotes}`)
    .addField("Author",`${advanced.author}`)
    .setTitle(`${advanced.title}`)
    .setImage(advanced.img)
    msg.channel.send(embed)
}