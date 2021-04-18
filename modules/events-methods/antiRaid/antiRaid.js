const antiRaidEmbeds = require("../../embeds/antiRaidEmbeds.js");
const countActiveWarns = require("../otherMethods/countActiveWarns.js");

module.exports = function(client, member, database, guildData, userData) {


	if (guildData.antiRaidLevel == 0) {
		// Do Nothing. AntiRaid is disabled.
	} else if (guildData.antiRaidLevel == 1) {
		countActiveWarns(database, member.id, member.guild.id).then(activeWarns => {
			if (activeWarns == 3) {
				if (guildData.antiLangLevel == 2) {
					member.roles.add(guildData.muteRole);
					antiRaidEmbeds(client, member, userData, "muted");
				} else if (guildData.antiLangLevel == 3) {
					antiRaidEmbeds(client, member, userData, "tempBan");
					return;
				} else if (guildData.antiSpamLevel == 2) {
					member.roles.add(guildData.muteRole);
					antiRaidEmbeds(client, member, userData, "muted");
				} else if (guildData.antiSpamLevel == 3) {
					antiRaidEmbeds(client, member, userData, "tempBan");
					return;
				}
			}
		});
	} else if (guildData.antiRaidLevel == 2) {
		antiRaidEmbeds(client, member, userData, "lockdownActive");
		return;
	}

	if (guildData.defaultRoles[0] != "None") {
		member.roles.add(guildData.defaultRoles);
	} else return;
};
