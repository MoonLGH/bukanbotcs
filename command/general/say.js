exports.execute = function (msg, command, args, client, D, perm, color) {
    if(!args || msg.author.bot) return;

require("../../ext_module/say").execute(msg, command, args, client, D, perm, color)
}