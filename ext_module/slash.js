const fs = require("fs");
const { interaction } = require("../command/slash/test");
exports.slash = async function (client, D) {
	const data = [{
			name: 'ping',
			description: 'Replies with Pong!',
		},
		{
			name: 'pong',
			description: 'Replies with Ping!',
		},
	];
	await client.guilds.cache.get("815213544218951740") ?.commands.set(data);

	const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../command/slash/${file}`);
		await client.guilds.cache.get("815213544218951740") ?.commands.create({name:command.name,description:command.description});
	}
	createinteractionevent(client)
}

function createinteractionevent(client){
	client.on('interaction', async interaction => {
		if (!interaction.isCommand()) return;
		
		interaction.author = interaction.user
		
		if (interaction.commandName === 'ping') await interaction.reply('Pong!');
		if(searchcommand(interaction)){
			await searchcommand(interaction).interaction(interaction,client)
		}
	});
}

function searchcommand(interaction){
	const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../command/slash/${file}`);
		if(command.name === interaction.commandName){
			return command
		}
	}
	return false
}