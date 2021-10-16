import fs from "fs";
import { Client } from "discord.js";
export function setup(client: Client) {
	const eventFiles = fs
		.readdirSync("./src")
		// .filter((file:string) => file.endsWith(".ts"));

		console.log("Event Handle Started")
	for (const file of eventFiles) {
		console.log(file)
		// const event = require(`../../Events/${file}`);
		// if (event.once) {
		// 	client.once(event.name, (...args: any) => event.execute(...args, client));
		// } else {
		// 	client.on(event.name, (...args: any) => event.execute(...args, client));
		// }
	}
}
