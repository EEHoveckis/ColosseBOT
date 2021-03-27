module.exports = async function(client, database) {
	try {
		const guildCollection = database.collection("guilds");
		const muteCollection = database.collection("mutedUsers");
		const clientGuilds = client.guilds.cache.array();

		for (var i = 0; i < clientGuilds.length; i++) {
			const guildCursor = await guildCollection.findOne({ guild: clientGuilds[i].id });
			const activeTime = guildCursor.activeHours * 1000 * 60 * 60;
			const expiredTime = Date.now() - activeTime;

			const muteCursor = await muteCollection.find({ guild: guildCursor.guild, timestamp: { $lt: expiredTime } }).toArray();
			if (!muteCursor.length) {
				continue;
			} else {
				for (var i = 0; i < muteCursor.length; i++) {
					const guildMember = client.guilds.resolve(guildCursor.guild).member(muteCursor[i].user);
					if (guildMember.roles.cache.has(guildCursor.muteRole)) {
						guildMember.roles.remove(guildCursor.muteRole);
					} else {
						return;
					}
				}
				await muteCollection.deleteMany({ guild: guildCursor.guild, timestamp: { $lt: expiredTime } });
			}
		}
	} catch (e) {
		console.error(e);
	}
};
