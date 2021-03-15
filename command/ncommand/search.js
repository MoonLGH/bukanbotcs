const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();
const nhconfig = require("./nhconfig.json")
const NanaEmbeds = require("./lib/NanaEmbeds");
const NanaUtils = require("./lib/NanaUtils");
const { MessageEmbed } = require("discord.js");

function getRandInt(int) {
  return Math.floor(Math.random() * int);
}
async function getInfoEmbed(id, msg) {
  const embed = new MessageEmbed();
  let res = await this.getById(id);
  let info = this.getInfo(res);

  // console.log(info);
  embed.setAuthor("nHentai random generator", this.client.nHlogo);
  embed.setColor(this.client.config.COLOR);
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
  this.getEmoji(id, m, msg);
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
    await client.embeds.getInfoEmbed(query[rand].id, msg);
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
    await client.embeds.getInfoEmbed(query, msg);
  } catch (err) {
    console.log(err.message);
  }
};