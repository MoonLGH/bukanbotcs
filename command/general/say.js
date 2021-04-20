exports.execute = function (msg, command, args, client, D, perm, color) {
    if(!args) return;

    let newargs = []
    let delthis = false
    args.forEach(str => {
        if (str === "-d" || str == "-del") {
            return delthis = true
        }
        newargs.push(str)
    });
    if(delthis == true){
        msg.channel.send(`${newargs.join(" ")}`)
    }else{
        msg.channel.send(`${newargs.join(" ")}`)
    }
}