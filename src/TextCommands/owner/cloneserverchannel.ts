import {
    Message,Channel,CategoryChannel,GuildChannel,TextChannel
} from "discord.js"
module.exports = {
    "name": "cloneserverchannel",
    "usage": `${require("../../default").defaultprefix}owner cloneserverchannel idservertoclone `,
    "description": "Clone A Discord Server",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        console.log("yokai")
        if(!args[0]) return msg.channel.send("give an serverID pls")
        const sertoclone = msg.client.guilds.cache.get(args[0])

        const channels = await sertoclone?.channels.fetch()
        channels?.filter((ch:Channel) => ch.type === "GUILD_CATEGORY").each(async (cat:any) =>{
            let catnow = await msg.guild?.channels.create(cat.name,{type:cat.type,position:cat.position})

            channels?.filter((ch:any) => ch.parent?.name === catnow?.name&&(ch.type === "GUILD_VOICE"||ch.type === "GUILD_TEXT")).each((ch:any)=>{
                msg.guild?.channels.create(ch.name,{type:ch.type,position:ch.position,parent:catnow?.id})
            })
        })
    }
}