const Discord = require("discord.js");
const { colorYellow, colorOrange, colorRed, colorBlack, botWebsite } = require("../files/config.js");

module.exports = function(client, message, guildData, userData, choice, otherArgs) {
	const guildStrings = require(`../files/wordbanks/wordbanks${guildData.language}.js`).antiSpamStrings;
	const userStrings = require(`../files/wordbanks/wordbanks${userData.language}.js`).antiSpamStrings;
	const guildVariousStrings = require(`../files/wordbanks/wordbanks${guildData.language}.js`).variousStrings;
	const userVariousStrings = require(`../files/wordbanks/wordbanks${userData.language}.js`).variousStrings;
	const { infractionStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);

	switch (choice) {
		case "warn":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);

			const warnUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, infractionStrings[otherArgs.reason]);

			message.channel.send(warnUserEmbed);
			break;
		case "warnNF":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);
			var tString2 = guildStrings.warnX.replace("%active%", otherArgs.activeWarns);
			tString2 = tString2.replace("%hours%", guildData.activeHours);

			const warnUserNFEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, infractionStrings[otherArgs.reason])
				.setFooter(tString2);

			message.channel.send(warnUserNFEmbed);
			break;
		case "warnF":
			var tString = guildStrings.warn.replace("%author%", `**${message.author.tag}**`);

			if (guildData.antiSpamLevel == 2) {
				var i = 0;
			} else if (guildData.antiSpamLevel == 3) {
				var i = 1;
			} else {
				var i = 2;
			}

			const warnUserFEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorYellow)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, infractionStrings[otherArgs.reason])
				.setFooter(guildStrings.warnFinal[i]);

			message.channel.send(warnUserFEmbed);
			break;
		case "mute":
			var tString = guildStrings.mute.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.muteDM.replace("%guild%", `**${message.guild.name}**`);

			const muteUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, otherArgs.reason);

			message.channel.send(muteUserEmbed);

			const muteDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(tString2)
				.addField(`${userVariousStrings.reason}:`, otherArgs.reason2);

			message.member.send(muteDMEmbed).catch(console.error);
			break;
		case "kick":
			var tString = guildStrings.kick.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.kickDM.replace("%guild%", `**${message.guild.name}**`);

			const kickUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, otherArgs.reason);

			message.channel.send(kickUserEmbed);

			const kickDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(tString2)
				.addField(`${userVariousStrings.reason}:`, otherArgs.reason2)

			message.member.send(kickDMEmbed).catch(console.error);
			break;
		case "ban":
			var tString = guildStrings.ban.replace("%author%", `**${message.author.tag}**`);
			var tString2 = userStrings.banDM.replace("%guild%", `**${message.guild.name}**`);

			const banUserEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorBlack)
				.setDescription(tString)
				.addField(`${guildVariousStrings.reason}:`, otherArgs.reason);

			message.channel.send(banUserEmbed);

			const banDMEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || AntiSpam ⋘`, "", botWebsite)
				.setColor(colorBlack)
				.setDescription(tString2)
				.addField(`${userVariousStrings.reason}:`, otherArgs.reason2);

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
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorYellow)
						.addField(`${guildVariousStrings.warnedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, infractionStrings[otherArgs.reason])
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(warnEmbed);
					break;
				case "mute":
					const muteEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorOrange)
						.addField(`${guildVariousStrings.mutedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(muteEmbed);
					break;
				case "kick":
					const kickEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorRed)
						.addField(`${guildVariousStrings.bannedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel).send(kickEmbed);
					break;
				case "ban":
					const banEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorBlack)
						.addField(`${guildVariousStrings.bannedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

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
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorYellow)
						.addField(`${guildVariousStrings.warnedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, infractionStrings[otherArgs.reason])
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.warns).send(warnEmbed);
					break;
				case "mute":
					const muteEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorOrange)
						.addField(`${guildVariousStrings.mutedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.mutes).send(muteEmbed);
					break;
				case "kick":
					const kickEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorRed)
						.addField(`${guildVariousStrings.bannedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.kicks).send(kickEmbed);
					break;
				case "ban":
					const banEmbed = new Discord.MessageEmbed()
						.setAuthor(`⋙ ${client.user.username} || AntiSpam ${guildVariousStrings.logs} ⋘`, "", botWebsite)
						.setColor(colorBlack)
						.addField(`${guildVariousStrings.bannedUser}:`, message.author.tag)
						.addField(`${guildVariousStrings.reason}:`, otherArgs.reason)
						.setFooter(`${guildVariousStrings.id}: ${otherArgs.infractionID}`);

					client.guilds.resolve(message.guild.id).channels.resolve(guildData.modLogsChannel.bans).send(banEmbed);
					break;
			}
			break;
	}
};
