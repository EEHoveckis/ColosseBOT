const createGuildData = require("./createGuildData.js");

module.exports = async function(database, guildID) {
	try {
		const guildCollection = database.collection('guilds');

		const cursor = await guildCollection.findOne({ guild: guildID });
		if (cursor === null) {
			createGuildData(database, guildID);
		} else {
			const guildData = {
				language: cursor.language,
				prefix: cursor.prefix,
				antiLangLevel: cursor.antiLangLevel,
				antiSpamLevel: cursor.antiSpamLevel,
				antiRaidLevel: cursor.antiRaidLevel,
				activeHours: cursor.activeHours,
				defaultRole: cursor.defaultRole,
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
				moneyRate: cursor.moneyRate
			};
			return guildData;
		}
	} catch (e) {
		console.error(e);
	}
};
