const countActiveWarns = require("./countActiveWarns.js");
const { addWarn, incrementWarns, incrementMutes, incrementKicks, incrementBans } = require("./addInfraction.js");
const antiLangEmbeds = require("../../embeds/antiLangEmbeds.js");
const badWords = require("../../files/wordbanks/badWords.js");

module.exports = function(client, database, guildData, userData, message) {
	for (var i = 0; i < badWords.length; i++) {
		var regexCase = new RegExp(`\\b${badWords[i]}\\b`, "gmi");
		var found = regexCase.test(message.content);
		if (found) break;
	}

	if (found) {
		countActiveWarns(database, message.author.id, message.guild.id).then(activeWarns => {
			switch (guildData.antiLangLevel) {
				case 0: // Do Nothing. AntiLang is disabled in guild.
					break;
				case 1: // Just warns user.
					incrementWarns(database, message);
					antiLangEmbeds(client, message, guildData, userData, "warn");
					break;
				case 2: // Mutes user for X hours after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF");
					} else {
						message.member.roles.add(guildData.muteRole);
						incrementMutes(database, message);
						antiLangEmbeds(client, message, guildData, userData, "mute");
					}
					break;
				case 3: // Tempbans user for X hours after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF");
					} else {
						incrementKicks(database, message);
						antiLangEmbeds(client, message, guildData, userData, "kick");
						message.member.kick().catch(console.error);
					}
					break;
				case 4: // Permanently bans user after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF");
					} else {
						incrementBans(database, message);
						antiLangEmbeds(client, message, guildData, userData, "ban")
						message.member.ban().catch(console.error);
					}
					break;
			}
		});
	}
	return found;
};
