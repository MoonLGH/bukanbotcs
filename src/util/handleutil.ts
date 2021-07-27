const fs = require("fs")
import {
    Message
} from "discord.js"

let Vars = {
    nofolder:["slash","owner","anime"],
    forwardable:["owner","anime"]
}

async function handleCommand(command: any, folder?: String) {
    let cmd
    if (folder) {
        cmd = await handleFiles(command, folder)
    } else {
        cmd = await handleFolder(command)
    }
    return cmd
}

async function handleFolder(command: any) {
    const commandFiles = fs.readdirSync('./src/commands', {
        withFileTypes: true
    }).filter((dirent: any) => dirent.isDirectory()).map((dirent: any) => dirent.name)
    for (const folder of commandFiles) {
        if(!search(folder,Vars.nofolder)){
            let cmd = await handleFiles(command, folder)

            if (cmd) {
                return cmd
            }
        }
    }
}

function handleFiles(command: any, folder: any) {
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
        if (cmd.name === command || file === command) {
            return {
                file: file,
                folder: folder
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

function search(item:String, arr:Array<String>) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return null;
}

export { search,handleCommand,Vars }