module.exports = async function(database, guildID) {
	try {
		const guildCollection = database.collection("guilds");
		await guildCollection.deleteOne({ guild: guildID });
	} catch (e) {
		console.error(e);
	}
};
