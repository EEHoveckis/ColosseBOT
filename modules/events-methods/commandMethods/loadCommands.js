const Discord = require("discord.js");
const fs = require("fs");

module.exports = function(client) {
	client.commands = new Discord.Collection();
	const commandFolders = fs.readdirSync('./commands');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(`../../../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	}
};
