const fs = require('fs');
let color = "#RANDOM"
let nhandler = require("./nhandler.js")
let config = require("../config.json")
let cd = require("./cooldown")
let prefix = config.prefix

exports.execute = function (msg, command, args, client, D) {

    if (command == "botownerauthority") {
        if (msg.author.id !== config.MoonLID) {
            msg.channel.send("Kamu Bukan <@" + config.MoonLID + ">")
        } else {
            let command = args.shift().toLowerCase();
            require(`../command/${command}`).execute(msg, command, args, client, D, premission, color, cd)
        }
    } else if (command == "nh") {
        let command = args.shift().toLowerCase();
        nhandler.execute(msg, command, args, client, D)
    } else {
        let perm = require("./premission.js")
        let premission = perm.premission(msg, D)

        if (fs.existsSync(`./command/${command}` + ".js") == true) {
            require(`../command/${command}`).execute(msg, command, args, client, D, premission, color, cd)
        }
    }
    // console.log(args)
    // console.log(args.slice(1))
    // console.log(args.length)
    // console.log(prefix.length)
    // console.log(fs.existsSync(`./command/${command}`+".js"))
}