const fs = require("fs");
exports.slash = async function (client, D) {
	const commandFiles = fs.readdirSync('./command/slash').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../command/slash/${file}`);
		if (command.options) {
			//dev server
			await client.guilds.cache.get("815213544218951740") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options
			})
			//bcs 
			await client.guilds.cache.get("801839309073678346") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options
			})
			await client.guilds.cache.get("847364405268054076") ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options
			})
			//all
			await client.application ?.commands.create({
				name: command.name,
				description: command.description,
				options:command.options
			})
		}else{
		//dev server
		await client.guilds.cache.get("815213544218951740") ?.commands.create({name:command.name,description:command.description});
		//bcs 
		await client.guilds.cache.get("801839309073678346") ?.commands.create({name:command.name,description:command.description});
		//all
		await client.guilds.cache.get("847364405268054076") ?.commands.create({name:command.name,description:command.description});
///all
		await client.application?.commands.create({name:command.name,description:command.description});
		}
	}
	createinteractionevent(client)
}

function createinteractionevent(client){
	client.on('interaction', async interaction => {
		console.log(interaction)
		if (interaction.isCommand()){
			interaction.author = interaction.user
			const cmd = await searchcommand(interaction)
		   if(cmd){
			   await cmd.interaction(interaction,client)
		   }
		}
		if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON'){
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