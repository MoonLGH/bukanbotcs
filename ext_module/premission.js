let config = require("../config.json")
let color = "#RANDOM"
exports.premission = function(msg,D){

    let hostmsg
    hostmsg = new D.MessageEmbed()
    hostmsg.setTitle('Permintaan Gagal')
    hostmsg.addField('Kamu Tidak Memiliki Role Yang Dibutuhkan!','Role yang di butuhkan = Host')
    hostmsg.addField('\u200B','\u200B')
    hostmsg.addField('Jika Preventer ini tetap muncul Walau Kamu Punya rolenya','Hubungi Seseorang')
    hostmsg.setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    hostmsg.setTimestamp()
    hostmsg.setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    hostmsg.setColor(color)

    if(msg.channel.type === "dm") return {Sadmin:true,host:true,hostmsg:hostmsg}


    let Sadmin , host
    if(msg.member.roles.cache.get(config.superadmin)) Sadmin = true
    else Sadmin = false

    if(msg.member.roles.cache.get(config.host)) host = true
    else host = false




    return {Sadmin:Sadmin,host:host,hostmsg:hostmsg}
}
