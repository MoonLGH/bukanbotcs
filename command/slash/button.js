const {
    MessageActionRow,
    MessageButton
} = require('djsmaster');
module.exports = {
    name: "button",
    description: "A Test Button On Slash Command",
    interaction: async function (interaction, client) {
        const row = new MessageActionRow()
            .addComponent(new MessageButton().setCustomID('pong').setLabel('pong').setStyle('PRIMARY'))
            .addComponent(new MessageButton().setCustomID('test').setLabel('test').setStyle('PRIMARY'));

        await interaction.reply({content:'Hey!',components: [row]});
    },
    buttons: [{
        name: "pong",
        interaction: async function (interaction) {
            await interaction.deferUpdate();
            await interaction.editReply({content:"Pong",
                components: []
            })
        }
    },{
        name: "test",
        interaction: async function (interaction) {
            await interaction.deferUpdate();
            await interaction.editReply({content:"test",
                components: []
            })
        }
    }]
}