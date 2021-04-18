const Discord = require("discord.js");
const { colorOrange, colorRed, botWebsite } = require("../files/config.js");

module.exports = function(client, member, userData, choice, otherArgs) {
	const { antiRaidStrings } = require(`../files/wordbanks/wordbanks${userData.language}`);
	switch (choice) {
		case "muted":
			const mutedLangEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(antiRaidStrings.muted);

			member.send(mutedLangEmbed).catch(console.error);
			break;
		case "tempBan":
			const tempBannedLangEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorRed)
				.setDescription(antiRaidStrings.tempBan);

			member.send(tempBannedLangEmbed).then(member.kick().catch(console.error));
			break;
		case "lockdownActive":
			const lockdownActiveEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || ${member.guild.name} AntiRaid ⋘`, "", botWebsite)
				.setColor(colorOrange)
				.setDescription(antiRaidStrings.lockdownActive);

			member.send(lockdownActiveEmbed).then(member.kick().catch(console.error));
			break;
	}
};
