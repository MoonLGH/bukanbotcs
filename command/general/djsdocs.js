const fetch = require("node-fetch")
exports.execute = async function (msg, command, args, client, D, perm, color) {
    let project = "stable"
    const newargs = []
    args.forEach(args =>{
        if(args.toLowerCase().startsWith("--src=")){
            const match = args.toString().match(/--src=(?<project>[a-zA-Z]+)/) ?.groups

            project = match.project
        }else{
            newargs.push(args)
        }
    })

    let queryString = newargs.join(" ")
    // project: stable, master, rpc, commando, akairo or akairo-master
    const response = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${project}&q=${queryString}`)
    const res = await response.json()

    if(!res){
        return msg.channel.send("Nothing Founded")
    }
    if(res.error && res.message === "Couldn't find/parse given source."){
        msg.channel.send("No Project Source Founded,\n Maybe Use One Of This : `stable`, `master`, `rpc`, `commando`, `akairo` or `akairo-master`")
    }
    const embed = new D.MessageEmbed()
    .setURL(res.url)
    .addFields(res.fields)
    .setDescription(res.description)
    .setColor(res.color)
    .setAuthor(res.author.name,res.author.icon_url,res.author.url)
    msg.channel.send({embeds:[embed]})
}