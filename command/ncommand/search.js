const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();
const nhconfig = require("./nhconfig.json")
const NanaEmbeds = require("./lib/NanaEmbeds");
const NanaUtils = require("./lib/NanaUtils");
const { MessageEmbed } = require("discord.js");

const TYPE = {
  j: "jpg",
  p: "png",
  g: "gif"
};

function getRandInt(int) {
  return Math.floor(Math.random() * int);
}
function getById(id) {
  return api.g(id.toString()).then(res => res);
}
async function download(res, type,msg) {
  let nhentURL = `https://mangadl.herokuapp.com/download/nhentai/${res.id}/${type}`;
  const embed = new MessageEmbed()
    .setTitle(res.title.pretty)
    .setURL(encodeURI(nhentURL.trim()))
    .setThumbnail(getInfo(res).cover)
    .setColor(nhconfig.COLOR)
    .setTimestamp()
    .setDescription(
      `To start download, click the doujin title above.\n\nFeel free to join [my server](https://discord.gg/X3yeKgN)`
    );
  return msg.channel.send(embed);
}
function getInfo(res) {
  let json = {};

  json.title = res.title.pretty;
  json.link = `https://nhentai.net/g/${res.id}`;
  json.id = res.id;
  json.tag = res.tags
    .filter(x => x.type == "tag")
    .map(x => NanaUtils.toPlural(x.name));
  json.category = res.tags
    .filter(x => x.type == "category")
    .map(x => NanaUtils.toPlural(x.name));
  json.artist = res.tags
    .filter(x => x.type == "artist")
    .map(x => NanaUtils.toPlural(x.name));
  json.parody = res.tags
    .filter(x => x.type == "parody")
    .map(x => NanaUtils.toPlural(x.name));
  json.character = res.tags
    .filter(x => x.type == "character")
    .map(x => NanaUtils.toPlural(x.name));
  json.cover = `https://i.nhentai.net/galleries/${res.media_id}/1.${
    TYPE[res.images.cover.t]
  }`;

  let lang = res.tags.filter(x => x.type == "language").map(x => x.name);
  if (lang[0] == "translated") {
    json.lang = NanaUtils.toPlural(lang[1]);
  } else {
    json.lang = NanaUtils.toPlural(lang[0]);
  }

  return json;
}
async function getInfoEmbed(client,id, msg) {
  const embed = new MessageEmbed();
  let res = await getById(id);
  let info = getInfo(res);

  // console.log(info);
  embed.setAuthor("nHentai random generator", "https://cdn.discordapp.com/attachments/466964106692395008/580378765419347968/icon_nhentai.png");
  embed.setColor(nhconfig.COLOR);
  // embed.setThumbnail(thumb);
  embed.setTitle(`${res.title.pretty}`);
  embed.setDescription(
    `Made by: **${info.artist[0] ? info.artist.join(", ") : info.artist}**`
  );
  embed.setURL(`https://nhentai.net/g/${res.id}`);
  embed.setImage(info.cover);
  embed.setFooter(`React with 📖 to continue reading / ${res.id}`);
  embed.addField("Language", info.lang, true);
  if (info.parody[0])
    embed.addField(
      "Parody",
      info.parody[0] ? info.parody.join(", ") : info.parody,
      true
    );
  if (info.character[0])
    embed.addField(
      "Characters",
      info.character[0] ? info.character.join(", ") : info.character,
      true
    );
  if (info.category[0]) embed.addField("Categories", info.category, true);
  embed.addField("Pages", res.num_pages, true);
  if (info.tag[0])
    embed.addField("Tags", info.tag[0] ? info.tag.join(", ") : info.tag);
  let m = await msg.channel.send(embed);
  getEmoji(client,id, m, msg);
}

