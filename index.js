const D = require('discord.js')
const client = new D.Client();
const config = require('./config.json')
const prefix = config.prefix;
const token = process.env.Token || config.token;
const color = "RANDOM"
const msconv = require("./ext_module/MsConv.js")
const ready = require("./ext_module/ready.js")

function lempar() {
    var rand = ['**ejekan**', '**Alpukat Mentega**', '**Pohon Durian**', '**Baling Baling Bambu**', '**Galaksi Bima Sakti**', '**Kekosongan**', '**kursi gaming**', '**Penganut Bumi Datar**', '**https://youtu.be/dQw4w9WgXcQ**', '**H2o**', '**glukosa**', '**All Might**', '**Mami Chan**', '**Megumin**', '**Emilia**', '**Mobil**', '**Titanic**', '**CC206**', '**CC201**', '**Rumah**', '**Kereta**', '**Bandara**', '**Stasiun**', '**Boeing 737**', '**batu**', '**tanah**', '**pesawat**', '**gedung**', '**Stadium Gelora Bung karno**', '**Lampu**', '**Kunci Kehidupan**', '**Cinta**', '**Kekesalan**', '**Corona**'];

    return rand[Math.floor(Math.random() * rand.length)];
}

client.on('ready', async () => {
    ready.ready(client, D)
});


