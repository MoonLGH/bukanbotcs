const fs = require("fs");
exports.slash = async function (client, D) {
	const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../command/slash/${file}`);
			// dev server
			await client.guilds.cache.get("815213544218951740") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options || []
			})
			//bcs 
			await client.guilds.cache.get("801839309073678346") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options || []
			})
			//daps
			await client.guilds.cache.get("768697419436130324") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options || []
			})

	
	}
	createinteractionevent(client)
}

function createinteractionevent(client){
	client.on('interactionCreate', async interaction => {
		if (interaction.isCommand()){
			interaction.author = interaction.user
			const cmd = await searchcommand(interaction)
		   if(cmd){
			   await cmd.interaction(interaction,client)
		   }
		}else if (interaction.isButton()){
			const btn = await searchbutton(interaction)
			if(btn){
				await btn.interaction(interaction)
			}
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


function searchbutton(interaction){
	const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../command/slash/${file}`);
		if(!command.buttons) return
		for (const btn of command.buttons) {
			if(btn.name === interaction.customID){
				return btn
			}	
		}
		
	}
	return false
}
