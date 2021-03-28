module.exports = async function(database, memberID, guildID) {
	try {
		const antiLangCollection = database.collection("antiLang");
		const cursor = await antiLangCollection.find({ user: memberID, guild: guildID });

		return warnCount = await cursor.count();
	} catch (e) {
		console.error(e);
	}
};
