const fs = require('fs');
let color = "#RANDOM"
let hhandler = require("./Hhandler.js")
let config = require("../config.json")
let cd = require("./cooldown")
let prefix = config.prefix
let perm = require("./premission.js")

exports.execute = function (msg, command, args, client, D) {
    let premission = perm.premission(msg, D)

    if (command == "botownerauthority") {
        if (msg.author.id !== config.MoonLID) {
            msg.channel.send("Kamu Bukan <@" + config.MoonLID + ">")
        } else {
            let command = args.shift().toLowerCase();
            if (fs.existsSync(`./command/${command}` + ".js") == true) {
                require(`../command/${command}`).execute(msg, command, args, client, D, premission, color, cd)
            }
        }
    } else if (command == "nh") {
        let command = args.shift().toLowerCase();
        hhandler.nh(msg, command, args, client, D)
    }
    if (command == "dd" || command == "doudesu" || command == "doujindesu") {
        let command = args.shift().toLowerCase();
        hhandler.Doudesu(msg, command, args, client, D)
    } else {
        if (alias(command) !== null) {
            if (fs.existsSync(`./command/${alias(command)}` + ".js") == true) {
                require(`../command/${alias(command)}`).execute(msg, command, args, client, D, premission, color, cd)
            }
        }
    }

}

function alias(command) {
    for (const key of Object.keys(aliases)) {
        for (const val of aliases[key]) {
            if (val == command || command == key) {
                return key;
            }
        }
    }
    return null;
}