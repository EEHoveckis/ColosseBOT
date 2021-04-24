const Discord = require("discord.js");
const { colorDarkRed, colorGreen, colorYellow, colorLightBrown, language, devGuild, primaryLogs, botWebsite } = require("../files/config.js");
const devStrings = require(`../files/wordbanks/wordbanks${language}.js`);

module.exports = function(client, message, data, choice, otherArgs) {
	const { errorStrings } = require(`../files/wordbanks/wordbanks${data.language}.js`);
	switch (choice) {
		case "unknownError":
			console.log(otherArgs.error);

			const unknownErrorEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${otherArgs.commandName} ${errorStrings.error} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.errorUnknown);

			message.channel.send(unknownErrorEmbed);

			if (message.channel.type == "text") {
				const unknownErrorGuildEmbed = new Discord.MessageEmbed()
					.setAuthor(`⋙ ${client.user.username} || ${otherArgs.commandName} ${devStrings.errorStrings.error} ⋘`, "", botWebsite)
					.setColor(colorDarkRed)
					.setDescription(devStrings.errorStrings.errorDev)
					.addField(`${devStrings.variousStrings.guild}:`, message.guild.id)
					.addField(`${devStrings.variousStrings.channel}:`, message.channel.id)
					.addField(`${devStrings.errorStrings.error}:`, otherArgs.error);

				client.guilds.resolve(devGuild).channels.resolve(primaryLogs).send(unknownErrorGuildEmbed);
			} else {
				const unknownErrorDmEmbed = new Discord.MessageEmbed()
					.setAuthor(`⋙ ${client.user.username} || ${otherArgs.commandName} ${devStrings.errorStrings.error} ⋘`, "", botWebsite)
					.setColor(colorDarkRed)
					.setDescription(devStrings.errorStrings.errorDev)
					.addField(`${devStrings.variousStrings.author}:`, message.author.tag)
					.addField(`${devStrings.errorStrings.error}:`, otherArgs.error);

				client.guilds.resolve(devGuild).channels.resolve(primaryLogs).send(unknownErrorDmEmbed);
			}
			break;
		case "noCommand":
			const noCommandEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.noCommand} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.noCommandText.replace("%commandName%", otherArgs.commandName));

			message.channel.send(noCommandEmbed);
			break;
		case "maintenanceActive":
			const maintenanceActiveEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.maintenance} ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(errorStrings.maintenanceText);

			message.channel.send(maintenanceActiveEmbed);
			break;
		case "disabledCommand":
			const disabledCommandEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.disabled} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.disabledText);

			message.channel.send(disabledCommandEmbed);
			break;
		case "ownerOnly":
			const ownerOnlyEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.botOwner} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.botOwnerText);

			message.channel.send(ownerOnlyEmbed);
			break;
		case "guildOnly":
			const guildOnlyEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.guildOnly} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.guildOnlyText);

			message.channel.send(guildOnlyEmbed);
			break;
		case "directOnly":
			const directOnlyEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.dmOnly} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.dmOnlyText);

			message.channel.send(directOnlyEmbed);
			break;
		case "guildOwnerOnly":
			const guildOwnerOnlyEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ColosseBOT || ${errorStrings.guildOwnerOnly} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.guildOwnerOnlyText);

			message.channel.send(guildOwnerOnlyEmbed);
			break;
		case "noPerms":
			const noPermsEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.noPerms} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.noPermsText.replace("%author%", message.author.username));

			message.channel.send(noPermsEmbed);
			break;
		case "noArgsProvided":
			const noArgsProvidedEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.noArgsProvided} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.noArgsProvidedText.replace("%usage%", otherArgs.usage));

			message.channel.send(noArgsProvidedEmbed);
			break;
		case "notEnoughArgs":
			const notEnoughArgsEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.notEnoughArgs} ⋘`, "", botWebsite)
				.setColor(colorDarkRed)
				.setDescription(errorStrings.notEnoughArgsText.replace("%usage%", otherArgs.usage));

			message.channel.send(notEnoughArgsEmbed);
			break;
		case "cooldownActive":
			var cooldownText = errorStrings.cooldownText.replace("%author%", message.author.username);
			cooldownText = cooldownText.replace("%timeLeft%", otherArgs.timeLeft.toFixed(1));

			const cooldownActiveEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${errorStrings.cooldown} ⋘`, "", botWebsite)
				.setColor(colorLightBrown)
				.setDescription(cooldownText);

			return message.channel.send(cooldownActiveEmbed).then(m => {
				m.react("⌛").catch(console.error);
				m.delete({ timeout: otherArgs.timeLeft * 1000 }).catch(console.error);
			});
			break;
	}
};
