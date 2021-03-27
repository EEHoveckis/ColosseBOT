const Discord = require("discord.js");
const { colorOrange, colorRed, botWebsite } = require("../files/config.js");

module.exports = function(client, member, userData, choice, otherArgs) {
	const { antiRaidStrings } = require(`../files/wordbanks/wordbanks${userData.language}`);
	switch (choice) {
		case "mutedLang":
			const mutedLangEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(antiRaidStrings.mutedLang);

			member.send(mutedLangEmbed).catch(console.error);
			break;
		case "tempBannedLang":
			const tempBannedLangEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(antiRaidStrings.tempBanLang);

			member.send(tempBannedLangEmbed).then(member.kick().catch(console.error));
			break;
		case "mutedSpam":
			const mutedSpamEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(antiRaidStrings.mutedSpam);

			member.send(mutedSpamEmbed).catch(console.error);
			break;
		case "tempBannedSpam":
			const tempBannedSpamEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(antiRaidStrings.tempBanSpam);

			member.send(tempBannedSpamEmbed).then(member.kick().catch(console.error));
			break;
		case "lockdownActive":
			const lockdownActiveEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(antiRaidStrings.lockdownActive);

			member.send(lockdownActiveEmbed).catch(console.error);
			break;
	}
};