const cooldown = new Set();
const cooldowncf = new Set()
const cooldownhelp = new Set()
const cooldownhost = new Set()
const cooldownsaran = new Set()
const cooldownlapor = new Set()
const cooldownt = new Set();
client.on("message", async (msg) => {
    const handler = require("./ext_module/commandhandler")
    if (!msg.content.toLowerCase().startsWith(prefix)) return
    let args = msg.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    handler.execute(msg, command, args, client, D)
    const host = msg.member.roles.cache.get(config.host)
    const Sadmin = msg.member.roles.cache.get(config.superadmin)
    //admin preventer
    const hostmsg = new D.MessageEmbed()
    hostmsg.setTitle('Permintaan Gagal')
    hostmsg.addField('Kamu Tidak Memiliki Role Yang Dibutuhkan!', 'Role yang di butuhkan = Host')
    hostmsg.addField('\u200B', '\u200B')
    hostmsg.addField('Jika Preventer ini tetap muncul Walau Kamu Punya rolenya', 'Hubungi Seseorang')
    hostmsg.setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    hostmsg.setTimestamp()
    hostmsg.setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
    hostmsg.setColor(color)

    //CD MSG
    const cd = new D.MessageEmbed()
        .setDescription(`${msg.author.username} Tangan Ku Capek Tunggu 1 Menit Dulu`)
        .setTitle('Maaf Kamu ga bisa')
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')

    const cdlapor = new D.MessageEmbed()
        .setDescription(`${msg.author.username} Kamu Harus Tunggu 1 Jam Dulu Untuk Mereport orang yang sama`)
        .setTitle('Maaf Kamu ga bisa')
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
        .setTimestamp()
        .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')

    if (command === "settopic") {
        const topic = args.join(" ");
        const sucst = new D.MessageEmbed()
            .setDescription(`Sucsess :white_check_mark:. you just made this channel topic to \`${topic}\``)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)

        if (Sadmin || host) {
            msg.channel.send(sucst)
            msg.channel.setTopic(topic)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }


    } else if (command === "delch") {
        const mentionedChannel = msg.mentions.channels.first() || msg.channel

        if (Sadmin || host) {
            mentionedChannel.delete()
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }

    } else if (command === "setcat") {
        const idc = args[0]

        const suc = new D.MessageEmbed()
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
            .setDescription(`Sucsess :white_check_mark:. you just made this channel category to  \`${idc}\``)
            .addField('Gagal ??', `Coba Buka  ${prefix}setcat help `)

        const fail = new D.MessageEmbed()
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
            .setDescription(`Failed \`${idc}\` Bukan Sebuah ID`)
            .addField('\u200B', '\u200B')
            .addField('Masukan id', '\u200B')
            .addField('Cara Mengambil id', '\u200B')
            .addField('Menyalakan DevMode', "Buka Setting Lalu Nyalakan Developer Mode")
            .addField('Copy Id', "Klik kanan catergory lalu copy id")

        const id = new D.MessageEmbed()
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
            .addField('Contoh Command', `${prefix}setcat (ID CATEGORYNYA)`)
            .addField('Cara Mengambil id', '\u200B')
            .addField('Menyalakan DevMode', "Buka Setting Lalu Nyalakan Developer Mode")
            .addField('Copy Id', "Klik kanan catergory lalu copy id")

        if (Sadmin || host) {
            if (args[0].toLowerCase() == "help") {
                msg.channel.send(id)
            } else if (isNaN(idc) == true) {
                msg.channel.send(fail);
            } else if (!args[0]) {
                msg.channel.send(id)
            } else {
                msg.channel.setParent(idc).then(msg.channel.send(suc))
            }
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }


    } else if (command === "delmsg") {
        const much = Number(args[0])
        if (isNaN(much)) return msg.channel.send("not a number")
        const suc = new D.MessageEmbed()
            .setDescription(`Okay \`${much}\` Msg will be deleted`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)


        if (Sadmin || host) {
            msg.channel.send(suc)
            msg.channel.bulkDelete(much, true)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }

    } else if (command == "host") {
        const host = new D.MessageEmbed()
            .setTitle(`Nama-Nama Host Cleansound Studio`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .addField(` Wibu Lokal `, 'Admin Yami Dan Admin Asura')
            .addField(` Berita Gamer `, 'Clarus Miskin')
            .addField(` Jepang aneh `, 'Sasakya')
            .addField(` Belajar Bersama `, 'Dokter Qwerty')
            .addField(` Bacotan Gamers `, 'Last Wolf')
            .addField(` The Boss `, 'Indogegewepe')
            .setColor(color)
            .setTimestamp()
            .setFooter('Cleansound Host', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');

        if (cooldownhost.has(msg.author.id)) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cd).then(cd => cd.delete({
                timeout: 5000
            }))
        } else {
            msg.channel.send(host)
            cooldownhost.add(msg.author.id)
            setTimeout(() => {
                cooldownhost.delete(msg.author.id)
            }, 60000);
        }
    } else if (command == "poll") {
        if (!args[0]) return msg.channel.send('Poll apa yang kamu akan berikan');
        let pollq = args.join(" ")
        let whoask = msg.author.username

        var poll = new D.MessageEmbed()
            .setTitle('New Poll')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .addField(`${whoask} Baru Saja Membuat Pollin question baru`, `${pollq}`)
            .addField(` 👍 `, 'Untuk Setuju')
            .addField(` 👎 `, 'Untuk Tidak Setuju')
            .setTimestamp()
            .setFooter('Bukan Poll', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');



        if (Sadmin || host) {
            const agree = "👍"
            const disagree = "👍"
            var send = await msg.channel.send(poll)
            await send.react(agree)
            await send.react(disagree)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }
    } else if (command == "saran") {
        if (!args[0]) return msg.channel.send(`Lakukan : ${prefix}saran (tentang apa) (sarannya apa)`);
        let args0 = args[0]
        // let argsjoin = args.join(" ")
        let argsjoin = args.slice(1).join(" ")

        const saran = new D.MessageEmbed()
            .setTitle('Saran Baru')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setDescription(`${msg.author.username} Baru Saja Menyarankan Sesuatu`)
            .addField(`Tentang`, `${args0}`)
            .addField(`Sarannya`, `${argsjoin}`)
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');


        const saranm = new D.MessageEmbed()
            .setTitle('Saran Baru')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setDescription(`${msg.author.username} Baru Saja Menyarankan Sesuatu`)
            .addField(`Tentang`, `${args0}`)
            .addField(`Sarannya`, `${argsjoin}`)
            .addField('Terimakasih sudah Menyarankan', 'Saran tersebut sudah di kirim ke channel khusus admin')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');

        if (cooldownsaran.has(msg.author.id)) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cd).then(cd => cd.delete({
                timeout: 5000
            }))
        } else {
            msg.channel.send(saranm)
            const adminsaran = config.saranchanneladmin
            adminsaran.send(saran)
            cooldownsaran.add(msg.author.id)
            setTimeout(() => {
                cooldownsaran.delete(msg.author.id)
            }, 60000);
        }

    } else if (command == "laporkan" || command == "lapor") {
        if (!args[0]) return msg.channel.send(`Lakukan : ${prefix}laporkan (Tersangka) (di mana) (Kenapa) (jika bisa di beri screenshot untuk bukti)`);
        let args0 = args[0]
        let args1 = args[1]
        let argsjoin = args.join(" ")

        const pic = msg.attachments.first()
        let lapor = client.channels.cache.get(config.channellaporan)

        if (cooldownlapor.has(args[0])) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cdlapor).then(cdlapor => cdlapor.delete({
                timeout: 5000
            }))
        } else {
            if (!pic) {
                const saran = new D.MessageEmbed()
                    .setTitle('Laporan Baru ')
                    .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
                    .setDescription(`${msg.author.username} Baru Saja Melaporkan Sesuatu`)
                    .addField(`Tersangka`, `${args0}`)
                    .addField(`TKP`, `${args1}`)
                    .addField('Kenapa', `${argsjoin}`)
                    .setTimestamp()
                    .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');
                lapor.send(saran)
                msg.channel.send(saran)
            } else {
                const picpic = pic.url
                const saran = new D.MessageEmbed()
                    .setTitle('Laporan Baru ')
                    .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
                    .setDescription(`${msg.author.username} Baru Saja Melaporkan Sesuatu`)
                    .addField(`Tersangka`, `${args0}`)
                    .addField(`TKP`, `${args1}`)
                    .addField('Kenapa', `${argsjoin}`)
                    .addField('Bukti', '\u200B')
                    .setImage(picpic)
                    .setTimestamp()
                    .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');
                lapor.send(saran)
                msg.channel.send(saran)
            };
            cooldownlapor.add(args[0])
            setTimeout(() => {
                cooldownlapor.delete(args[0])
            }, );
        }

    } else if (command == "tunagrahita" || command == "tuna" || command == "tunakan") {
        const Mentuser = msg.mentions.users.first()
        if (!args[0] && Mentuser == undefined) return msg.channel.send(`Lakukan : ${prefix}${command} (target)`);

        const tuna = new D.MessageEmbed()
            .setTitle('Tunagrahita')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setDescription(`${Mentuser} Baru Saja Terkena Tunagrahita`)
            .addField(`Silahkan Minta Maaf `, `Minta Maaf Di Tempat Pertaubatan, Agar Host bisa melihat perminta maafan kalian dan mungkin di maafkan`)
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');


        //   const Sadmin = msg.member.roles.cache.get(config.superadmin)
        if (Sadmin || host) {
            if (!msg.mentions.members.first().roles.cache.get(config.roletuna)) {
                msg.mentions.members.first().roles.add(config.roletuna)
            }
            if (msg.mentions.members.first().roles.cache.get(config.indogamers)) {
                msg.mentions.members.first().roles.remove(config.indogamers)
            }
            msg.channel.send(tuna)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }

    } else if (command == "peringatan" || command == "ingatkan") {
        const Mentuser = msg.mentions.users.first()
        if (!args[0] && Mentuser == undefined) return msg.channel.send(`Lakukan : ${prefix}peringatan (target)`);


        const tuna = new D.MessageEmbed()
            .setTitle('Peringatan')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setDescription(`${Mentuser} Baru Saja Di ingatkan`)
            .addField(`Silahkan Merengui apa yang anda lakukan dan tidak melakukannya lagi`, `Atau Nanti anda dapat dikenakan tunagrahita`)
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');

        if (Sadmin || host) {
            msg.channel.send(tuna)
            if (!msg.mentions.members.first().roles.cache.get(config.roleperingatan)) {
                msg.mentions.members.first().roles.add(config.roleperingatan)
            }
            if (msg.mentions.members.first().roles.cache.get(config.indogamers)) {
                msg.mentions.members.first().roles.remove(config.indogamers)
            }
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))

        }
    } else if (command == "maafkan") {
        const Mentuser = msg.mentions.users.first()

        if (!args[0] && Mentuser == undefined) return msg.channel.send(`Lakukan : ${prefix}maafkan (target)`);

        const tuna = new D.MessageEmbed()
            .setTitle('Di maafkan')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setDescription(`${Mentuser} Baru Saja Di Maafkan`)
            .addField(`${Mentuser.username} Kamu Telah Dimaaafkan`, `Role tunagrahita sudah di hapus dan jangan ulangi itu lagi :D`)
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');

        if (Sadmin || host) {
            if (msg.mentions.members.first().roles.cache.get(config.roletuna)) {
                msg.mentions.members.first().roles.remove(config.roletuna)
            }
            if (msg.mentions.members.first().roles.cache.get(config.roleperingatan)) {
                msg.mentions.members.first().roles.remove(config.roleperingatan)
            }
            if (!msg.mentions.members.first().roles.cache.get(config.indogamers)) {
                msg.mentions.members.first().roles.add(config.indogamers)
            }
            msg.channel.send(tuna)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }


    } else if (command == "about") {
        const about = new D.MessageEmbed()
            .setTitle('About')
            .setDescription('Welcome To Discord CLEANSOUND STUDIO di mana kalian para Indogamers berkumpul, sharing, dan nanya-nanya langsung ke para Host Cleansound.')
            .addField('Channel Youtube', "www.youtube.com/c/TheCleansound/")
            .addField('Channel Youtube Khusus Livestream', "https://www.youtube.com/channel/UCpW1kx1PiPunfRnA4lCXKVA")
            // .addField('Discord Channel',"https://discord.gg/h5Q9R82")
            .addField('Instagram', "https://www.instagram.com/cleansoundstudio/?hl=id")
            .addField('Facebook', 'https://web.facebook.com/cleansoundstudio/?_rdc=1&_rdr')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');
        msg.channel.send(about)
    } else if (command == "help") {
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



        if (cooldownhelp.has(msg.author.id)) {
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

            cooldownhelp.add(msg.author.id)
            setTimeout(() => {
                cooldownhelp.delete(msg.author.id)
            }, 60000);
        }

    } else if (command == "peluk") {

        const Mentuser = msg.mentions.users.first()
        if (!args[0]) return msg.channel.send('Kamu Harus memeluk seseorang :D');
        let args0 = args.join(" ")

        if (!Mentuser) {
            var suc = new D.MessageEmbed()
                .setDescription(`**${args.join(" ")}** Telah Dipeluk ${msg.author.username}`)
                .setTitle('Ada yang pelukan')
                .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
                .setTimestamp()
                .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');
        } else {
            var suc = new D.MessageEmbed()
                .setDescription(`${Mentuser} Telah Dipeluk ${msg.author.username}`)
                .setTitle('Ada yang pelukan')
                .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
                .setTimestamp()
                .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');
        }
        const cd = new D.MessageEmbed()
            .setDescription(`${msg.author.username} Kamu Harus Tunggu 1 Menit Dulu`)
            .setTitle('Maaf Kamu ga bisa')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');


        if (cooldown.has(msg.author.id)) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cd).then(cd => cd.delete({
                timeout: 5000
            }))
        } else {
            msg.channel.send(suc)

            cooldown.add(msg.author.id)
            setTimeout(() => {
                cooldown.delete(msg.author.id)
            }, 60000);
        }

    } else if (command == "koin" || command == "coin" || command == "coinflip") {
        function doRandHT() {
            var rand = ['500', 'Garuda'];

            return rand[Math.floor(Math.random() * rand.length)];
        }

        function doRandHT1() {
            var rand = ['1000', 'angklung'];

            return rand[Math.floor(Math.random() * rand.length)];
        }
        const coin = new D.MessageEmbed()
            .setDescription(doRandHT())
            .setTitle('Coinflip')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')


        const coin1 = new D.MessageEmbed()
            .setDescription(doRandHT1())
            .setTitle('Coinflip')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')

        const help = new D.MessageEmbed()
            .setTitle('Coinflip Help')
            .addField('500an (garuda,500)', `${prefix}koin 500/500an/limaratus/limaratusan`)
            .addField('1000an(agklung,1000)', `${prefix}koin 1000/1000an/seribu/seribuan`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')

        const cd = new D.MessageEmbed()
            .setDescription(`${msg.author.username} Kamu Harus Tunggu 1 Menit Dulu`)
            .setTitle('Maaf Kamu ga bisa')
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')


        if (cooldowncf.has(msg.author.id)) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cd).then(cd => cd.delete({
                timeout: 5000
            }))
        } else {
            if (!args[0]) {
                msg.channel.send(help)
            } else if (args[0].toLowerCase() == "500" || args[0].toLowerCase() == "500an" || args[0].toLowerCase() == "limaratus" || args[0].toLowerCase() == "limaratusan") {
                msg.channel.send(coin)
            } else if (args[0].toLowerCase() == "1000" || args[0].toLowerCase() == "1000an" || args[0].toLowerCase() == "seribu" || args[0].toLowerCase() == "seribuan") {
                msg.channel.send(coin1)
            }

            cooldowncf.add(msg.author.id)
            setTimeout(() => {
                cooldowncf.delete(msg.author.id)
            }, 60000);
        }

    } else if (command == "throw" || command == "lempar") {
        function lempar() {
            var rand = ['**ejekan**', '**Alpukat Mentega**', '**Pohon Durian**', '**Baling Baling Bambu**', '**Galaksi Bima Sakti**', '**Kekosongan**', '**kursi gaming**', '**Penganut Bumi Datar**', '**https://youtu.be/dQw4w9WgXcQ**', '**H2o**', '**glukosa**', '**All Might**', '**Mami Chan**', '**Megumin**', '**Emilia**', '**Mobil**', '**Titanic**', '**CC206**', '**CC201**', '**Rumah**', '**Kereta**', '**Bandara**', '**Stasiun**', '**Boeing 737**', '**batu**', '**tanah**', '**pesawat**', '**gedung**', '**Stadium Gelora Bung karno**', '**Lampu**', '**Kunci Kehidupan**', '**Cinta**', '**Kekesalan**', '**Corona**'];

            return rand[Math.floor(Math.random() * rand.length)];
        }

        const embed = new D.MessageEmbed()
            .setTitle("Lempar :D")
            .addField(`${msg.author.username} Melempar ` + lempar(), `Ke "**${args.join(" ")}**"`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256');



        if (cooldownt.has(msg.author.id)) {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(cd).then(cd => cd.delete({
                timeout: 5000
            }))
        } else {
            msg.channel.send(embed)
            cooldownt.add(msg.author.id)
            setTimeout(() => {
                cooldownt.delete(msg.author.id)
            }, 60000);
        }

    } else if (command == "restart") {
        const suc = new D.MessageEmbed()
            .setDescription(`EMERGENCY SHUTDOWN TELAH DI AKTIFKAN OLEH **"${msg.author.username}"**`)
            .addField('MEMATIKAN BOT', `3,2,1 **${client.user.tag}** Telah Shutdown`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)

        if (Sadmin || host) {
            msg.channel.send(suc)
            setTimeout(() => {
                process.exit()
            }, 3000);
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }
    } else if (command == "addrole") {
        const role = msg.mentions.roles.first()
        const ppl = msg.mentions.members.first()
        const suc = new D.MessageEmbed()
            .setDescription(`${ppl} Kamu Telah Di tambahkan role ${role}`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
        if (Sadmin || host) {
            msg.channel.send(suc)
            ppl.roles.add(role)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }
    } else if (command == "delrole") {
        const role = msg.mentions.roles.first()
        const ppl = msg.mentions.members.first()
        const suc = new D.MessageEmbed()
            .setDescription(`${ppl} Kamu Telah Di Kurangkan role ${role}`)
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
        if (Sadmin || host) {
            msg.channel.send(suc)
            ppl.roles.remove(role)
        } else {
            msg.delete({
                timeout: 5000
            })
            msg.channel.send(hostmsg).then(hostmsg => hostmsg.delete({
                timeout: 5000
            }))
        }
    } else if (command == "whohadroleof") {
        const had = msg.guild.roles.cache.get(args[0]).members.map(m => m.user.tag).join('\n');
        // const embed = new RichEmbed()
        // .setDescription(allTrusteds);      
        // msg.say(embed)
        console.log(had)
    } else if (command == "botruntime") {
        const con = msconv.ms(client.uptime, "ms")
        let sec = con.seconds
        let min = con.minutes
        let hour = con.hours
        let ms = con.milis
        const embed = new D.MessageEmbed()
            .setAuthor('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setTitle("Bot Runtime")
            .addField(`${ms}`, `MSs`)
            .addField(`${sec}`, `Secs`)
            .addField(`${min}`, `Mins`)
            .addField(`${hour}`, `Hours`)
            .addField(`${client.uptime} (ms)`, `Total Uptime`)
            .setTimestamp()
            .setFooter('Bukan Cleansound', 'https://cdn.discordapp.com/icons/801839309073678346/99b51796e8c2da53a4813873408a4fb2.webp?size=256')
            .setColor(color)
        msg.channel.send(embed)
    }
})


client.login(token)