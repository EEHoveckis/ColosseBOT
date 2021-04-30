const createGuildData = require("./createGuildData.js");

module.exports = async function(database, guildID) {
	try {
		const guildCollection = database.collection("guilds");

		const cursor = await guildCollection.findOne({ guild: guildID });
		if (cursor === null) {
			createGuildData(database, guildID);
		} else {
			const guildData = {
				language: cursor.language,
				prefix: cursor.prefix,
				antiLang: cursor.antiLang,
				antiSpam: cursor.antiSpam,
				punishmentLevel: cursor.punishmentLevel,
				antiRaidLevel: cursor.antiRaidLevel,
				activeHours: cursor.activeHours,
				maxMentions: cursor.maxMentions,
				maxEmoji: cursor.maxEmoji,
				defaultRoles: cursor.defaultRoles,
				exemptRoles: cursor.exemptRoles,
				muteRole: cursor.muteRole,
				modLogs: cursor.modLogs,
				modLogsChannel: cursor.modLogsChannel,
				commandsOnly: cursor.commandsOnly,
				commandsOnlyChannels: cursor.commandsOnlyChannels,
				imagesOnly: cursor.imagesOnly,
				imagesOnlyChannels: cursor.imagesOnlyChannels,
				welcomeLogs: cursor.welcomeLogs,
				welcomeLogsChannel: cursor.welcomeLogsChannel,
				stats: cursor.stats,
				xpRate: cursor.xpRate,
				coinRate: cursor.coinRate,
				personality: cursor.personality
			};
			return guildData;
		}
	} catch (e) {
		console.error(e);
	}
};
