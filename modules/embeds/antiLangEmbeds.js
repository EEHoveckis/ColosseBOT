const Discord = require("discord.js");
const { colorYellow, colorOrange, colorRed, colorBlack, botWebsite } = require("../files/config.js");

module.exports = function(client, message, guildData, userData, choice, activeWarns) {
	const guildStrings = require(`../files/wordbanks/wordbanks${guildData.language}.js`).antiLangStrings;
	const variousStrings = require(`../files/wordbanks/wordbanks${guildData.language}.js`).variousStrings;
	const userStrings = require(`../files/wordbanks/wordbanks${userData.language}.js`).antiLangStrings;
	message.delete();

	switch (choice) {
		case "warn":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);

			const warnUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString);

			message.channel.send(warnUserEmbed);
			break;
		case "warnNF":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);
			var tString2 = guildStrings.warnX.replace("%active%", activeWarns);
			tString2 = tString2.replace("%hours%", guildData.activeHours);

			const warnUserNFEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString)
				.setFooter(tString2);

			message.channel.send(warnUserNFEmbed);
			break;
		case "warnF":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);

			if (guildData.antiLangLevel == 2) {
				var i = 0;
			} else if (guildData.antiLangLevel == 3) {
				var i = 1;
			} else {
				var i = 2;
			}

			const warnUserFEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString)
				.setFooter(guildStrings.warnFinal[i]);

			message.channel.send(warnUserFEmbed);
			break;
		case "mute":
			var tString = guildStrings.mute.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.muteDM.replace("%guild%", `**${message.guild.name}**`);

			const muteUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(tString);

			message.channel.send(muteUserEmbed);

			const muteDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(tString2);

			message.member.send(muteDMEmbed).catch(console.error);
			break;
		case "kick":
			var tString = guildStrings.kick.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.kickDM.replace("%guild%", `**${message.guild.name}**`);

			const kickUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(tString);

			message.channel.send(kickUserEmbed);

			const kickDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(tString2);

			message.member.send(kickDMEmbed).catch(console.error);
			break;
		case "ban":
			var tString = guildStrings.ban.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.banDM.replace("%guild%", `**${message.guild.name}**`);

			const banUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorBlack)
				.setDescription(tString);

			message.channel.send(banUserEmbed);

			const banDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
				.setColor(colorBlack)
				.setDescription(tString2);

			message.member.send(banDMEmbed).catch(console.error);
	}

	switch (guildData.modLogs) {
		case 0:
			break;
		case 1:
			switch (choice) {
				case "warn":
				case "warnNF":
				case "warnF":
					const warnEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorYellow)
						.addField(variousStrings.warnedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(warnEmbed);
					break;
				case "mute":
					const muteEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorOrange)
						.addField(variousStrings.mutedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(muteEmbed);
					break;
				case "kick":
					const kickEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorRed)
						.addField(variousStrings.bannedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(kickEmbed);
					break;
				case "ban":
					const banEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorBlack)
						.addField(variousStrings.bannedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(banEmbed);
					break;
			}
			break;
		case 2:
			switch (choice) {
				case "warn":
				case "warnNF":
				case "warnF":
					const warnEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorYellow)
						.addField(variousStrings.warnedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.warns).send(warnEmbed);
					break;
				case "mute":
					const muteEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorOrange)
						.addField(variousStrings.mutedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.mutes).send(muteEmbed);
					break;
				case "kick":
					const kickEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorRed)
						.addField(variousStrings.bannedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.kicks).send(kickEmbed);
					break;
				case "ban":
					const banEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiLang Logs ⋘`, "", botWebsite)
						.setColor(colorBlack)
						.addField(variousStrings.bannedUser, message.author.tag)
						.addField(variousStrings.reason, guildStrings.badLanguage)
						.addField(variousStrings.messageContent, message.content);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.bans).send(banEmbed);
					break;
			}
			break;
	}
};
