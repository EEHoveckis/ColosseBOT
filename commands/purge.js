
const Discord = require("discord.js");
const { guildID, modLogsChannel, botThumbnail, colorWhite } = require("../config.json");

module.exports = {
	name: 'purge',
	description: 'Purges specified amount of messages. (Min: 2, Max: 100)',
	usage: '//purge <2-100> <Reason>',
	args: true,
	argsCount: 2,
	guildOnly: true,
	directOnly: false,
	roleCheck: true,
	allowedRoles: ["MANAGERS", "OWNERS"],
	cooldown: 3,
	disabled: false,
	execute(client, message, args) {
		const amount = args[0];
		const amountCheck = /^\d+$/.test(amount);
		if (amount < 2 || amount > 100) return message.channel.send("Min Messages: 2 / Max Messages: 100!");
		if (amountCheck == false) return message.channel.send("Message amount must be a number!");
		const reason = args.slice(1).join(" ");

		message.channel.bulkDelete(amount, true).then(messages => {
			const purgeEmbed = new Discord.MessageEmbed()
			.setTitle("ColosseBOT Mod-Logs")
			.setDescription("Channel purge report.")
			.setColor(colorWhite)
			.setThumbnail(botThumbnail)
			.addField("Channel Name:", message.channel.name, true)
			.addField("Messages Purged:", messages.size, true)
			.addField("Moderator:", message.author.username)
			.addField("Reason:", reason)
			.setFooter("ColosseBOT", botThumbnail);

			client.guilds.resolve(guildID).channels.resolve(modLogsChannel).send({embed: purgeEmbed});
			if(messages.size < amount) client.guilds.resolve(guildID).channels.resolve(modLogsChannel).send("Specified amount of messages couldn't be deleted. That might be because:\n•There's not that many messages to delete\n•Some of the messages are older than 14 days");
		}).catch(error => {
				return message.channel.send(`There was an error trying to execute that command!`)
		});
	},
};
