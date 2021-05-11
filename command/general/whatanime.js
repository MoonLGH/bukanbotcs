const fetch = require("node-fetch")
exports.execute = async function (msg, command, args, client, D, perm, color) {
  const pic = msg.attachments.first()
  if(!pic){
    return msg.channel.send("Send A Pic As A Attachment")
  }
  const response = await fetch(
    `https://api.trace.moe/search?url=${encodeURIComponent(pic.url)}`
  ).catch((e) => {
    return msg.channel.send("Error")
  });
  if (!response) {
    return msg.channel.send("Error")
  }


  const searchResult = await response.json();
  const {
    anilist,
    similarity,
    filename,
    from,
    to,
    video
  } = searchResult.result[0];
  const {
    title: {
      chinese,
      english,
      native,
      romaji
    } = {},
    isAdult
  } = await getAnilistInfo(
    anilist
  );

  let text = "";
  text += [native, chinese, romaji, english]
    .filter((e) => e)
    .reduce(
      // deduplicate titles
      (acc, cur) =>
      acc.map((e) => e.toLowerCase()).includes(cur.toLowerCase()) ? acc : [...acc, cur],
      []
    )
    .map((t) => `\`${t}\``)
    .join("\n");
  text += "\n";
  text += `\`${filename.replace(/`/g, "``")}\`\n`;
    text += `\`${formatTime(from)}\`\n`;
    text += `\`${(similarity * 100).toFixed(1)}% similarity\`\n`;

    msg.channel.send(text, {
        files: [{
            attachment: video,
            name: filename.replace(/`/g, "``")+".mp4"
        }]
    })
}

const formatTime = (timeInSeconds) => {
    const sec_num = Number(timeInSeconds);
    const hours = Math.floor(sec_num / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((sec_num - hours * 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec_num - hours * 3600 - minutes * 60).toFixed(0).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};

const getAnilistInfo = (id) =>
  new Promise(async (resolve) => {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      body: JSON.stringify({
        query: `query($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            idMal
            title {
              native
              romaji
              english
            }
            synonyms
            isAdult
          }
        }
        `,
        variables: {
          id
        },
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.status >= 400) {
      console.error(1070, response.status, await response.text());
      return resolve({
        text: "`Anilist API error, please try again later.`"
      });
    }
    return resolve((await response.json()).data.Media);
  });