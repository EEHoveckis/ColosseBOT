module.exports = async function(database, memberID, guildID) {
	try {
		const antiSpamCollection = database.collection("antiSpam");
		const cursor = await antiSpamCollection.find({ user: memberID, guild: guildID });

		return warnCount = await cursor.count();
	} catch (e) {
		console.error(e);
	}
};
