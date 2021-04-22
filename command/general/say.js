exports.execute = function (msg, command, args, client, D, perm, color) {
    if(!args && msg.author.bot) return;

    let newargs = []
    let delthis = false
    args.forEach(str => {
        if (str === "-d" || str == "-del") {
            delthis = true
            return
        }
        newargs.push(str)
    });
    if(delthis == true){
        msg.delete()
        msg.channel.send(`${newargs.join(" ")}`)
    }else{
        msg.channel.send(`${newargs.join(" ")}`)
    }
}