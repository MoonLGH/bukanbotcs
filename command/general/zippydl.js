const clacSize = (a, b) => {
    if (0 == a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}
const _colors = require('colors'),
    _fs = require('fs'),
    _$ = require('cheerio'),
    _url = require('url'),
    _https = require('https'),
    _axios = require('axios'),
    _math = require('mathjs');

async function GetLink(u) {
    console.log(`⏳ Get Page From : ${u}`)
    const zippy = await _axios({
        method: 'GET',
        url: u
    }).then(res => res.data).catch(err => false)
    console.log('✅ Done')
    const $ = _$.load(zippy)
    if (!$('#dlbutton').length) {
        return {
            error: true,
            message: $('#lrbox>div').first().text().trim()
        }
    }
    console.log('⏳ Fetch Link Download...')
    const url = _url.parse($('.flagen').attr('href'), true)
    const urlori = _url.parse(u)
    const key = url.query['key']
    let time;
    let dlurl;
    try {
        time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
        dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'
    } catch (error) {
        time = _math.evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
        dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
    }
    console.log('✅  ' + _colors.green('Done'))
    return {
        error: false,
        url: dlurl
    }
}

exports.execute = async function (msg, command, args, client, D, perm, color) {
    const url = await GetLink(args[0])

    if (url.error) {
        console.log(_colors.bgRed(_colors.white(' ' + url.message + ' ')))
        return null
    }
    const req = await _https.get(url.url)
    console.log('🎁  ' + _colors.yellow('Start Download From URL : ' + url.url))
    console.log('⏳  ' + _colors.yellow('Waiting Server Response...'));
    await req.on('response', res => {
        if (!res.headers['content-disposition']) {
            console.log('🔁  ' + _colors.blue('Server Download Error, Try To Get New Link...'))
            abc(u)
        } else {
            console.log('✅  ' + _colors.green('Server Response'))
            const size = parseInt(res.headers['content-length'], 10),
                filename = decodeURIComponent(res.headers['content-disposition'].match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/)[1])
            console.log('☕  ' + _colors.yellow('Start Downloading File : ' + filename))
            const file = _fs.createWriteStream(filename)
            res.pipe(file)

            res.on('data', c => {
            })
            res.on('end', _ => {
                console.log('✅  ' + _colors.green('Success Download File : ' + filename))
                file.close()
                send(filename, msg)
            })
            res.on('error', _ => {
                console.log('❎  ' + _colors.green('Error Download File : ' + filename))
                msg.channel.send("Error")
            })
        }
    })
}

async function send(file, msg) {
    const files = _fs.createReadStream("./" + file)
    msg.channel.send({
        content: "Download Success",
        files: [{
            attachment: files,
        }]
    })
}