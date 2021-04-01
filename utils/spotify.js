const ytdl = require('ytdl-core');
const options = require('../config');
const ffmpeg = require('fluent-ffmpeg');
/**
 * This function downloads the given youtube video in best audio format as mp3 file
 *
 * @param {*} youtubeLink link of youtube video
 * @param {*} output path/name of file to be downloaded(songname.mp3)
 * @param {*} spinner ora spinner to show download progress
 * @param {function} callback callback after work finishes
 */
const download = (youtubeLink, output, msg, callback) => {
    const download = ytdl(youtubeLink, options);

    ffmpeg(download)
        .audioBitrate(256)
        .save(`${output}`)
        .format('mp3')
        .on('end', () => {
            msg.channel.send('Download completed.');
            if (typeof callback === "function") callback();
        });
};

const spotify = require('./spotifyapi.js');

class Spotifye {
    async getTrack(url) {
        const ID = await this.getID(url);
        return this.extrTrack(ID);
    }
    async getAlbum(url) {
        const ID = await this.getID(url);
        return this.extrAlbum(ID);
    }
    async getPlaylist(url) {
        const ID = await this.getID(url);
        return this.extrPlaylist(ID);
    }

    async getID(url) {
        var token = await spotify.setup();
        spotify.setToken(token);
        var id;
        for (let i = 0; i < url.length; i++) {
            if (i > 10 && url[i] == '/') {
                for (let j = i; j < url.length; j++) {
                    if (url[j] == '/') {
                        id = url.slice(++j);
                    }
                }
            }
        }
        return id;
    }

    async extrTrack(trackId) {
        const trackData = await spotify.extractTrack(trackId);
        return trackData;
    }
    async extrPlaylist(playlistId) {
        const trackData = await spotify.extractPlaylist(playlistId);
        return trackData;
    }
    async extrAlbum(albumId) {
        const trackData = await spotify.extractAlbum(albumId);
        return trackData;
    }
}

async function song(msg,args) {
    songData = await spotifye.getTrack(args.join(" "));
    const songName = songData.name + ' ' + songData.artists[0];

    const output = `./${args.join(" ")}.mp3`;
    msg.channel.send(`Saving Song to: ${output}`);

    msg.channel.send(`Song: ${songData.name} - ${songData.artists[0]}`);

    const youtubeLink = await getLink(songName + (cli.flags.extraSearch ? (" " + cli.flags.extraSearch) : ''));

    await download(youtubeLink, output, msg, async function () {

    });
}

const { promisify } = require('util');
const youtubeSearch = require('yt-search');

const search = promisify(youtubeSearch);

function buildUrl(topResult) {
  return (topResult.url.includes('https://youtube.com')) ? topResult.url : 'https://youtube.com' + topResult.url;
}

/**
 * This function searches youtube for given songname and returns the link of topmost result
 *
 * @param {String} songName name of song
 * @returns {Promise<String>} youtube link of music video
 */
const getLink = async (songName) => {
  try {
    const result = await search(songName);
    
    const [topResult] = result.videos;

    const youtubeLink = buildUrl(topResult)

    return youtubeLink;
  } catch (_) {
    try {
      const result = await search(songName.replace('-', ' '))

      const [topResult] = result.videos

      const youtubeLink = buildUrl(topResult)

      return youtubeLink
    } catch (error) {
      return error;
    }
  }
};