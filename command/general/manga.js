const apiurl = require("../../ext_module/url")
const fetch = require("node-fetch");
const {
    BaseGuildEmojiManager
} = require("discord.js");

exports.execute = async function (msg, command, args, client, D, perm, color) {
    if (!args[0] || args[0].toLowerCase() === "home") {
        home(msg, command, args, client, D, perm, color)
    } else if (args[0].toLowerCase() === "ping") {
        const message = await msg.channel.send("Pinging...");
        const d1 = Date.now();
        await fetch(apiurl.baseurls.mangadex.ping)
        message.edit(`\`MangaDex API:  ${(Date.now() - d1)} ms\``);
    }

}

// 
// Home
// 

async function home(msg, command, args, client, D, perm, color) {
    const manga = []
    const response = await fetch(apiurl.baseurls.mangadex.manga)
    const res = await response.json()
    res.results.forEach(m => {
        title = gettitles(m.data)[0].title
        id = m.data.id
        originalLanguage = m.data.attributes.originalLanguage
        status = m.data.attributes.status
        genre = getgenre(m.data.attributes.tags)
        lastChapter = m.data.attributes.lastChapter
        contentRating = m.data.attributes.contentRating
        links = decryptlinks(m.data.attributes.links)
        manga.push({
            title,
            id,
            originalLanguage,
            status,
            genre,
            contentRating,
            lastChapter,
            links,
        })
    });

    let index = 0
    let embed = new D.MessageEmbed()
        .setAuthor("MangaDex Homepage", msg.guild.iconURL({dynamic:true}))
        .setTimestamp()
    if (manga[index].title) {
        let title = `${manga[index].title}`
        if (manga[index].lastChapter) {
            title = `${manga[index].title} - ${manga[index].lastChapter}`
            if (manga[index].status) {
                title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status})`
                if (manga[index].originalLanguage) {
                    title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status}) [${manga[index].originalLanguage}]`
                }
            }
        }
        embed.setTitle(title)
    }
    if (manga[index].genre && manga[index].genre.length !== 0) {
        let genre = `${manga[index].genre.join(",")}`
        if (manga[index].contentRating) {
            let rating = "SFW"
            if (manga[index].contentRating !== "safe") {
                rating = "NSFW"
            }
            genre = `${manga[index].genre.join(",")} (${rating})`
        }
        embed.addField("About Manga", genre)
    }
    if (manga[index].contentRating && manga[index].genre.length === 0) {
        let genre
        let rating = "SFW (Safe For Work)"
        if (manga[index].contentRating !== "safe") {
            rating = "NSFW (Not Safe For Work)"
        }
        genre = `${rating}`
        embed.addField("About Manga", genre)
    }
    if (manga[index].links) {
        embed.addField("Related Links", linkhyperlink(manga[index].links))
    }
    if(manga[index].id){
        let cover = await getcover(manga[index].id)
        embed.setImage(cover)
    }
    embed.setFooter(`${index+1} / ${manga.length}`, msg.guild.iconURL({dynamic:true}))
        .setColor(color);
    const embedsend = await msg.channel.send(embed)
    await embedsend.react("🗑️")
    await embedsend.react("⬅");
    await embedsend.react("➡");
    await embedsend.react("📚");

    const deleteFilter = (reaction, user) =>
        reaction.emoji.name === `🗑️` && user.id === msg.author.id;

    const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === `⬅` && user.id === msg.author.id;

    const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === `➡` && user.id === msg.author.id;

    const readFilter = (reaction, user) =>
        reaction.emoji.name === `📚` && user.id === msg.author.id;

    const backwards = embedsend.createReactionCollector(backwardsFilter);
    const deletes = embedsend.createReactionCollector(deleteFilter);
    const forwards = embedsend.createReactionCollector(forwardsFilter);
    const read = embedsend.createReactionCollector(readFilter);

    deletes.on("collect", async f => {
        embedsend.delete();
    })

    read.on("collect", async f => {

    })

    forwards.on("collect", async f => {
        if (index + 1 <= manga.length) {
            index += 1
        }
        embed = new D.MessageEmbed()
            .setAuthor("MangaDex Homepage", msg.guild.iconURL({dynamic:true}))
            .setTimestamp()
        if (manga[index].title) {
            let title = `${manga[index].title}`
            if (manga[index].lastChapter) {
                title = `${manga[index].title} - ${manga[index].lastChapter}`
                if (manga[index].status) {
                    title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status})`
                    if (manga[index].originalLanguage) {
                        title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status}) [${manga[index].originalLanguage}]`
                    }
                }
            }
            embed.setTitle(title)
        }
        if (manga[index].genre && manga[index].genre.length !== 0) {
            let genre = `${manga[index].genre.join(",")}`
            if (manga[index].contentRating) {
                let rating = "SFW"
                if (manga[index].contentRating !== "safe") {
                    rating = "NSFW"
                }
                genre = `${manga[index].genre.join(",")} (${rating})`
            }
            embed.addField("About Manga", genre)
        }
        if (manga[index].contentRating && manga[index].genre.length === 0) {
            let genre
            let rating = "SFW (Safe For Work)"
            if (manga[index].contentRating !== "safe") {
                rating = "NSFW (Not Safe For Work)"
            }
            genre = `${rating}`
            embed.addField("About Manga", genre)
        }
        if (manga[index].links) {
            embed.addField("Related Links", linkhyperlink(manga[index].links))
        }
        if(manga[index].id){
            let cover = await getcover(manga[index].id)
            embed.setImage(cover)
        }
        embed.setFooter(`${index+1} / ${manga.length}`, msg.guild.iconURL({dynamic:true}))
            .setColor(color);
        embedsend.edit(embed)
    })

    backwards.on("collect", async f => {
        if (index >= 1) {
            index -= 1
        }
        embed = new D.MessageEmbed()
            .setAuthor("MangaDex Homepage", msg.guild.iconURL({dynamic:true}))
            .setTimestamp()
        if (manga[index].title) {
            let title = `${manga[index].title}`
            if (manga[index].lastChapter) {
                title = `${manga[index].title} - ${manga[index].lastChapter}`
                if (manga[index].status) {
                    title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status})`
                    if (manga[index].originalLanguage) {
                        title = `${manga[index].title} - ${manga[index].lastChapter} (${manga[index].status}) [${manga[index].originalLanguage}]`
                    }
                }
            }
            embed.setTitle(title)
        }
        if (manga[index].genre && manga[index].genre.length !== 0) {
            let genre = `${manga[index].genre.join(",")}`
            if (manga[index].contentRating) {
                let rating = "SFW"
                if (manga[index].contentRating !== "safe") {
                    rating = "NSFW"
                }
                genre = `${manga[index].genre.join(",")} (${rating})`
            }
            embed.addField("About Manga", genre)
        }
        if (manga[index].contentRating && manga[index].genre.length === 0) {
            let genre
            let rating = "SFW (Safe For Work)"
            if (manga[index].contentRating !== "safe") {
                rating = "NSFW (Not Safe For Work)"
            }
            genre = `${rating}`
            embed.addField("About Manga", genre)
        }
        if (manga[index].links) {
            embed.addField("Related Links", linkhyperlink(manga[index].links))
        }
        if(manga[index].id){
            let cover = await getcover(manga[index].id)
            embed.setImage(cover)
        }
        embed.setFooter(`${index+1} / ${manga.length}`, msg.guild.iconURL({dynamic:true}))
            .setColor(color);
        embedsend.edit(embed)
    })
}

function gettitles(dataobj) {
    let titles = []
    for (const key of Object.keys(dataobj.attributes.title)) {
        titles.push({
            lang: key,
            title: dataobj.attributes.title[key]
        })
    }
    return titles
}
async function getcover(mangaid) {
    const res = await fetch(apiurl.baseurls.mangadex.GetMangaByID + mangaid)

    const mangaobj = await res.json()

    const cid = getcoverid(mangaobj.relationships)

    const coverres = await fetch(apiurl.baseurls.mangadex.GetCoverByID + cid)

    const coverobj = await coverres.json()

    return `${apiurl.baseurls.mangadex.cover}${mangaid}/${coverobj.data.attributes.fileName}`

}
function getcoverid(relation) {
    let id = false
    relation.forEach(r => {
        if (r.type === "cover_art") {
            id = r.id
        }
    });
    return id
}



function getgenre(arroftags) {
    const genre = []
    arroftags.forEach(tag => {
        if (!tag) return
        if (tag.type !== "tag") return
        for (const key of Object.keys(tag.attributes.name)) {
            genre.push(tag.attributes.name[key])
        }
    })
    return genre
}

function decryptlinks(linkobj) {
    if (!linkobj) return null
    let links = []
    for (const key of Object.keys(linkobj)) {
        let baseurl = ''
        let type = ''
        if (key === "al") {
            baseurl = "https://anilist.co/manga/"
            type = "AniList"
        } else if (key === "ap") {
            baseurl = "https://www.anime-planet.com/manga/"
            type = "Anime-Planet"
        } else if (key === "bw") {
            baseurl = "https://bookwalker.jp/"
            type = "BookWalker"
        } else if (key === "mu") {
            baseurl = "https://www.mangaupdates.com/series.html?id="
            type = "MangaUpdates"
        } else if (key === "nu") {
            baseurl = "https://www.novelupdates.com/series/"
            type = "NovelUpdates"
        } else if (key === "kt") {
            if (!isNaN(linkobj[key])) {
                baseurl = "https://kitsu.io/api/edge/manga/"
            } else {
                baseurl = `https://kitsu.io/api/edge/manga?filter[slug]=`
            }
            type = "Kitsu"
        } else if (key === "mal") {
            baseurl = "https://myanimelist.net/manga/"
            type = "MyAnimeList"
        } else {
            type = "UNKNOWN"
        }
        links.push({
            url: `${baseurl}${linkobj[key]}`,
            type: type
        })
    }
    return links
}

function linkhyperlink(links) {
    const hypers = []
    links.forEach(link => {
        hypers.push(`[${link.type}](${link.url})`)
    })
    return hypers.join(" | ")
}