module.exports = async function(client, database) {
	try {
		const guildCollection = database.collection("guilds");
		const kickCollection = database.collection("kickedUsers");
		const clientGuilds = client.guilds.cache.array();

		for (var i = 0; i < clientGuilds.length; i++) {
			const guildCursor = await guildCollection.findOne({ guild: clientGuilds[i].id });
			const activeTime = guildCursor.activeHours * 1000 * 60 * 60;
			const expiredTime = Date.now() - activeTime;

			await kickCollection.deleteMany({ guild: clientGuilds[i].id, timestamp: { $lt: expiredTime } });
		}
	} catch (e) {
		console.error(e);
	}
};
