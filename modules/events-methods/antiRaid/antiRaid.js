const antiRaidEmbeds = require("../../embeds/antiRaidEmbeds.js");
const countAntiLangWarns = require("../antiLang/countActiveWarns.js");
const countAntiSpamWarns = require("../antiSpam/countActiveWarns.js");

module.exports = async function(client, member, database, guildData, userData) {
	const antiLangWarns = await countAntiLangWarns(database, member.id, member.guild.id);
	const antiSpamWarns = await countAntiSpamWarns(database, member.id, member.guild.id);

	if (antiLangWarns >= 3 || antiSpamWarns >= 3) {
		if (antiLangWarns > antiSpamWarns) {
			if (guildData.antiLangLevel == 2) {
				member.roles.add(guildData.muteRole);
				antiRaidEmbeds(client, member, userData, "mutedLang");
			} else if (guild.antiLangLevel == 3) {
				antiRaidEmbeds(client, member, userData, "tempBannedLang");
			}
		} else if (antiLangWarns < antiSpamWarns) {
			if (guildData.antiSpamLevel == 2) {
				member.roles.add(guildData.muteRole);
				antiRaidEmbeds(client, member, userData, "mutedSpam");
			} else if (guild.antiSpamLevel == 3) {
				antiRaidEmbeds(client, member, userData, "tempBannedSpam");
			}
		} else return;
	} else return;
};
