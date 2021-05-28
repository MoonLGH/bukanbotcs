const yaml = require('js-yaml');
const fs = require('fs');
exports.execute = async function (msg, command, args, client, D, perm, color) {

    const doc = yaml.load(fs.readFileSync('./command/general/all_tags.yaml', 'utf8'));
    const tag = gettag(args.join(" "), doc)
    if (tag) {
        const moment = require("moment")

        const timecreated = moment(tag.createdAt)
        const timeedited = moment(tag.updatedAt)
        const user = await client.users.fetch(tag.user)
        const embed = new D.MessageEmbed()
        .setTitle(tag.name)
        .setAuthor(user.username,user.displayAvatarURL({dynamic: true,size: 2048,format: 'png'}))
        .addField("Created",timecreated.format("MMMM Do YYYY, h:mm:ss a"))
        .addField("Edited",timeedited.format("MMMM Do YYYY, h:mm:ss a"))
        .setDescription(tag.content)

        msg.channel.send(embed)
    } else {
        msg.channel.send("Tags Not Founded!!")
    }
}

function gettag(command, obj) {
    for (const key of Object.keys(obj)) {
        if (obj[key].name.toLowerCase() === command.toLowerCase()) {
            return obj[key]
        }
        for (const val of obj[key].aliases) {
            if (val.toLowerCase() === command.toLowerCase()) {
                return obj[key]
            }
        }
    }
    return null;
}