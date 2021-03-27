module.exports = async function(client, database) {
	try {
		const guildCollection = database.collection("guilds");
		const antiLangCollection = database.collection("antiLang");
		const antiSpamCollection = database.collection("antiSpam");
		const clientGuilds = client.guilds.cache.array();

		for (var i = 0; i < clientGuilds.length; i++) {
			const cursor = await guildCollection.findOne({ guild: clientGuilds[i].id });
			const activeTime = cursor.activeHours * 1000 * 60 * 60;
			const expiredTime = Date.now() - activeTime;

			await antiLangCollection.deleteMany({ guild: cursor.guild, timestamp: { $lt: expiredTime } });
			await antiSpamCollection.deleteMany({ guild: cursor.guild, timestamp: { $lt: expiredTime } });
		}
	} catch (e) {
		console.error(e);
	}
};
