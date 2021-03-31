const config = require("../../config.json")
const prefix = config.prefix
exports.execute = function (msg, command, args, client, D, perm, color, cd) {
    const normal = new D.MessageEmbed()
        .setTitle('General Command')
        .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .addField('**Untuk Semua**', 'Command Untuk Semua Orang')
        .addField('\u200B', '\u200B')
        .addField(`${prefix}about`, `Untuk Melihat Informasi tentang cleansound`, true)
        .addField(`${prefix}host`, `Untuk Melihat Nama Nama Host Cleansound`, true)
        .addField(`${prefix}about`, `Untuk Melihat Informasi tentang cleansound`, true)
        .addField(`${prefix}laporkan`, `Untuk Melaporkan Seseorang (Command ini hanya boleh dilakukan di channelnya)`, true)
        .addField(`${prefix}saran`, `Untuk Memberikan Saran (Command ini hanya boleh dilakukan di channelnya)`, true)
        .addField(`${prefix}peluk`, `Untuk Memeluk seseorang :3`, true)
        .addField(`${prefix}koin`, `Untuk bermain koinflip`, true)
        .addField(`${prefix}help Everyone`, `Untuk Melihat Command member (semua orang)`, true)
        .addField('\u200B', '\u200B')
        .addField('**Untuk Admin**', 'Command Untuk Semua Admin (Khusus Admin)')
        .addField('\u200B', '\u200B')
        .addField(`${prefix}tunagrahita`, `Untuk Memberi Orang Role tunagrahita`, true)
        .addField(`${prefix}maafkan`, `Untuk Mencabut Role tunagrahita`, true)
        .addField(`${prefix}peringatan`, `Untuk Memberikan role surat peringatan`, true)
        .addField(`${prefix}poll`, `Untuk Bermusyawarah dengan rakyat`, true)
        .addField(`${prefix}help Admin`, `Untuk Melihat Command Admin`, true)
        .addField('\u200B', '\u200B')
        .addField('**Tips**', 'Agar Lebih Mudah')
        .addField(`${prefix}help Everyone`, `Untuk Melihat Command member (semua orang)`, true)
        .addField(`${prefix}help Admin`, `Untuk Melihat Command Admin`, true);

    const channelmaker = new D.MessageEmbed()
        .setTitle('Channel Maker Command')
        .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .addField(`${prefix}createtext (Name )`, 'Make an text channel')
        .addField(`${prefix}createvoice (name)`, 'Make an voice channel`')
        .addField(`${prefix}setnsfw`, 'set the channel nsfw')
        .addField(`${prefix}offnsfw`, 'set the channel non nsfw')
        .addField(`${prefix}settopic (topic)`, 'set the channel topic')
        .addField(`${prefix}delch`, 'delete channel')
        .addField(`${prefix}setcat (category id)`, 'set the channel category')
        .addField(`${prefix}delmsg`, 'Menghapus Beberapa Message')
        .setColor(color);

    const admin = new D.MessageEmbed()
        .setTitle('Admin Command')
        .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .addField(`${prefix}tunagrahita`, `Untuk Memberi Orang Role tunagrahita`, true)
        .addField(`${prefix}maafkan`, `Untuk Mencabut Role tunagrahita`, true)
        .addField(`${prefix}peringatan`, `Untuk Memberikan role surat peringatan`, true)
        .addField(`${prefix}poll`, `Untuk Bermusyawarah dengan rakyat`, true)
        .addField(`${prefix}help ChannelMaker`, `Untuk Melihat Command Admin`, true);

    const Member = new D.MessageEmbed()
        .setTitle('Everyone Command')
        .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .addField(`${prefix}about`, `Untuk Melihat Informasi tentang cleansound`, true)
        .addField(`${prefix}host`, `Untuk Melihat Nama Nama Host Cleansound`, true)
        .addField(`${prefix}about`, `Untuk Melihat Informasi tentang cleansound`, true)
        .addField(`${prefix}laporkan`, `Untuk Melaporkan Seseorang (Command ini hanya boleh dilakukan di channelnya)`, true)
        .addField(`${prefix}saran`, `Untuk Memberikan Saran (Command ini hanya boleh dilakukan di channelnya)`, true)
        .addField(`${prefix}peluk`, `Untuk Memeluk seseorang :3`, true)
        .addField(`${prefix}help Everyone`, `Untuk Melihat Command yang semua orang bisa`, true)



    if (cd.cooldownhelp.has(msg.author.id)) {
        msg.delete({
            timeout: 5000
        })
        msg.channel.send(cd).then(cd => cd.delete({
            timeout: 5000
        }))
    } else {
        if (!args[0]) return msg.channel.send(normal);
        else if (args[0].toLowerCase() == "everyone") return msg.channel.send(Member);
        else if (args[0].toLowerCase() == "channelmaker") return msg.channel.send(channelmaker);
        else if (args[0].toLowerCase() == "admin") return msg.channel.send(admin);
        else msg.channel.send(normal);

        cd.cooldownhelp.add(msg.author.id)
        setTimeout(() => {
            cd.cooldownhelp.delete(msg.author.id)
        }, 60000);
    }
}