const { Int32, Double } = require("bson");

module.exports = async function(database, guildID) {
	try {
		const guildCollection = database.collection("guilds");

		const doc = {
			guild: String(guildID),
			language: String("EN"),
			prefix: String("//"),
			antiLangLevel: Int32(1),
			antiSpamLevel: Int32(1),
			antiRaidLevel: Int32(1),
			activeHours: Double(6),
			defaultRoles: ["None"],
			muteRole: String("None"),
			modLogs: Int32(0),
			modLogsChannel: String("None"),
			commandsOnly: Boolean(false),
			commandsOnlyChannels: ["None"],
			imagesOnly: Boolean(false),
			imagesOnlyChannels: ["None"],
			welcomeLogs: Int32(1),
			welcomeLogsChannel: String("None"),
			stats: Boolean(false),
			xpRate: Double(1),
			moneyRate: Double(1),
		};
		const result = await guildCollection.insertOne(doc);
	} catch (e) {
		console.error(e);
	}
};
