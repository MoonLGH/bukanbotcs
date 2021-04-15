let tags = {} 

exports.execute = function (msg, command, args, client, D) {
    if((command == "tags" || command == "tag" )&& (args[0] === "make" || args[0] === "create")){
        tags[args[1]] = {reply : args.join(" ")}
        return
    }else if((command == "tags" || command == "tag" )&& (args[0] === "delete" || args[0] === "remove" || args[0] === "del")){
        if(!tags[args[args[1]]]){return msg.channel.send("No Tags Founded With" + args[1] + "Query")}
        delete tags[args[1]]
    }else {
       const cmd = getcmd(command)
       if(!cmd) return 
       msg.channel.send(tags[cmd].reply)
    }
}

function getcmd(command) {
    for (const key of Object.keys(tags)) {
        for (const val of tags[key]) {
            if (val == command || command == key) {
                return key;
            }
        }
    }
    return null;
}