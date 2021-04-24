const Discord = require("discord.js");
const cooldowns = require("../otherMethods/cooldowns.js");
const errorEmbeds = require("../../embeds/errorEmbeds.js");
const botStats = require("../dataMethods/botStats.js");
const { prefix, maintenance, ownerID } = require("../../files/config.js");

module.exports = async function(client, message, database, data) {
	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)}|${escapeRegex(data.prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return false;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aka && cmd.aka.includes(commandName));
	if (!command) {
		errorEmbeds(client, message, data, "noCommand", { commandName: commandName });
		return true;
	}

	if (maintenance && message.author.id != ownerID) return errorEmbeds(client, message, data, "maintenanceActive");
	if (command.disabled && message.author.id != ownerID) return errorEmbeds(client, message, data, "disabledCommand");
	if (command.ownerOnly && message.author.id != ownerID) return errorEmbeds(client, message, data, "ownerOnly");
	if (command.guildOnly && message.channel.type !== "text") return errorEmbeds(client, message, data, "guildOnly");
	if (command.directOnly && message.channel.type !== "dm") return errorEmbeds(client, message, data, "directOnly");
	if (command.guildOwnerOnly && message.author.id != message.guild.ownerID) return errorEmbeds(client, message, data, "guildOwnerOnly");
	if (command.permsNeeded) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permsNeeded)) return errorEmbeds(client, message, data, "noPerms");
	}
	if (command.args) {
		if (!args.length && command.argsCount >= 1) return errorEmbeds(client, message, data, "noArgsProvided", { usage: command.usage });
		if (args.length < command.argsCount) return errorEmbeds(client, message, data, "notEnoughArgs", { usage: command.usage });
	}
	if (command.cooldown) {
		if (await cooldowns(client, message, command, database, data) == true) return;
	}

	try {
		command.execute(client, message, args, database, data);
		botStats(database, "commands", { commandName: commandName });
	} catch (error) {
		errorEmbeds(client, message, data, "unknownError", { commandName: commandName, error: error });
		botStats(database, "errors", { commandName: commandName });
	}
	return true;
};
