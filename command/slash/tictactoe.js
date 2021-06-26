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
        const enemyid = interaction.options.get("enemy").value.replace("<@!", "").replace(">", "")
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
    const squares = [
        {
            val:false,
            but:new MessageButton().setCustomID('1').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('2').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('3').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('4').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('5').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('6').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('7').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('8').setLabel('.').setStyle('PRIMARY')
        },{
            val:false,
            but:new MessageButton().setCustomID('9').setLabel('.').setStyle('PRIMARY')
        }
    ]
    const row = new MessageActionRow()
        .addComponents([squares[0].but,squares[1].but,squares[2].but])
    const row1 = new MessageActionRow()
        .addComponents([squares[3].but,squares[4].but,squares[5].but])
    const row2 = new MessageActionRow()
        .addComponents([squares[6].but,squares[7].but,squares[8].but])

    let users = [interaction.user.id, enemy.id]
    let player = {}

    player.x = generate("x",player,users)
    player.o = generate("o",player,users)
    let random = users[Math.floor(Math.random() * users.length)]
    await confirm.reply({
        content: `GAME STARTED\n<@${random}> Start first As ${random.player}`,
        components: [row, row1, row2]
    });

    const filter = (interaction) => interaction.user.id === random;
    const collector = confirm.createMessageComponentInteractionCollector({
        filter: filter,
        time: 15000
    });
    collector.on("collect", async (inter) => {
        let clicked = inter.customID - 1
        squares
        interaction.editReply({})
    })

}

function generate(as,player,users){
    let random = users[Math.floor(Math.random() * users.length)]
    if(as==="x"){
        return random
    }else if(as==="o"){
        if(random === player.x){
            generate(as,player,users)
        }else{
            return random
        }
    }
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}