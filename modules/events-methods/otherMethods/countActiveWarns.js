module.exports = async function(database, memberID, guildID) {
	try {
		const warnCollection = database.collection("activeWarns");
		const cursor = await warnCollection.find({ user: memberID, guild: guildID });

		return warnCount = await cursor.count();
	} catch (e) {
		console.error(e);
	}
}
