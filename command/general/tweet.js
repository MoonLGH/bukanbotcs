require("dotenv").config({
    path: '../../'
})
const Twitter = require("twitter");

const cd = new Set()
exports.execute = async function (msg, command, args, client, D, perm, color) {

    if (cd.has(msg.author.id)) {
        return msg.channel.send(`Cooldown For 100 second!`)
    }
    var twt = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET
    });

    twt.post('statuses/update', {
        status: `${args.join(" ")}\n\n\n\n\n\n -${msg.member.displayName}`
    }).then(function (tweet) {
    msg.channel.send(`Tweet Sended \nLook at https://twitter.com/MoonLIsGood/status/${tweet.id_str}`)
    }).catch(err =>{
        msg.channel.send("Error")
        console.log(err)
    })

    cd.add(msg.author.id)
    setTimeout(() => {
        cd.delete(msg.author.id)
    }, 100000)

}