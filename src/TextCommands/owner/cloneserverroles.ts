import {
    Message,Channel,CategoryChannel,GuildChannel,TextChannel
} from "discord.js"
module.exports = {
    "name": "cloneserverroles",
    "usage": `${require("../../default").defaultprefix}owner cloneserverroles idservertoclone `,
    "description": "Clone A Discord Server",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        console.log("yokai")
        if(!args[0]) return msg.channel.send("give an serverID pls")
        const sertoclone = msg.client.guilds.cache.get(args[0])

        const roles = await sertoclone?.roles.fetch()

        roles?.each((roles)=>{
            msg.guild?.roles.create({name:roles.name,color:roles.color,position:roles.position,permissions:roles.permissions})
        })
    }
}