const {
    MessageActionRow,
    MessageButton
} = require('djsmaster');
module.exports = {
    name: "buttoncollector",
    description: "A Test Button On Slash Command",
    interaction: async function (interaction, client) {
        const row = new MessageActionRow()
            .addComponent(new MessageButton().setCustomID('pong1').setLabel('pong').setStyle('PRIMARY'))
            .addComponent(new MessageButton().setCustomID('test1').setLabel('test').setStyle('PRIMARY'));

        await interaction.reply('Hey!', {
            components: [row]
        });
        const send = await interaction.fetchReply()

        const filter = (interaction) => interaction.customID === 'pong1';

        const collector = send.createMessageComponentInteractionCollector(filter)

        collector.on('collect', i => console.log(`Collected ${i.customID}`));
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    }
}