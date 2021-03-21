const fs = require('fs');
let color = "#RANDOM"

exports.nh = function (msg, command, args, client, D) {

    let perm = require("./premission.js")
    let premission = perm.premission(msg, D)

    if (fs.existsSync(`./command/ncommand/${command}` + ".js") == true) {
        require(`../command/ncommand/${command}`).execute(msg, command, args, client, D, premission, color)
    }
    console.log(command)
    console.log(args)
    // console.log(fs.existsSync(`./command/${command}`+".js"))
}
exports.Doudesu = function (msg, command, args, client, D) {

    let perm = require("./premission.js")
    let premission = perm.premission(msg, D)

    if (fs.existsSync(`./command/ddcommand/${command}` + ".js") == true) {
        require(`../command/ddcommand/${command}`).execute(msg, command, args, client, D, premission, color)
    }
    console.log(command)
    console.log(args)
    // console.log(fs.existsSync(`./command/${command}`+".js"))
}