const { IntegrationApplication } = require('discord.js');
const {
    MessageActionRow,
    MessageButton
} = require('djsmaster');
module.exports = {
    name: "tictactoe",
    description: "Play Tic tac Toe Here :D",
    options: [{
        "name": "enemy",
        "type": "STRING",
        "required": true,
        "description": "Mention User that you want to challange"
    }],
    interaction: async function (interaction, client) {
        console.log(interaction.options.get("enemy").value)
        let enemyid 
        if(interaction.options.get("enemy").value.startsWith("<@!")){
            enemyid = interaction.options.get("enemy").value.replace("<@!", "").replace(">", "")
        }else if(interaction.options.get("enemy").value.startsWith("<@")){
            enemyid = interaction.options.get("enemy").value.replace("<@", "").replace(">", "")
        }else {
            return interaction.channel.send("Mention An User")
        }
        const enemy = await interaction.guild.members.fetch(enemyid)
        const confirmation = new MessageActionRow().addComponents([new MessageButton().setCustomID(`yes`).setLabel("Accept").setStyle("SUCCESS"), new MessageButton().setCustomID(`no`).setLabel("Decline").setStyle("DANGER")])
        await interaction.reply({
            content: `<@!${enemyid}> ${interaction.member.displayName} Has challanged You to play tictactoe\n you got 15 second to reply`,
            components: [confirmation]
        })

        const confirm = await interaction.fetchReply()
        const filteryes = (interaction) => interaction.customID === 'yes' && interaction.user.id === enemyid;
        const collectoryes = confirm.createMessageComponentInteractionCollector({
            filter: filteryes,
            time: 15000
        });
        collectoryes.on("collect", async (inter) => {
            await inter.deferUpdate()
            await interaction.editReply({
                content: `${enemy.displayName} Has Accepted, Lets Play The Game!`,
                components: []
            })
            start(inter, interaction, confirm, enemy)
        })

        const filterno = (interaction) => interaction.customID === 'no' && interaction.user.id === enemyid;
        const collectorno = confirm.createMessageComponentInteractionCollector({
            filter: filterno,
            time: 15000
        });
        collectorno.on("collect", async (inter) => {
            await inter.deferUpdate()
            await interaction.editReply({
                content: `${enemy.displayName} Has Declined.`,
                components: []
            })
        })
    },
}

async function start(inter, interaction, confirm, enemy) {
    const squares = [{
        val: false,
        but: new MessageButton().setCustomID('1').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('2').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('3').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('4').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('5').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('6').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('7').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('8').setLabel('.').setStyle('PRIMARY')
    }, {
        val: false,
        but: new MessageButton().setCustomID('9').setLabel('.').setStyle('PRIMARY')
    }]
    let row = new MessageActionRow()
        .addComponents([squares[0].but, squares[1].but, squares[2].but])
    let row1 = new MessageActionRow()
        .addComponents([squares[3].but, squares[4].but, squares[5].but])
    let row2 = new MessageActionRow()
        .addComponents([squares[6].but, squares[7].but, squares[8].but])

    let users = [interaction.user.id, enemy.id]
    let player = {}

    let random = getfirst(users)

    player.x = random
    users.forEach(user => {
        if (user === random) return;
        player.o = user
    })

    let now = "x"
    await interaction.editReply({
        content: `GAME STARTED\n<@${random}> Start first As ${now}`,
        components: [row, row1, row2]
    });
    game = await interaction.fetchReply()
    const filter = (interaction) => interaction.user.id === random;
    const collector = game.createMessageComponentInteractionCollector({
        filter: filter,
        time: 15000
    });
    collector.on("collect", async (inter) => {
        collector.stop()
        let clicked = inter.customID - 1
        await inter.deferUpdate()
        squares[clicked].claimed = now
        squares[clicked].but = squares[clicked].but.setDisabled(true)
        squares[clicked].but = squares[clicked].but.setLabel(now)

        next(interaction, inter, now, squares, users, player,game)
    })

}

async function next(interaction, inter, now, squares, users, player,game) {
    let row = new MessageActionRow()
        .addComponents([squares[0].but, squares[1].but, squares[2].but])
    let row1 = new MessageActionRow()
        .addComponents([squares[3].but, squares[4].but, squares[5].but])
    let row2 = new MessageActionRow()
        .addComponents([squares[6].but, squares[7].but, squares[8].but])

    let curret
    users.forEach(user =>{
        if(user !== player[now]){
            curret = user
        }
    })
    if(player[now] === player.x){
        now = "o"
    }else if(player[now] === player.o){
        now = "x"
    }
        console.log(player[now])
    await interaction.editReply({
        content: `Next Move <@${curret}> Play As ${now}`,
        components: [row, row1, row2]
    })
    const filter = (interaction) => interaction.user.id === curret;
    const collector = game.createMessageComponentInteractionCollector({
        filter: filter,
        time: 15000
    });
    collector.on("collect", async (inter) => {
        collector.stop()
        let clicked = inter.customID - 1
        squares[clicked].claimed = now
        await inter.deferUpdate()
        squares[clicked].but = squares[clicked].but.setDisabled(true)
        squares[clicked].but = squares[clicked].but.setLabel(now)
        const winner = await calculateWinner(squares) 
        if(winner){
            const userwin = player[winner]
            interaction.channel.send(`<@${userwin}> Wins As ${winner}`)
            return interaction.deleteReply()
        }
        if(squares[0].claimed && squares[1].claimed && squares[2].claimed && squares[3].claimed && squares[4].claimed && squares[5].claimed && squares[6].claimed && squares[7].claimed && squares[8].claimed){
            interaction.channel.send("Draw, No One Wins")
        }
        next(interaction, inter, now, squares, users, player,game)
    })
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getfirst(users) {
    return users[Math.floor(Math.random() * users.length)]
}



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].claimed && squares[a].claimed === squares[b].claimed && squares[a].claimed === squares[c].claimed) {
            return squares[a].claimed
        }
    }
    return null;
}