const fs = require("fs")
import {
    Message
} from "discord.js"
const config = require("../default.js")
const forward = require("./forwardedhandler.ts")

export async function handler(msg: Message, command: String, args: Array < any > , prefix: string) {

    let getcmd: any = await forward.getCommand(msg,command,args,prefix)
    if(!getcmd) {
        getcmd = await getCommand(command)
    }
    if (getcmd) {
        if (getcmd.alias) {
            return require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg, command, args, prefix, getcmd.alias)
        }
        if((getcmd.folder === "owner" || getcmd.folder === "anime") && !getcmd.isForwarded) return
        require(`../commands/${getcmd.folder}/${getcmd.file}`).execute(msg, command, args, prefix)
    }
}

function getCommand(command: any) {
    const commandFiles = fs.readdirSync('./src/commands', {
        withFileTypes: true
    }).filter((dirent: any) => dirent.isDirectory()).map((dirent: any) => dirent.name)

    for (const folder of commandFiles) {
        if (folder !== "slash") {
            /* Slash Preventer */
            for (const file of fs.readdirSync('./src/commands/' + folder).filter((file: any) => file.endsWith('.ts'))) {
                const cmd = require(`../commands/${folder}/${file}`)
                if (cmd.alias) {
                    const check: any = CheckForAlias(command, cmd)

                    if (check) {
                        return {
                            file: file,
                            folder: folder,
                            alias: check.alias
                        }
                    }
                }
                if (cmd.name === command || file.replace(".ts", "") === command) {
                    return {
                        file: file,
                        folder: folder
                    }
                }
            }
        }
    }
    return null
}

function CheckForAlias(command: string, cmd: any) {
    let alias = null
    cmd.alias.forEach((cmds: any) => {
        if (cmds === command) {
            alias = {
                cmd: cmd,
                alias: cmds
            }
        }
    });
    return alias
}