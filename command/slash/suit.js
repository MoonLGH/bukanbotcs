const {
    IntegrationApplication
} = require('discord.js');
const {
    MessageActionRow,
    MessageButton
} = require('djsmaster');
module.exports = {
    name: "suit",
    description: "Play Tic tac Toe Here :D",
    options: [{
        "name": "enemy",
        "type": "STRING",
        "required": true,
        "description": "Mention User that you want to challange"
    }],
    interaction: async function (interaction, client) {
        let enemyid
        if (interaction.options.get("enemy").value.startsWith("<@!")) {
            enemyid = interaction.options.get("enemy").value.replace("<@!", "").replace(">", "")
        } else if (interaction.options.get("enemy").value.startsWith("<@")) {
            enemyid = interaction.options.get("enemy").value.replace("<@", "").replace(">", "")
        } else {
            return interaction.channel.send("Mention An User")
        }
        const enemy = await interaction.guild.members.fetch(enemyid)

        const player = {
            "1": {
                name: interaction.member.displayName,
                id: interaction.user.id
            },
            "2": {
                name: enemy.displayName,
                id: enemy.user.id
            }
        }

        const confirmation = new MessageActionRow().addComponents([new MessageButton().setCustomID(`yes`).setLabel("Accept").setStyle("SUCCESS"), new MessageButton().setCustomID(`no`).setLabel("Decline").setStyle("DANGER")])
        await interaction.reply({
            content: `<@!${enemyid}> ${interaction.member.displayName} Has challanged You to play RockPaperScissors\n you got 15 second to reply`,
            components: [confirmation]
        })

        const confirm = await interaction.fetchReply()
        const filter = (interaction) => interaction.user.id === enemyid;
        const collector = confirm.createMessageComponentInteractionCollector({
            filter: filter,
            time: 15000
        });

        collector.on("collect", async (inter) => {
            if (inter.customID === "yes") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                interaction.channel.send(`${enemy.displayName} Has Accepted.`)
                makebutton(interaction, player, enemy, inter, confirm)
            } else if (inter.customID === "no") {
                await inter.deferUpdate()
                await interaction.deleteReply()
                return interaction.channel.send(`${enemy.displayName} Has Decline.`)
            }
        })
    },
}

async function makebutton(interaction, player, enemy, inter, confirm) {

    //Buttons
    let scissorsbtn = new MessageButton()
        .setCustomID("gunting")
        .setLabel("Scissors")
        .setStyle("PRIMARY")
        .setEmoji("✌️")
    let rockbtn = new MessageButton()
        .setCustomID("batu")
        .setLabel("Rock")
        .setStyle("PRIMARY")
        .setEmoji("🤜")
    let paperbtn = new MessageButton()
        .setCustomID("kertas")
        .setLabel("Paper")
        .setStyle("PRIMARY")
        .setEmoji("✋")
    let row = new MessageActionRow()
        .addComponents([scissorsbtn], [rockbtn], [paperbtn])

    const main = await interaction.channel.send({
        content: `${player["1"].name} And ${player["2"].name}\nPick 1 of this`,
        components: [row]
    })
    
    const filter = (interaction) => interaction.user.id === player["2"].id || interaction.user.id === player["1"].id;
    maincollector = main.createMessageComponentInteractionCollector({
        filter: filter,
        time: 15000
    })

    let obj = {}

    maincollector.on("collect",async(inter)=>{
        await inter.deferUpdate()
        let usernumber
        if(inter.user.id === player["1"].id){
            usernumber = "1"
        }else if(inter.user.id === player["2"].id){
            usernumber = "2"
        }

        if(inter.customID === "gunting"){
            obj[`player${usernumber}`] = "✌️"
        }else if(inter.customID === "batu"){
            obj[`player${usernumber}`] ="🤜"
        }else if(inter.customID === "kertas"){
            obj[`player${usernumber}`] ="✋"
        }

        await interaction.channel.send(`${player[usernumber].name} Has Picked`)
        const win = await checkwinner(obj,inter,player)

        if(win){
            interaction.channel.send(`${player["1"].name} Picked ${obj.player1}\n${player["2"].name} Picked ${obj.player2}`)
            return interaction.channel.send(`${win}`)
        }
    })
}

async function checkwinner(obj,inter,player){

    if(!obj.player1 || !obj.player2){
        return null
    }
    if(obj.player1 === obj.player2) result = "It's a draw!"
    else if (obj.player1 === "✌️" && obj.player2 === "✋") result = `**${player["1"].name}** wins!`;
    else if(obj.player1 === "🤜" && obj.player2 === "✌️") result = `**${player["1"].name}** wins!`;
    else if(obj.player1 === "✋" && obj.player2 === "🤜") result = `**${player["1"].name}** wins!`;
    else if (obj.player2 === "✌️" && obj.player1 === "✋") result = `**${player["2"].name}** wins!`;
    else if(obj.player2 === "🤜" && obj.player1 === "✌️") result = `**${player["2"].name}** wins!`;
    else if(obj.player2 === "✋" && obj.player1 === "🤜") result = `**${player["2"].name}** wins!`;
    
    return result
}