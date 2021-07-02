const D = require('djsmaster')
const client = new D.Client({intents: D.Intents.ALL})
require("dotenv").config()
const config = require('./config.json')
let prefix = config.prefix
const token = process.env.TOKEN || config.token
const color = 'RANDOM'
const msconv = require('./ext_module/MsConv.js')
const sleephandler = require('./ext_module/sleephandler.js')
const ready = require('./ext_module/ready.js')
const tags = require('./ext_module/tags.js')

client.on('ready', async () => {
  const oldLog = console.log;
  console.log = m => {
    logToDiscord(m);
    oldLog(m);
  }
  ready.ready(client, D)
})

function logToDiscord(m){
  client.channels.cache.get("831195323820408902").send(`Console Log: ${m}`)
}

function doRandHT() {
  const rand = ['Tail', 'Head']

  return rand[Math.floor(Math.random() * rand.length)]
} 

client.on('message', async (msg) => {
  try {
    sleephandler.sleep(msg)
     const handler = require('./ext_module/commandhandler')
    prefix = process.env.TESTPREFIX || config.prefixes.find(p => msg.content.toLowerCase().startsWith(p));
    if (prefix == undefined || !msg.content.startsWith(prefix)) return
    const args = msg.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    handler.execute(msg, command, args, client, D)
    tags.execute(msg,command,args,client,D)

    if (command == 'koin' || command == 'coin' || command == 'coinflip') {
      const coin = new D.MessageEmbed()
        .setDescription(doRandHT())
        .setTitle('Coinflip')
        .setAuthor(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
        .setFooter(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
      
        msg.channel.send({embeds:[coin]})

    } else if (command == 'inrole') {
      if (!msg.mentions.roles.first()) return msg.reply("Mention/Put An Role")
      let role = msg.mentions.roles.first()
      const had = role.members.map(m => m.user.tag).join('\n')

      const embed = new D.MessageEmbed()
        .setAuthor(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setTitle(role.name)
        .addField(`Who is in it ?`, had)
        .setTimestamp()
        .setFooter(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setColor(color)
      msg.channel.send({embeds:[embed]})

    } else if (command == 'botruntime') {
      const con = msconv.ms(client.uptime, 'ms')
      const sec = con.seconds
      const min = con.minutes
      const hour = con.hours
      const ms = con.milis
      const embed = new D.MessageEmbed()
        .setAuthor(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setTitle('Bot Runtime')
        .addField(`${ms}`, 'MSs')
        .addField(`${sec}`, 'Secs')
        .addField(`${min}`, 'Mins')
        .addField(`${hour}`, 'Hours')
        .addField(`${client.uptime} (ms)`, 'Total Uptime')
        .setTimestamp()
        .setFooter(msg.guild.me.displayName, msg.guild.iconURL({dynamic:true}))
        .setColor(color)
      msg.channel.send({embeds:[embed]})
    }

  } catch (error) {
    const embed = new D.MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addField("Error Occured!", error.message.substr(0,1000))
      .addField("Error Stack", error.stack.substr(0,1000))
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp()
    client.channels.cache.get("827236403263569980").send({embeds:[embed]})
  }
})

//login
client.login(token)