async function getEmoji(client,id, m, msg) {
    let res = await getById(id);
    let info = getInfo(res);
    let pagination = 1;
    let doujin = [];
    let nick =
      msg.member.nickname !== null
        ? `${msg.member.nickname}`
        : msg.author.username;

    res.images.pages.forEach((page, i) => {
      doujin.push(
        `https://i.nhentai.net/galleries/${res.media_id}/${i + 1}.${
          TYPE[page.t]
        }`
      );
    });

    await m.react("📖");
    await m.react("💾");
    await m.react("♻");

    const deleteFilter = (reaction, user) =>
      reaction.emoji.name === `♻` && user.id === msg.author.id;
    const forwardsFilter = (reaction, user) =>
      reaction.emoji.name === `📖` && user.id === msg.author.id;
    const downloadFilter = (reaction, user) =>
      reaction.emoji.name === `💾` && user.id !== client.user.id;

    const deletes = m.createReactionCollector(deleteFilter);
    const forwards = m.createReactionCollector(forwardsFilter);
    const download = m.createReactionCollector(downloadFilter);

    forwards.on("collect", async f => {
      m.delete();

      // read embed
      const read = new MessageEmbed();
      read.setAuthor("nHentai read", "https://cdn.discordapp.com/attachments/466964106692395008/580378765419347968/icon_nhentai.png");
      read.setColor(nhconfig.COLOR);
      read.setTitle(`${res.title.pretty}`);
      read.setDescription(
        `Made by: **${info.artist[0] ? info.artist.join(", ") : info.artist}**`
      );
      read.setURL(`https://nhentai.net/g/${res.id}`);
      read.setImage(doujin[pagination - 1]);
      read.setFooter(`Page ${pagination} of ${doujin.length} / ${res.id}`);
      let r = await msg.channel.send(read);
      return getRead(res, read, r, msg, pagination);
    });

    deletes.on("collect", d => {
      return m.delete();
    });

    download.on("collect", async d => {
      download(res, "zip",msg);
    });


  }
  async function getRead(res, read, r, msg, pagination) {
    let images = [];
    res.images.pages.forEach((page, i) => {
      images.push(
        `https://i.nhentai.net/galleries/${res.media_id}/${i + 1}.${
          TYPE[page.t]
        }`
      );
    });

    await r.react("⏪");
    await r.react("⬅");
    await r.react("➡");
    await r.react("⏩");
    await r.react("♻");

    const backwardsTenFilter = (reaction, user) =>
      reaction.emoji.name === `⏪` && user.id === msg.author.id;
    const backwardsFilter = (reaction, user) =>
      reaction.emoji.name === `⬅` && user.id === msg.author.id;
    const deleteFilter = (reaction, user) =>
      reaction.emoji.name === `♻` && user.id === msg.author.id;
    const forwardsFilter = (reaction, user) =>
      reaction.emoji.name === `➡` && user.id === msg.author.id;
    const forwardsTenFilter = (reaction, user) =>
      reaction.emoji.name === `⏩` && user.id === msg.author.id;
    const backwardsTen = r.createReactionCollector(backwardsTenFilter);
    const backwards = r.createReactionCollector(backwardsFilter);
    const deletes = r.createReactionCollector(deleteFilter);
    const forwards = r.createReactionCollector(forwardsFilter);
    const forwardsTen = r.createReactionCollector(forwardsTenFilter);

    backwardsTen.on("collect", bt => {
      if (pagination <= 5) return;
      pagination -= 5;
      read.setImage(images[pagination - 1]);
      read.setFooter(`Page ${pagination} of ${images.length} / ${res.id}`);
      r.edit(read);
    });

    backwards.on("collect", b => {
      if (pagination == 1) return;
      pagination--;
      read.setImage(images[pagination - 1]);
      read.setFooter(`Page ${pagination} of ${images.length} / ${res.id}`);
      r.edit(read);
    });

    forwards.on("collect", f => {
      if (pagination == images.length) return;
      pagination++;
      read.setImage(images[pagination - 1]);
      read.setFooter(`Page ${pagination} of ${images.length} / ${res.id}`);
      r.edit(read);
    });

    forwardsTen.on("collect", ft => {
      if (pagination + 5 >= images.length) return;
      pagination += 5;
      read.setImage(images[pagination - 1]);
      read.setFooter(`Page ${pagination} of ${images.length} / ${res.id}`);
      r.edit(read);
    });

    deletes.on("collect", d => {
      r.delete();
    });
  }
exports.execute = async (msg, command, args, client, D, perm, color) => {
  if (!msg.channel.nsfw)
    return msg.channel
      .send(`NSFW channel please.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  if (!args[0])
    return msg.channel
      .send(
        `the command you are using is incorrect\nExample: \`${config.prefix}nh search <Query> [language]\``
      )
      .then(msg => msg.delete({ timeout: 10000 }));
  let nick =
    msg.member.nickname !== null
      ? `${msg.member.nickname}`
      : msg.author.username;

  let input = args.join(" ").match(/\w+|('|")([^"]|[^'])+('|")/g);
  let search = input[0].replace(/["']/g, "").toLowerCase();
  let patt = /^\d+$/;
  if (patt.test(search))
    return msg.channel.send(
      `You can use \`nh read ${search}\` to search with ID`
    );

  let lang = input[1];
  if (!lang) lang = "english";
  if (lang == "ch") {
    lang = "chinese";
  } else if (lang == "en") {
    lang = "english";
  } else if (lang == "jp") {
    lang = "japanese";
  }
  if (!nhconfig.LANG.includes(lang.toLowerCase()))
    return msg.channel
      .send("Available langauge is `English`, `Japanese` & `Chinese`")
      .then(msg => msg.delete({ timeout: 5000 }));

  let numPages = await api.search(search);
  // console.log(numPages);
  if (!numPages.results || numPages.results.length == 0)
    return msg.channel.send(`No doujin found with query \`${search}\``);
  
  // if total pages is only one, no need to use api again
  if (numPages.num_pages == 1) {
    let query = numPages.results.filter(x => x.language == lang.toLowerCase());
    if (query.length == 0)
      return msg.channel
        .send(
          `No book found with language **${lang}**, please try using another language!`
        )
        .then(msg => msg.delete({ timeout: 6000 }));
    
    let rand = getRandInt(query.length);
    await getInfoEmbed(client,query[rand].id, msg);
    return;
  }
  try {
    let id = await api.search(
      search,
      getRandInt(numPages.num_pages)
    );
    let langs = id.results.map(x => x.language == lang.toLowerCase() && x.id);
    if (langs.every((val, i, arr) => val === arr[0]))
      return msg.channel
        .send(`No book found with language **${lang}**, please try again or try using another language`)
        .then(msg => msg.delete({ timeout: 6000 }));
    
    let query = id.results.find(x => x.language == lang.toLowerCase()).id;
    await getInfoEmbed(client,query, msg);
  } catch (err) {
    console.log(err.message);
  }
};